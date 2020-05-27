import React, { useRef, useState, useEffect } from 'react';
import { useField } from '@unform/core';
import { FaExclamationCircle } from 'react-icons/fa';

import { Container, InputText, ErrorSpan } from './styles';

function InputTexto({ name, children, placeholder, ...rest }) {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <>
      <Container isFocused={isFocused} isErrored={!!error}>
        {children}
        <InputText
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          ref={inputRef}
          defaultValue={defaultValue}
          placeholder={placeholder}
          {...rest}
        />
        {error && (
          <FaExclamationCircle
            style={{ marginLeft: 5 }}
            size={20}
            color="#c53030"
          />
        )}
      </Container>
      <ErrorSpan> {error} </ErrorSpan>
    </>
  );
}

export default InputTexto;
