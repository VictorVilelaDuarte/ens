import React from 'react';
import { FaUser } from 'react-icons/fa';

import { Container } from './styles';

import Input from '../../components/Input';
import Password from '../../components/Password';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function LoginAdm() {
  return (
    <>
      <Header />
      <Container>
        <Input name="login" placeholder="Digite seu IDMENS">
          <FaUser size={20} color="#222" />
        </Input>
        <Password placeholder="Digite sua senha" />
      </Container>
      <Footer />
    </>
  );
}

export default LoginAdm;
