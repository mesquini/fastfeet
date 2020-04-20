import React, { useState, useEffect, useMemo } from 'react';
import queryString from 'query-string';
import { useSelector } from 'react-redux';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { FaSistrix } from 'react-icons/fa';
import { GiPlainCircle } from 'react-icons/gi';
import { ClapSpinner } from 'react-spinners-kit';

import { Table, Button } from 'react-bootstrap';

import Avatar from '~/components/Avatar';

import api from '~/services/api';
import { toast } from 'react-toastify';

import Actions from './actions';

import {
  Container,
  Content,
  Buttons,
  Status,
  Empty,
  Loading,
  Navigation,
} from './styles';

export default function Delivery() {
  const token = useSelector(state => state.auth.token);
  const theme = useSelector(state => state.theme);

  const [delivery, setDelivery] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const query = useLocation().search;
  const history = useHistory();

  useEffect(() => {
    async function loadDelivery() {
      const values = queryString.parse(query);

      setLoading(true);
      const resp = await api.get(`/deliveries?page=${values.page || page}`);

      setTotal(resp.headers['x-total-count']);
      verifyStatus(resp.data);
    }
    loadDelivery();
  }, [token, query, page]);

  function verifyStatus(data) {
    const newArr = data.map(d => {
      if (d.canceled_at) return { ...d, status: 'Cancelado' };
      else if (d.start_date && d.end_date) return { ...d, status: 'Entregue' };
      else if (d.start_date && !d.end_date) return { ...d, status: 'Retirada' };
      else if (!d.start_date && !d.end_date && !d.canceled_at)
        return { ...d, status: 'Pendente' };

      return d;
    });

    setDelivery(newArr);
    setLoading(false);
  }

  function nextPage() {
    if (page < Math.ceil(total / 10)) {
      setPage(value => value + 1);
      history.push(`/deliveries?page=${page + 1}`);
    }
  }

  function prevPage() {
    if (page > 1) {
      setPage(value => value - 1);
      history.push(`/deliveries?page=${page - 1}`);
    }
  }

  const filteredDelivery = useMemo(
    () =>
      q
        ? delivery.filter(
            d => d.product.toLowerCase().indexOf(q.toLowerCase()) > -1
          )
        : delivery,
    [q, delivery]
  );

  async function onDeleteSuccess(value) {
    try {
      await api.delete(`/delivery/${value}`);
      toast.success('Encomenda deletada com sucesso!');
      const filterDelivery = delivery.filter(f => f.id !== value);
      setDelivery(filterDelivery);
    } catch (error) {
      console.log(error);
      toast.error('Erro ao deletar encomenda, tente novamente!');
    }
  }

  return (
    <Container>
      <Content>
        <h2>Gerenciando encomendas</h2>
        <Buttons>
          <div>
            {delivery.length > 0 && (
              <>
                <FaSistrix size={18} />
                <input
                  type="text"
                  value={q}
                  onChange={e => setQ(e.target.value)}
                  placeholder="Buscar por encomendas"
                />
              </>
            )}
          </div>
          <Link to="/new-delivery">+ CADASTRAR</Link>
        </Buttons>
        {!loading && (
          <div>
            {delivery.length > 0 ? (
              <>
                {filteredDelivery.length === 0 ? (
                  <Empty>
                    <strong>
                      Você não tem nenhuma encomenda com esse nome!
                    </strong>
                  </Empty>
                ) : (
                  <Table
                    style={{ borderRadius: 8 }}
                    responsive
                    striped
                    hover
                    variant={theme.theme}
                  >
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>PRODUTO</th>
                        <th>DESTINATÁRIO</th>
                        <th>ENTREGADOR</th>
                        <th>CIDADE</th>
                        <th>ESTADO</th>
                        <th style={{ textAlign: 'center' }}>STATUS</th>
                        <th style={{ textAlign: 'end' }}>AÇÕES</th>
                      </tr>
                    </thead>
                    {filteredDelivery.map(d => (
                      <tbody key={d.id}>
                        <tr>
                          <td>#{d.id}</td>
                          <td>{d.product}</td>
                          <td>{d.recipient.name}</td>
                          <td className="deliveryman">
                            <Avatar deliveryman={d.deliveryman} />
                            {d.deliveryman.name}
                          </td>
                          <td>{d.recipient.city}</td>
                          <td>{d.recipient.state}</td>
                          <td>
                            <Status status={d.status}>
                              <GiPlainCircle size={12} />
                              {d.status.toUpperCase()}
                            </Status>
                          </td>
                          <td style={{ textAlign: 'end' }}>
                            <Actions
                              idDelivery={d.id}
                              idDeliveryman={d.deliveryman.id}
                              onDelete={() => onDeleteSuccess(d.id)}
                            />
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </Table>
                )}
                <Navigation total={total}>
                  <Button type="button" onClick={prevPage}>
                    Voltar
                  </Button>
                  <Button type="button" onClick={nextPage}>
                    Próximo
                  </Button>
                </Navigation>
              </>
            ) : (
              <Empty>
                <strong>Você não possuí nenhuma encomenda cadastrada!</strong>
              </Empty>
            )}
          </div>
        )}
        <Loading>
          <ClapSpinner
            loading={loading}
            size={45}
            frontColor="#7159c1"
            backColor="#686769"
          />
        </Loading>
      </Content>
    </Container>
  );
}
