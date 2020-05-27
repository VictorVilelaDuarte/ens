import React from 'react';
import { FaPlus } from 'react-icons/fa';

import { Container, Button } from './styles';

function AddButton({ children, url, ...rest }) {
  return (
    <Container to={url}>
      <Button {...rest} type="submit">
        <FaPlus /> {'  '} {children}
      </Button>
    </Container>
  );
}

export default AddButton;
