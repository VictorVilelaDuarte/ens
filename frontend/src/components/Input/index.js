import React from 'react';

import { Container, InputText } from './styles';

function Input({ children, placeholder }) {
  return (
    <Container>
      {children}
      <InputText placeholder={placeholder} />
    </Container>
  );
}

export default Input;
