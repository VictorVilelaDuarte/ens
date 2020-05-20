import React from 'react';

import { Container } from './styles';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Title from '../../components/Title';

function Painel() {
  return (
    <>
      <Header />
      <Container>
        <Title>Bem-vindo!</Title>
        <h1>PAINEL</h1>
      </Container>
      <Footer />
    </>
  );
}

export default Painel;
