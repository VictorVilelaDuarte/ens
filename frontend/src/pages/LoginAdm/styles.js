import styled from 'styled-components';
import Input from '../../components/Input';
import Password from '../../components/Password';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
`;

export const InputTexto = styled(Input)`
  margin-bottom: 10px;
`;

export const InputPassword = styled(Password)`
  margin-top: 50px;
`;
