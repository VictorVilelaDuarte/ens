import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Button = styled.button`
  height: 46px;
  background-color: #0875d1;
  border-radius: 4px;
  border: none;
  width: 150px;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #fff;
`;

export const Container = styled(Link)`
  width: 50%;
  display: flex;
  justify-content: flex-end;
`;
