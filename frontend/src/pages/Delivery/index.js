import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaSistrix } from 'react-icons/fa';
import { GiPlainCircle } from 'react-icons/gi';
import { ClapSpinner } from 'react-spinners-kit';

import Avatar from '~/components/Avatar';

import api from '~/services/api';
import { toast } from 'react-toastify';

import Actions from './actions';
import { Container, Content, Buttons, Status, Empty, Loading } from './styles';

export default function Delivery() {
  const token = useSelector(state => state.auth.token);

  const [delivery, setDelivery] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadDelivery() {
      setLoading(true);
      const { data } = await api.get('/deliveries', {
        headers: { Authorization: `Bearer ${token}` },
      });

      verifyStatus(data);
    }
    loadDelivery();
  }, [token]);

  function verifyStatus(data) {
    const newArr = data.map(d => {
      if (d.canceled_at) return { ...d, status: 'Cancelado' };
      else if (d.start_date && d.end_date) return { ...d, status: 'Entregue' };
      else if (d.start_date && !d.end_date) return { ...d, status: 'Retirada' };
      else if (!d.start_date && !d.end_date && !d.canceled_at)
        return { ...d, status: 'Pendente' };

      return 0;
    });

    setDelivery(newArr);
    setLoading(false);
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
            <FaSistrix size={18} />
            <input
              type="text"
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Buscar por encomendas"
            />
          </div>
          <Link to="/new-delivery">+ CADASTRAR</Link>
        </Buttons>
        {!loading && (
          <>
            {delivery.length > 0 ? (
              <div>
                <ul className="header">
                  <li>ID</li>
                  <li>PRODUTO</li>
                  <li>DESTINATÁRIO</li>
                  <li>ENTREGADOR</li>
                  <li style={{ marginLeft: 'inherit' }}>CIDADE</li>
                  <li>ESTADO</li>
                  <li style={{ marginLeft: 'inherit' }}>STATUS</li>
                  <li className="action">AÇÕES</li>
                </ul>
                {filteredDelivery.map(d => (
                  <div key={d.id}>
                    <ul>
                      <li>#{d.id}</li>
                      <li>{d.product}</li>
                      <li>{d.recipient.name}</li>
                      <li className="deliveryman">
                        <Avatar deliveryman={d.deliveryman} />
                        {d.deliveryman.name}
                      </li>
                      <li style={{ marginLeft: 'inherit' }}>
                        {d.recipient.city}
                      </li>
                      <li style={{ marginLeft: 'inherit' }}>
                        {d.recipient.state}
                      </li>
                      <Status status={d.status}>
                        <GiPlainCircle size={12} />
                        {d.status.toUpperCase()}
                      </Status>
                      <li className="action">
                        <Actions
                          idDelivery={d.id}
                          onDelete={() => onDeleteSuccess(d.id)}
                        />
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <Empty>
                <strong>Você não possuí nenhuma emcomenda cadastrada!</strong>
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
