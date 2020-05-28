import styled from 'styled-components';
import { FormCheck } from 'react-bootstrap';

export const Container = styled.div`
  width: 100%;
`;

export const Check = styled(FormCheck)`
  padding-top: 5px;

  label {
    font-size: 15px;
    padding-top: 3px;
  }
`;
