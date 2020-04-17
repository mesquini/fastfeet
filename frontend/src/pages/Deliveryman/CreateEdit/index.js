import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import AvatarInput from './AvatarInput';
import { Link, useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import api from '~/services/api';

import { Container, Content, Buttons, Header, Loading } from './styles';
import { ClapSpinner } from 'react-spinners-kit';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório!'),
  email: Yup.string()
    .email('Formato invalido')
    .required('Email é obrigatório!'),
  avatar_id: Yup.number(),
});

export default function CreateEdit() {
  const [initialValue, setInitialValue] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { id: deliverymanId } = useParams();

  useEffect(() => {
    if (!!deliverymanId) {
      setLoading(true);
      async function loadDeliveryman() {
        const { data } = await api.get(`/deliveryman/${deliverymanId}`);

        setInitialValue(data.deliveryman);
        setLoading(false);
      }
      loadDeliveryman();
    }
  }, [deliverymanId]);

  async function handleSubmit(data) {
    try {
      if (!!deliverymanId) {
        await api.put(`/deliveryman/${deliverymanId}`, data);
        toast.success('Entregador editado com sucesso!');
      } else {
        await api.post('/deliveryman', data);
        toast.success('Entregador criado com sucesso!');
      }
      history.push('/deliverymanes');
    } catch (error) {
      toast.error('Erro ao criar Entregador, tente novamente!');
      console.log(error);
    }
  }

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
                {!!deliverymanId
                  ? 'Editar entregador'
                  : 'Cadastro de entregador'}
              </h2>
              <Buttons>
                <Link to="/deliverymanes">
                  <MdKeyboardArrowLeft size={24} color="#fff" />
                  VOLTAR
                </Link>
                <button type="submit">
                  <MdCheck size={24} color="#fff" />
                  {!!deliverymanId ? 'ALTERAR' : 'SALVAR'}
                </button>
              </Buttons>
            </Header>

            <div className="form">
              <AvatarInput name="avatar_id" imgDeliveryman={deliverymanId} />
              <div className="name">
                <strong>Nome</strong>
                <Input
                  name="name"
                  placeholder="Entre com o nome do entregador"
                />
              </div>
              <div className="name">
                <strong>Email</strong>
                <Input name="email" placeholder="Entre com um email" />
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
