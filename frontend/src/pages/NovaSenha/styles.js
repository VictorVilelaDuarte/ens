import styled from 'styled-components';
import { Form } from '@unform/web';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
`;

export const DivForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FormLogin = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const WelcomeText = styled.p`
  text-align: center;
  margin-top: 10px;
  font-size: 15px;
`;
