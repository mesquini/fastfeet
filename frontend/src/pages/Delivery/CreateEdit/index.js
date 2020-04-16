import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Link, useHistory, useParams } from 'react-router-dom';
import { ClapSpinner } from 'react-spinners-kit';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import api from '~/services/api';

import AsyncSelect from 'react-select/async';

import { Container, Content, Buttons, Header, Loading } from './styles';
import { useSelector } from 'react-redux';

const schema = Yup.object().shape({
  // destinatario: Yup.string().required('Destinatario é obrigatório!'),
  // street: Yup.string().required('Rua é obrigatório!'),
  product: Yup.string().required('Nome do produto é obrigatório!'),
});

export default function CreateEdit() {
  const [loading, setLoading] = useState(false);
  const { toggleTheme } = useSelector(state => state.theme);
  const [initialValue, setInitialValue] = useState({});
  const [selectDeliveryman, setSelectDeliveryman] = useState({
    id: 0,
    label: '',
  });
  const [selectRecipient, setSelectRecipient] = useState({ id: 0, label: '' });
  const [deliverymanes, setDeliverymanes] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const history = useHistory();
  const { id: deliveryId } = useParams();

  useEffect(() => {
    if (!!deliveryId) {
      async function loadDelivery() {
        const { data } = await api.get(`/delivery/${deliveryId}`);
        setInitialValue(data);
        setSelectDeliveryman({
          id: data.deliveryman.id,
          label: data.deliveryman.name,
        });
        setSelectRecipient({
          id: data.recipient.id,
          label: data.recipient.name,
        });
      }
      loadDelivery();
    }

    loadDeliveryman();
    loadRecipients();
  }, [deliveryId]);

  async function loadDeliveryman() {
    setLoading(true);
    const { data } = await api.get('/deliverymanes');

    const infos = data.map(d => {
      return { id: d.id, label: d.name };
    });
    setDeliverymanes(infos);
  }

  async function loadRecipients() {
    const { data } = await api.get('/recipients');

    const infos = data.map(d => {
      return { id: d.id, label: d.name };
    });

    setRecipients(infos);
    setLoading(false);
  }

  const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? toggleTheme.isFocused : 'none',
        color: isFocused ? '#f1f1f1' : '#000',
      };
    },
  };

  async function handleSubmit({ product }) {
    const data = {
      product,
      deliveryman_id: selectDeliveryman.id,
      recipient_id: selectRecipient.id,
    };

    try {
      if (!!deliveryId) {
        await api.put(`/delivery/${deliveryId}/adm`, data);
        toast.success('Encomenda editado com sucesso!');
      } else {
        await api.post('/delivery', data);
        toast.success('Encomenda criado com sucesso!');
      }
      history.push('/deliveries');
    } catch (error) {
      toast.error('Erro ao cadastrar Encomenda, tente novamente!');
      console.log(error);
    }
  }

  function handleChangeDeliveryman(newValue, actionMeta) {
    switch (actionMeta.action) {
      case 'clear':
        setSelectDeliveryman({ id: 0, label: '' });
        break;
      case 'select-option':
        setSelectDeliveryman(newValue);
        break;
      default:
        break;
    }
  }

  function handleChangeRecipient(newValue, actionMeta) {
    switch (actionMeta.action) {
      case 'clear':
        setSelectRecipient({ id: 0, label: '' });
        break;
      case 'select-option':
        setSelectRecipient(newValue);
        break;
      default:
        break;
    }
  }

  const filterDeliverymanes = inputValue => {
    return deliverymanes.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseDeliverymanesOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(filterDeliverymanes(inputValue));
      }, 500);
    });

  const filterRecipients = inputValue => {
    return recipients.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseRecipientsOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(filterRecipients(inputValue));
      }, 500);
    });

  return (
    <Container>
      <Content>
        {!loading && (
          <Form
            onSubmit={handleSubmit}
            schema={schema}
            initialData={initialValue}
          >
            <Header>
              <h2>
                {!!deliveryId ? 'Editar encomenda' : 'Cadastro de encomenda'}
              </h2>
              <Buttons>
                <Link to="/deliveries">
                  <MdKeyboardArrowLeft size={24} color="#fff" />
                  VOLTAR
                </Link>
                <button type="submit">
                  <MdCheck size={24} color="#fff" />
                  {!!deliveryId ? 'ALTERAR' : 'SALVAR'}
                </button>
              </Buttons>
            </Header>

            <div className="form">
              <div className="infos">
                <div>
                  <strong>Destinatário</strong>
                  <AsyncSelect
                    id="destinatario"
                    isClearable
                    placeholder="Selecione um destinatário"
                    value={selectRecipient.id === 0 ? '' : selectRecipient}
                    onChange={(value, actionMeta) =>
                      handleChangeRecipient(value, actionMeta)
                    }
                    loadOptions={promiseRecipientsOptions}
                    defaultOptions={recipients}
                    styles={colourStyles}
                  />
                </div>
                <div>
                  <strong>Entregador</strong>
                  <AsyncSelect
                    isClearable
                    placeholder="Selecione um entregador"
                    value={selectDeliveryman.id !== 0 ? selectDeliveryman : ''}
                    onChange={(value, actionMeta) =>
                      handleChangeDeliveryman(value, actionMeta)
                    }
                    loadOptions={promiseDeliverymanesOptions}
                    defaultOptions={deliverymanes}
                    styles={colourStyles}
                  />
                </div>
              </div>
              <div className="name">
                <strong>Produto</strong>
                <Input
                  name="product"
                  placeholder="Entre com o nome do produto"
                />
              </div>
            </div>
          </Form>
        )}
      </Content>

      <Loading>
        <ClapSpinner
          loading={loading}
          size={45}
          frontColor="#7159c1"
          backColor="#686769"
        />
      </Loading>
    </Container>
  );
}
