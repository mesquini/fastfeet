import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';
import { Container } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Por favor, insira um email valido')
    .required('Email é obrigatorio!'),
  password: Yup.string().required('A senha é obrigatorio!'),
});

export default function Login() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <img src={logo} alt="logo" />
        <strong>SEU E-MAIL</strong>
        <Input name="email" placeholder="exemplo@email.com" />
        <strong>SUA SENHA</strong>
        <Input type="password" name="password" placeholder="**************" />
        <button type="submit">
          {loading ? 'Carregando...' : 'Entrar no sistema'}
        </button>
      </Form>
    </Container>
  );
}
