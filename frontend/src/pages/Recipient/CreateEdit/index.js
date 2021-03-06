import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Link, useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import api from '~/services/api';
import cepApi from '~/services/cep';

import { Container, Content, Buttons, Header, Loading } from './styles';
import { ClapSpinner } from 'react-spinners-kit';

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
  const [name, setName] = useState('');
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [complements, setComplements] = useState('');

  const history = useHistory();
  const { id: recipientId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!!recipientId) {
      async function loadRecipient() {
        setLoading(true);
        const { data } = await api.get(`/recipient/${recipientId}`);
        setName(data.name);
        setCep(data.cep);
        setStreet(data.street);
        setNumber(data.number);
        setState(data.state);
        setCity(data.city);
        setComplements(data.complements);
        setLoading(false);
      }
      loadRecipient();
    }
  }, [recipientId]);

  async function blurZipeCode(v) {
    try {
      if (cep.length !== 0 && cep.length === 8) {
        setLoading(true);
        const resp = await cepApi.get(`${cep}/json`);

        if (resp.status === 200 && !resp.data.erro) {
          const data = {
            street: resp.data.logradouro + ` ${resp.data.bairro}`,
            city: resp.data.localidade,
            state: resp.data.uf,
            complements: resp.data.complemento,
          };
          setStreet(data.street);
          setState(data.state);
          setCity(data.city);
          setComplements(data.complements);
        } else toast.warn('CEP não encontrado!');

        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error('Erro ao buscar CEP!');
      setLoading(false);
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
        <Form onSubmit={handleSubmit} schema={schema}>
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

          {!loading && (
            <div className="form">
              <div className="name">
                <strong>Nome</strong>
                <Input
                  name="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Entre com o nome do destinatário"
                />
              </div>

              <div className="address">
                <div>
                  <strong>CEP</strong>
                  <Input
                    name="cep"
                    placeholder="99999999"
                    value={cep}
                    onChange={e =>
                      setCep(e.target.value.replace(/[^0-9]/g, ''))
                    }
                    onBlur={blurZipeCode}
                    maxLength={8}
                  />
                </div>
                <div>
                  <strong>Rua</strong>
                  <Input
                    id="street"
                    name="street"
                    value={street}
                    onChange={e => setStreet(e.target.value)}
                    placeholder="Nome da rua"
                  />
                </div>
                <div>
                  <strong>Número</strong>
                  <Input
                    name="number"
                    value={number}
                    onChange={e =>
                      setNumber(e.target.value.replace(/[^0-9]/g, ''))
                    }
                    placeholder="999"
                  />
                </div>
              </div>

              <div className="region">
                <div>
                  <strong>Cidade</strong>
                  <Input
                    name="city"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="São Paulo"
                  />
                </div>
                <div>
                  <strong>Estado</strong>
                  <Input
                    name="state"
                    value={state}
                    onChange={e => setState(e.target.value)}
                    placeholder="São Paulo"
                  />
                </div>
                <div>
                  <strong>Complemento</strong>
                  <Input
                    name="complements"
                    value={complements}
                    onChange={e => setComplements(e.target.value)}
                    placeholder="..."
                  />
                </div>
              </div>
            </div>
          )}
        </Form>
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
