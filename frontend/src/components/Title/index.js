import React from 'react';

import { Container, TitleP } from './styles';

function Title({ children }) {
  return (
    <Container>
      <TitleP> {children}</TitleP>
    </Container>
  );
}

export default Title;
