import React from 'react';

import { Container, InputText } from './styles';

function Input({ style, children, placeholder }) {
  return (
    <Container style={style}>
      {console.log(style)}
      {children}
      <InputText placeholder={placeholder} />
    </Container>
  );
}

export default Input;
