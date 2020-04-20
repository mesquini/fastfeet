import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ClapSpinner } from 'react-spinners-kit';

import api from '~/services/api';

import { Container, Content, Empty, Loading, Navigation } from './styles';
import { useSelector } from 'react-redux';
import Actions from './actions.js';
import { toast } from 'react-toastify';

import queryString from 'query-string';
import { Table, Button } from 'react-bootstrap';

export default function DeliveryProblem() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const query = useLocation().search;
  const history = useHistory();
  const theme = useSelector(state => state.theme);
  const values = queryString.parse(query);

  useEffect(() => {
    async function loadProblems() {
      setLoading(true);
      const resp = await api.get(
        `/deliveries/problems?page=${values.page || page}`
      );

      setProblems(resp.data.filter(f => !f.delivery.canceled_at));
      setTotal(resp.headers['x-total-count']);
      setLoading(false);
    }
    loadProblems();
  }, [query, page, values.page]);

  async function onCancelSuccess(value) {
    try {
      const data = {
        canceled_at: new Date(),
      };
      await api.delete(`/problem/${value}/cancel-delivery`, { data });

      const itensCopy = Array.from(problems);
      const filterProblems = itensCopy.filter(r => r.id !== value);

      setProblems(filterProblems);
      toast.success('Encomenda cancelada com sucesso!');
    } catch (error) {
      console.log(error);

      toast.error('Não foi possivel cancelar a encomenda, tente novamente!');
    }
  }

  function nextPage() {
    if (page < Math.ceil(total / 10)) {
      setPage(value => value + 1);
      history.push(`/delivery-problem?page=${page + 1}`);
    }
  }

  function prevPage() {
    if (page > 1) {
      setPage(value => value - 1);
      history.push(`/delivery-problem?page=${page - 1}`);
    }
  }

  return (
    <Container>
      <Content>
        <h2>Problemas na entrega</h2>
        {!loading && (
          <>
            {problems.length > 0 ? (
              <div>
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
                      <th>PROBLEMA</th>
                      <th style={{ textAlign: 'end' }}>AÇÕES</th>
                    </tr>
                  </thead>
                  <>
                    {problems.map(d => (
                      <tbody key={d.id} style={{ textAlign: 'center' }}>
                        <tr>
                          <td>#{d.id}</td>
                          <td>{d.description}</td>
                          <td style={{ textAlign: 'end' }}>
                            <Actions
                              idRecipient={d.id}
                              description={d.description}
                              onCancel={() => onCancelSuccess(d.id)}
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
              </div>
            ) : (
              <Empty>
                <strong>Você não possuí nenhum problema cadastrado!</strong>
              </Empty>
            )}
            <Loading>
              <ClapSpinner
                loading={loading}
                size={45}
                frontColor="#7159c1"
                backColor="#686769"
              />
            </Loading>
          </>
        )}
      </Content>
    </Container>
  );
}
