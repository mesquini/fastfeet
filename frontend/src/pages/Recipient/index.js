import React, { useState, useEffect, useMemo } from 'react';

import { Link } from 'react-router-dom';
import { FaSistrix } from 'react-icons/fa';
import { ClapSpinner } from 'react-spinners-kit';

import api from '~/services/api';

import { Container, Content, Buttons, Empty, Loading } from './styles';
import { useSelector } from 'react-redux';
import Actions from './actions.js';
import { toast } from 'react-toastify';

export default function Recipient() {
  const token = useSelector(state => state.auth.token);

  const [recipient, setRecipient] = useState([]);
  const [recipientDeliveries, setRecipientDeliveries] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDelivery();
  }, [token]);

  async function loadDelivery() {
    setLoading(true);
    const { data } = await api.get('/recipients');

    setRecipient(data);
    setLoading(false);
  }

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

  return (
    <Container>
      <Content>
        <h2>Gerenciando destinatários</h2>
        <Buttons>
          <div>
            <FaSistrix size={18} />
            <input
              type="text"
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Buscar por destinatários"
            />
          </div>
          <Link to="/new-recipient">+ CADASTRAR</Link>
        </Buttons>
        {!loading && (
          <>
            {filteredRecipient.length > 0 ? (
              <div>
                <ul className="header">
                  <li>ID</li>
                  <li>NOME</li>
                  <li>ENDEREÇO</li>
                  <li className="action">AÇÕES</li>
                </ul>
                {filteredRecipient.length === 0 ? (
                  <Empty>
                    <strong>
                      Não foi possuí encontrar nenhum destinatários cadastrado
                      com esse nome!
                    </strong>
                  </Empty>
                ) : (
                  <>
                    {filteredRecipient.map(d => (
                      <div key={d.id}>
                        <ul>
                          <li>#{d.id}</li>
                          <li>{d.name}</li>
                          <li>
                            {d.street}, {d.number}, {d.city} - {d.state}
                          </li>
                          <li className="action">
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
                          </li>
                        </ul>
                      </div>
                    ))}
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
