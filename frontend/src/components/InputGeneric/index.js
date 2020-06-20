import React, { useState } from 'react';

import { Container, InputText } from './styles';

function InputGeneric({ children, placeholder, ...rest }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Container isFocused={isFocused}>
      {children}
      <InputText
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        {...rest}
      />
    </Container>
  );
}

export default InputGeneric;
