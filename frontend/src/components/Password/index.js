import React from 'react';
import { FaLock } from 'react-icons/fa';

import { Container, InputText } from './styles';

function Password({ style, placeholder }) {
  return (
    <Container style={style}>
      <FaLock size={20} />
      <InputText type="password" placeholder={placeholder} />
    </Container>
  );
}

export default Password;
