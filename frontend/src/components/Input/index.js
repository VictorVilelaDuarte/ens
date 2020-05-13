import React from 'react';

import { Container, InputText } from './styles';

function Input({ style, children, placeholder }) {
  return (
    <Container style={style}>
      {children}
      <InputText placeholder={placeholder} />
    </Container>
  );
}

export default Input;
