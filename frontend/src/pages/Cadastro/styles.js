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

export const FormInputs = styled(Form)`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Label = styled.label`
  align-self: flex-start;
  padding-left: 5px;
  margin-top: 5px;
  margin-bottom: -8px;
  font-size: 15px;
  color: #222222;
`;
