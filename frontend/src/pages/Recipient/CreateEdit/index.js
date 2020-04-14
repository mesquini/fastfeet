import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Link, useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import api from '~/services/api';
import cepApi from '~/services/cep';

import { Container, Content, Buttons, Header } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório!'),
  street: Yup.string().required('Rua é obrigatório!'),
  number: Yup.string().required('Número é obrigatório!'),
  complements: Yup.string(),
  city: Yup.string().required('Cidade é obrigatório!'),
  state: Yup.string().required('Estado é obrigatório!'),
  cep: Yup.string()
    .required('CEP é obrigatório!')
    .length(8, 'Tem que ter 8 digitos!'),
});

export default function CreateEdit() {
  const [cep, setCep] = useState('');
  const [initialValue, setInitialValue] = useState({});
  const history = useHistory();
  const { id: recipientId } = useParams();

  useEffect(() => {
    if (!!recipientId) {
      async function loadRecipient() {
        const { data } = await api.get(`/recipient/${recipientId}`);
        setInitialValue(data);
        setCep(data.cep);
      }
      loadRecipient();
    }
  }, [recipientId]);

  async function blurZipeCode() {
    try {
      const resp = await cepApi.get(`${cep}/json`);
      if (resp.status === 200) {
        const data = {
          street: resp.data.logradouro + ` ${resp.data.bairro}`,
          city: resp.data.localidade,
          state: resp.data.uf,
          complements: resp.data.complemento,
        };
        setInitialValue(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(data) {
    try {
      if (!!recipientId) {
        await api.put(`/recipient/${recipientId}`, data);
        toast.success('Destinatário editado com sucesso!');
      } else {
        await api.post('/recipient', data);
        toast.success('Destinatário criado com sucesso!');
      }
      history.push('/recipients');
    } catch (error) {
      toast.error('Erro ao criar Destinatário, tente novamente!');
      console.log(error);
    }
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
              {!!recipientId
                ? 'Editar destinatário'
                : 'Cadastro de destinatário'}
            </h2>
            <Buttons>
              <Link to="/recipients">
                <MdKeyboardArrowLeft size={24} color="#fff" />
                VOLTAR
              </Link>
              <button type="submit">
                <MdCheck size={24} color="#fff" />
                {!!recipientId ? 'ALTERAR' : 'SALVAR'}
              </button>
            </Buttons>
          </Header>

          <div className="form">
            <div className="name">
              <strong>Nome</strong>
              <Input
                name="name"
                placeholder="Entre com o nome do destinatário"
              />
            </div>

            <div className="andress">
              <div>
                <strong>CEP</strong>
                <Input
                  name="cep"
                  placeholder="99999999"
                  value={cep}
                  onChange={e => setCep(e.target.value.replace(/[a-z]/, ''))}
                  onBlur={blurZipeCode}
                  maxLength={8}
                />
              </div>
              <div>
                <strong>Rua</strong>
                <Input id="street" name="street" placeholder="Nome da rua" />
              </div>
              <div>
                <strong>Número</strong>
                <Input name="number" placeholder="999" />
              </div>
            </div>

            <div className="region">
              <div>
                <strong>Cidade</strong>
                <Input name="city" placeholder="Exemplo" />
              </div>
              <div>
                <strong>Estado</strong>
                <Input name="state" placeholder="Estado" />
              </div>
              <div>
                <strong>Complemento</strong>
                <Input name="complements" placeholder="" />
              </div>
            </div>
          </div>
        </Form>
      </Content>
    </Container>
  );
}
