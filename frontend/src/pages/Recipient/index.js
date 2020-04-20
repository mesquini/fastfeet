import React, { useState, useEffect, useMemo } from 'react';

import { Link, useHistory, useLocation } from 'react-router-dom';
import { FaSistrix } from 'react-icons/fa';
import { ClapSpinner } from 'react-spinners-kit';

import api from '~/services/api';

import {
  Container,
  Content,
  Buttons,
  Empty,
  Loading,
  Navigation,
} from './styles';
import { useSelector } from 'react-redux';
import Actions from './actions.js';
import { toast } from 'react-toastify';

import queryString from 'query-string';
import { Table, Button } from 'react-bootstrap';

export default function Recipient() {
  const [recipient, setRecipient] = useState([]);
  const [recipientDeliveries, setRecipientDeliveries] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const query = useLocation().search;
  const history = useHistory();
  const theme = useSelector(state => state.theme);

  useEffect(() => {
    async function loadDelivery() {
      setLoading(true);
      const values = queryString.parse(query);
      const resp = await api.get(`/recipients?page=${values.page || page}`);

      setRecipient(resp.data);
      setTotal(resp.headers['x-total-count']);
      setLoading(false);
    }
    loadDelivery();
  }, [query, page]);

  const filteredRecipient = useMemo(
    () =>
      q
        ? recipient.filter(
            d => d.name.toLowerCase().indexOf(q.toLowerCase()) > -1
          )
        : recipient,
    [q, recipient]
  );

  async function verifyDependencias(value) {
    try {
      if (recipientDeliveries.length === 0) {
        const { data } = await api.get(`/recipient-delivery/${value}`);
        if (data.length > 0) {
          setRecipientDeliveries(data);

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
      await api.delete(`/recipient/${value}`);
      const itensCopy = Array.from(recipient);
      const filterRecipient = itensCopy.filter(r => r.id !== value);
      setRecipient(filterRecipient);
      toast.success('Destinatário deletado com sucesso!');
    } catch (error) {
      console.log(error);

      toast.error('Não foi possivel deletar, tente novamente!');
    }
  }

  function nextPage() {
    if (page < Math.ceil(total / 10)) {
      setPage(value => value + 1);
      history.push(`/recipients?page=${page + 1}`);
    }
  }

  function prevPage() {
    if (page > 1) {
      setPage(value => value - 1);
      history.push(`/recipients?page=${page - 1}`);
    }
  }

  return (
    <Container>
      <Content>
        <h2>Gerenciando destinatários</h2>
        <Buttons>
          <div>
            {recipient.length > 0 && (
              <>
                <FaSistrix size={18} />
                <input
                  type="text"
                  value={q}
                  onChange={e => setQ(e.target.value)}
                  placeholder="Buscar por destinatários"
                />
              </>
            )}
          </div>
          <Link to="/new-recipient">+ CADASTRAR</Link>
        </Buttons>
        {!loading && (
          <>
            {recipient.length > 0 ? (
              <div>
                {filteredRecipient.length === 0 ? (
                  <Empty>
                    <strong>
                      Não foi possuí encontrar nenhum destinatários cadastrado
                      com esse nome!
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
                          <th>NOME</th>
                          <th>ENDEREÇO</th>
                          <th style={{ textAlign: 'end' }}>AÇÕES</th>
                        </tr>
                      </thead>
                      <>
                        {filteredRecipient.map(d => (
                          <tbody key={d.id} style={{ textAlign: 'center' }}>
                            <tr>
                              <td>#{d.id}</td>
                              <td>{d.name}</td>
                              <td>
                                {d.street}, {d.number}, {d.city} - {d.state}
                              </td>
                              <td style={{ textAlign: 'end' }}>
                                <Actions
                                  idRecipient={d.id}
                                  data={recipientDeliveries}
                                  onDelete={() => onDeleteSuccess(d.id)}
                                  onDeleteConfirm={() =>
                                    onDeleteConfirmSuccess(
                                      d.id,
                                      recipientDeliveries
                                    )
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
              </div>
            ) : (
              <Empty>
                <strong>
                  Você não possuí nenhum destinatários cadastrado!
                </strong>
              </Empty>
            )}
          </>
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
