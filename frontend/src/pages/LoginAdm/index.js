import React from 'react';
import { FaUser } from 'react-icons/fa';

import { Container } from './styles';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Input from '../../components/Input';
import Password from '../../components/Password';
import Button from '../../components/Button';

function LoginAdm() {
  return (
    <>
      <Header />
      <Container>
        <Input name="login" placeholder="Digite seu IDMENS">
          <FaUser size={20} color="#222" />
        </Input>
        <Password placeholder="Digite sua senha" />
        <Button>Entrar</Button>
      </Container>
      <Footer />
    </>
  );
}

export default LoginAdm;
