import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaSistrix } from 'react-icons/fa';
import { GiPlainCircle } from 'react-icons/gi';

import Actions from './actions';

import api from '~/services/api';

import { Container, Content, Buttons, Status } from './styles';
import { useSelector } from 'react-redux';

export default function Delivery() {
  const token = useSelector(state => state.auth.token);

  const [delivery, setDelivery] = useState([]);
  const [status, setStatus] = useState('');
  const [q, setQ] = useState('');

  useEffect(() => {
    async function loadDelivery() {
      const { data } = await api.get('/deliveries', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDelivery(data);
      verifyStatus({
        start: data.start_date,
        end: data.end_date,
        cancel: data.canceled_at,
      });
    }
    loadDelivery();
  }, [token]);

  function verifyStatus({ start, end, cancel }) {
    if (!!cancel) return setStatus('Cancelado');

    if (!!start && !!end) return setStatus('Entregue');

    if (!!start && !end) return setStatus('Retirada');

    if (!start && !end && !cancel) return setStatus('Pendente');
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
            <FaSistrix size={18} color="#001" />
            <input
              type="text"
              value={q}
              onChange={handleChange}
              placeholder="Buscar pro encomendas"
            />
          </div>
          <Link to="/delivery-new">+ CADASTRAR</Link>
        </Buttons>
        {delivery.length > 0 && (
          <div>
            <ul className="header">
              <li>ID</li>
              <li>DESTINATÁRIO</li>
              <li>ENTREGADOR</li>
              <li>CIDADE</li>
              <li>ESTADO</li>
              <li>STATUS</li>
              <li className="action">AÇÕES</li>
            </ul>
            {filteredDelivery.map(d => (
              <div key={d.id}>
                <ul>
                  <li>#{d.id}</li>
                  <li>{d.recipient.name}</li>
                  <li>{d.deliveryman.name}</li>
                  <li>{d.recipient.city}</li>
                  <li>{d.recipient.state}</li>
                  <Status status={status}>
                    <GiPlainCircle size={12} />
                    {status.toUpperCase()}
                  </Status>
                  <li className="action">
                    <Actions />
                  </li>
                </ul>
              </div>
            ))}
          </div>
        )}
      </Content>
    </Container>
  );
}
