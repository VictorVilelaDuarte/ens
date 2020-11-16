import React, { useRef, useState, useEffect } from 'react';
import { useField } from '@unform/core';
import { FaExclamationCircle } from 'react-icons/fa';

import { Container, InputText, ErrorSpan } from './styles';

function InputDate({ name, children, placeholder, ...rest }) {
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

  function formatDate(date) {
    const nDate = new Date(date);
    const year = nDate.getFullYear();
    let month = nDate.getMonth() + 1;
    let dt = nDate.getDate() + 1;

    if (dt < 10) {
      dt = `0${dt}`;
    }
    if (month < 10) {
      month = `0${month}`;
    }

    return `${year}-${month}-${dt}`;
  }

  return (
    <>
      <Container isFocused={isFocused} isErrored={!!error}>
        {children}
        <InputText
          type="date"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          ref={inputRef}
          defaultValue={defaultValue && formatDate(defaultValue)}
          // value={defaultValue && formatDate(defaultValue)}
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

export default InputDate;
