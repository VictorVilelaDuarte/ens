import React, { useEffect, useContext } from 'react';

import { AuthContext } from '../../context/AuthContext';

import { Container } from './styles';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Title from '../../components/Title';

function NoticiaAdm() {
  return (
    <>
      <Header />
      <Container>
        <Title>Notícias</Title>
      </Container>
      <Footer />
    </>
  );
}

export default NoticiaAdm;
