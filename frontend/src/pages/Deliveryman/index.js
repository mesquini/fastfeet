import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaSistrix } from 'react-icons/fa';
import { ClapSpinner } from 'react-spinners-kit';

import Avatar from '~/components/Avatar';

import api from '~/services/api';
import { toast } from 'react-toastify';

import Actions from './actions';
import { Container, Content, Buttons, Empty, Loading } from './styles';

export default function Deliveryman() {
  const [deliverymanes, setDeliverymanes] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadDeliverymanes() {
      setLoading(true);
      const { data } = await api.get('/deliverymanes');

      setDeliverymanes(data);
      setLoading(false);
    }
    loadDeliverymanes();
  }, []);

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
          <>
            {deliverymanes.length > 0 ? (
              <div>
                <ul className="header">
                  <li>ID</li>
                  <li>FOTO</li>
                  <li>NOME</li>
                  <li>EMAIL</li>
                  <li className="action">AÇÕES</li>
                </ul>
                {filteredDeliverymanes.length === 0 ? (
                  <Empty>
                    <strong>
                      Você não tem nenhum entregador com esse nome!
                    </strong>
                  </Empty>
                ) : (
                  <>
                    {filteredDeliverymanes.map(d => (
                      <div key={d.id}>
                        <ul>
                          <li>#{d.id}</li>
                          <li className="deliveryman">
                            <Avatar deliveryman={d} />
                          </li>
                          <li>{d.name}</li>
                          <li>{d.email}</li>
                          <li className="action">
                            <Actions
                              idDeliveryman={d.id}
                              data={deliveries}
                              onDelete={() => onDeleteSuccess(d.id)}
                              onDeleteConfirm={() =>
                                onDeleteConfirmSuccess(d.id, deliveries)
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
                <strong>Você não possuí nenhuma entregador cadastrado!</strong>
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
