import React, { useRef, useState, useEffect } from 'react';
import { useField } from '@unform/core';
import { FaExclamationCircle } from 'react-icons/fa';

import { Container, Input, ErrorSpan } from './styles';

function InputSelect({ name, children, opcoes, ...rest }) {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.value) {
            return [];
          }
          return ref.value.map((option) => option.value);
        }
        if (!ref.value) {
          return '';
        }
        return ref.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);
  return (
    <>
      <Container isFocused={isFocused} isErrored={!!error}>
        {children}
        <Input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          ref={inputRef}
          name={name}
          defaultValue={defaultValue}
          {...rest}
        >
          {opcoes.map((item) => (
            <option value={item.value}>{item.label}</option>
          ))}
        </Input>
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

export default InputSelect;
