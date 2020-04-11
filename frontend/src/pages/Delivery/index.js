import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaSistrix } from 'react-icons/fa';
import { GiPlainCircle } from 'react-icons/gi';
import Avatar from '~/components/Avatar';

import api from '~/services/api';

import Actions from './actions';
import { Container, Content, Buttons, Status } from './styles';

export default function Delivery() {
  const token = useSelector(state => state.auth.token);

  const [delivery, setDelivery] = useState([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    async function loadDelivery() {
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
  }

  const filteredDelivery = useMemo(
    () => (q ? delivery.filter(d => d.product.indexOf(q) > -1) : delivery),
    [q, delivery]
  );

  function handleChange(e) {
    setQ(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1));
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
              onChange={handleChange}
              placeholder="Buscar pro encomendas"
            />
          </div>
          <Link to="/delivery-new">+ CADASTRAR</Link>
        </Buttons>
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
                  <li style={{ marginLeft: 'inherit' }}>{d.recipient.city}</li>
                  <li style={{ marginLeft: 'inherit' }}>{d.recipient.state}</li>
                  <Status status={d.status}>
                    <GiPlainCircle size={12} />
                    {d.status.toUpperCase()}
                  </Status>
                  <li className="action">
                    <Actions />
                  </li>
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <strong>vazio</strong>
        )}
      </Content>
    </Container>
  );
}
