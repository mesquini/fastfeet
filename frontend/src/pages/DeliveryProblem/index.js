import React, { useState, useEffect } from 'react';

import { ClapSpinner } from 'react-spinners-kit';

import api from '~/services/api';

import { Container, Content, Empty, Loading } from './styles';
import { useSelector } from 'react-redux';
import Actions from './actions.js';
import { toast } from 'react-toastify';

export default function DeliveryProblem() {
  const token = useSelector(state => state.auth.token);

  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProblems();
  }, [token]);

  async function loadProblems() {
    setLoading(true);
    const { data } = await api.get('/deliveries/problems');

    setProblems(data.filter(f => !f.delivery.canceled_at));
    setLoading(false);
  }

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

  return (
    <Container>
      <Content>
        <h2>Problemas na entrega</h2>
        {!loading && (
          <>
            {problems.length > 0 ? (
              <div>
                <ul className="header">
                  <li>ID</li>
                  <li>PROBLEMA</li>
                  <li className="action">AÇÕES</li>
                </ul>
                <>
                  {problems.map(d => (
                    <div key={d.id}>
                      <ul>
                        <li>#{d.id}</li>
                        <li className="description">{d.description}</li>
                        <li className="action">
                          <Actions
                            idRecipient={d.id}
                            description={d.description}
                            onCancel={() => onCancelSuccess(d.id)}
                          />
                        </li>
                      </ul>
                    </div>
                  ))}
                </>
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
