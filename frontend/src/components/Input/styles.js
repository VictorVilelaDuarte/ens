import styled, { css } from 'styled-components';

export const Container = styled.div`
  padding: 0 15px;
  height: 46px;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: #fff;
  width: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
      color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #0377d1;
      color: #0377d1;
    `}
`;

export const InputText = styled.input`
  flex: 1;
  font-size: 16px;
  margin-left: 10px;
  border: none;
  background: transparent;
  width: 100%;
  color: #222;
`;

export const ErrorSpan = styled.span`
  color: #c53030;
  margin-top: 5px;
`;
