import React from 'react';
import { FaPlus } from 'react-icons/fa';

import { Container, Button } from './styles';

function AddButton({ children, ...rest }) {
  return (
    <Container>
      <Button {...rest} type="submit">
        <FaPlus /> {'  '} {children}
      </Button>
    </Container>
  );
}

export default AddButton;
