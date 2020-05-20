import React, { useRef } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import history from '../../services/history';

import { Container, DivForm, FormLogin } from './styles';

import api from '../../services/api';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Title from '../../components/Title';

export default function LoginAdm() {
  const formRef = useRef(null);
  async function handleLogin(data) {
    const { idmens, password } = data;
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        idmens: Yup.string()
          .required('O IDMENS é obrigatório')
          .length(12, 'O IDMENS deve ter 12 dígitos'),
        password: Yup.string()
          .min(6, 'Minimo 6 caracteres')
          .required('A senha é obrigatória'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      api
        .post('/session', {
          idmens,
          senha: password,
        })
        .then(() => {
          toast.success('Login efetuado com sucesso!');
          history.push('/painel');
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <>
      <Header />
      <Container>
        <Title>Login de administrador do sistema</Title>
        <DivForm>
          <FormLogin ref={formRef} onSubmit={handleLogin}>
            <Input name="idmens" type="number" placeholder="Digite seu IDMENS">
              <FaUser size={20} />
            </Input>
            <Input
              name="password"
              type="password"
              placeholder="Digite sua senha"
            >
              <FaLock size={20} />
            </Input>
            <Button type="submit">Entrar</Button>
          </FormLogin>
        </DivForm>
      </Container>
      <Footer />
    </>
  );
}
