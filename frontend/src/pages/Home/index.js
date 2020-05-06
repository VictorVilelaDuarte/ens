import React from 'react';

import { Container } from './styles';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <Container>
        <h1>HOMEPAGE</h1>
      </Container>
      <Footer />
    </>
  );
}
