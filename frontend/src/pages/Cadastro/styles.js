import styled from 'styled-components';
import { Form } from '@unform/web';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  padding: 10px;
`;

export const TitleDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

export const FormDiv = styled.div`
  width: 90%;
  align-self: center;
  padding: 10px;
  display: flex;
  justify-content: center;
`;

export const FormData = styled(Form)`
  width: 80%;
  display: flex;
  flex-direction: column;
`;