import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { FaSistrix } from 'react-icons/fa';
import { ClapSpinner } from 'react-spinners-kit';

import Avatar from '~/components/Avatar';

import api from '~/services/api';
import { toast } from 'react-toastify';

import Actions from './actions';
import {
  Container,
  Content,
  Buttons,
  Empty,
  Loading,
  Navigation,
} from './styles';

import queryString from 'query-string';
import { Table, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function Deliveryman() {
  const [deliverymanes, setDeliverymanes] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const query = useLocation().search;
  const history = useHistory();
  const theme = useSelector(state => state.theme);

  useEffect(() => {
    async function loadDeliverymanes() {
      const values = queryString.parse(query);

      setLoading(true);
      const resp = await api.get(`/deliverymanes?page=${values.page || page}`);

      setDeliverymanes(resp.data);
      setTotal(resp.headers['x-total-count']);
      setLoading(false);
    }
    loadDeliverymanes();
  }, [page, query]);

  const filteredDeliverymanes = useMemo(
    () =>
      q
        ? deliverymanes.filter(
            d => d.name.toLowerCase().indexOf(q.toLowerCase()) > -1
          )
        : deliverymanes,
    [q, deliverymanes]
  );

  async function verifyDependencias(value) {
    try {
      if (deliveries.length === 0) {
        const deliveries = await api.get('/deliveries');

        const filterDelivery = deliveries.data.filter(
          f => f.deliveryman.id === value
        );

        if (filterDelivery.length > 0) {
          setDeliveries(filterDelivery);
          return false;
        }
        return true;
      }
    } catch (error) {
      console.log(error);
      toast.error('Não foi possivel deletar, tente novamente!');
    }
  }

  async function onDeleteConfirmSuccess(id, data) {
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        await api.delete(`/delivery/${element.id}`);
      }
      handleDelete(id);
    }
  }

  async function onDeleteSuccess(value) {
    try {
      const bool = await verifyDependencias(value);

      if (bool) handleDelete(value);
    } catch (error) {
      console.log(error);

      toast.error('Não foi possivel deletar, tente novamente!');
    }
  }

  async function handleDelete(value) {
    try {
      await api.delete(`/deliveryman/${value}`);
      toast.success('Entregador deletado com sucesso!');
      const filterDeliverymanes = deliverymanes.filter(f => f.id !== value);
      setDeliverymanes(filterDeliverymanes);
    } catch (error) {
      console.log(error);
      toast.error('Erro ao deletar entregador, tente novamente!');
    }
  }

  function nextPage() {
    if (page < Math.ceil(total / 10)) {
      setPage(value => value + 1);
      history.push(`/deliverymanes?page=${page + 1}`);
    }
  }

  function prevPage() {
    if (page > 1) {
      setPage(value => value - 1);
      history.push(`/deliverymanes?page=${page - 1}`);
    }
  }

  return (
    <Container>
      <Content>
        <h2>Gerenciando entregadores</h2>
        <Buttons>
          <div>
            {deliverymanes.length > 0 && (
              <>
                <FaSistrix size={18} />
                <input
                  type="text"
                  value={q}
                  onChange={e => setQ(e.target.value)}
                  placeholder="Buscar por entregador"
                />
              </>
            )}
          </div>
          <Link to="/new-deliveryman">+ CADASTRAR</Link>
        </Buttons>
        {!loading && (
          <div>
            {deliverymanes.length > 0 ? (
              <>
                {filteredDeliverymanes.length === 0 ? (
                  <Empty>
                    <strong>
                      Você não tem nenhum entregador com esse nome!
                    </strong>
                  </Empty>
                ) : (
                  <>
                    <Table
                      style={{ borderRadius: 8 }}
                      responsive
                      striped
                      hover
                      variant={theme.theme}
                    >
                      <thead>
                        <tr style={{ textAlign: 'center' }}>
                          <th>ID</th>
                          <th>FOTO</th>
                          <th>NOME</th>
                          <th>EMAIL</th>
                          <th style={{ textAlign: 'end' }}>AÇÕES</th>
                        </tr>
                      </thead>

                      <>
                        {filteredDeliverymanes.map(d => (
                          <tbody key={d.id} style={{ textAlign: 'center' }}>
                            <tr>
                              <td>#{d.id}</td>
                              <td className="deliveryman">
                                <Avatar deliveryman={d} />
                              </td>
                              <td>{d.name}</td>
                              <td>{d.email}</td>
                              <td style={{ textAlign: 'end' }}>
                                <Actions
                                  idDeliveryman={d.id}
                                  data={deliveries}
                                  onDelete={() => onDeleteSuccess(d.id)}
                                  onDeleteConfirm={() =>
                                    onDeleteConfirmSuccess(d.id, deliveries)
                                  }
                                />
                              </td>
                            </tr>
                          </tbody>
                        ))}
                      </>
                    </Table>
                    <Navigation total={total}>
                      <Button type="button" onClick={prevPage}>
                        Voltar
                      </Button>
                      <Button type="button" onClick={nextPage}>
                        Próximo
                      </Button>
                    </Navigation>
                  </>
                )}
              </>
            ) : (
              <Empty>
                <strong>Você não possuí nenhuma entregador cadastrado!</strong>
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
