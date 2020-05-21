import React, { useRef, useEffect, useContext } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import * as Yup from 'yup';

import { AuthContext } from '../../context/AuthContext';

import { Container, DivForm, FormLogin } from './styles';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Title from '../../components/Title';

export default function LoginAdm() {
  const { signIn, verifyAuth } = useContext(AuthContext);
  useEffect(() => {
    verifyAuth();
  }, []);

  const formRef = useRef(null);
  async function handleLogin(data) {
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

      signIn(data);
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
