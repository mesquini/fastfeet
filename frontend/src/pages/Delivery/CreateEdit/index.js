import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Link, useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import api from '~/services/api';

import { Container, Content, Buttons, Header } from './styles';

const schema = Yup.object().shape({
  // name: Yup.string().required('Nome é obrigatório!'),
  // street: Yup.string().required('Rua é obrigatório!'),
  product: Yup.string().required('Nome do produto é obrigatório!'),
});

export default function CreateEdit() {
  const [initialValue, setInitialValue] = useState({});
  const history = useHistory();
  const { id: deliveryId } = useParams();

  useEffect(() => {
    if (!!deliveryId) {
      async function loadDelivery() {
        const { data } = await api.get(`/delivery/${deliveryId}`);
        setInitialValue(data);
      }
      loadDelivery();
    }
  }, [deliveryId]);

  async function handleSubmit(data) {
    console.log(data);

    /*try {
      if (!!deliveryId) {
        await api.put(`/delivery/${deliveryId}`, data);
        toast.success('Encomenda editado com sucesso!');
      } else {
        await api.post('/delivery', data);
        toast.success('Encomenda criado com sucesso!');
      }
      history.push('/deliveries');
    } catch (error) {
      toast.error('Erro ao cadastrar Encomenda, tente novamente!');
      console.log(error);
    }*/
  }

  return (
    <Container>
      <Content>
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
                <Input
                  id="street"
                  name="recipient.name"
                  placeholder="Selecione um destinatário"
                />
              </div>
              <div>
                <strong>Entregador</strong>
                <Input
                  name="deliveryman.name"
                  placeholder="Selecione um entregador"
                />
              </div>
            </div>

            <div className="name">
              <strong>Produto</strong>
              <Input name="product" placeholder="Entre com o nome do produto" />
            </div>
          </div>
        </Form>
      </Content>
    </Container>
  );
}
