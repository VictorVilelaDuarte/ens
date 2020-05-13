import React from 'react';

import { Container } from './styles';

function Button({ children }) {
  return (
    <>
      <Container>
        <text>{children}</text>
      </Container>
    </>
  );
}

export default Button;
