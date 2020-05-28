import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';

import { Container, Check } from './styles';

function InputSwitch({ name, label, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      getValue: (refs) => {
        const result = inputRef.current.checked;
        return result;
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <Check
        defaultChecked={defaultValue}
        type="switch"
        id={name}
        ref={inputRef}
        value={inputRef.current}
        label={label}
      />
    </Container>
  );
}

export default InputSwitch;
