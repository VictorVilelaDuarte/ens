import React from 'react';

import { Container } from './styles';

function Button({ children, ...rest }) {
  return (
    <Container {...rest} type="submit">
      {children}
    </Container>
  );
}

export default Button;
