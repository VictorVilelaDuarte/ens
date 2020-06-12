import React from 'react';

import { Wrapper } from './styles';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function defaultLayout({ children }) {
  return (
    <>
      <Wrapper>
        <Header />
        {children}
      </Wrapper>
      <Footer />
    </>
  );
}
