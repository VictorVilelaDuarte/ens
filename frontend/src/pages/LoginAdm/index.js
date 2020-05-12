import React from 'react';
import { FaUser } from 'react-icons/fa';

import { Container, InputTexto, InputPassword } from './styles';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

function LoginAdm() {
  return (
    <>
      <Header />
      <Container>
        <InputTexto
          // style={{ marginBottom: 30 }}
          name="login"
          placeholder="Digite seu IDMENS"
        >
          <FaUser size={20} color="#222" />
        </InputTexto>
        <InputPassword placeholder="Digite sua senha" />
      </Container>
      <Footer />
    </>
  );
}

export default LoginAdm;
