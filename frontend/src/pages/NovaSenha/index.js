import React, { useEffect, useState } from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';
import { FaLock } from 'react-icons/fa';

import { Container, DivForm, FormLogin } from './styles';

import InputGeneric from '../../components/InputGeneric';
import Button from '../../components/Button';
import Title from '../../components/Title';

export default function NovaSenha(props) {
  const [user, setUser] = useState({});
  const [password, setPassword] = useState('');
  const [score, setScore] = useState('');

  useEffect(() => {
    setUser({
      name: props.location.state.user[0].Casal_nome,
      idmens: props.location.state.user[0].Casal_IDMENS,
    });
  }, []);

  function handleLogin() {
    console.log('aqui');
  }

  return (
    <>
      <Container>
        <Title>Nova senha</Title>
        <DivForm>
          <InputGeneric
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua nova senha"
          >
            <FaLock size={20} />
          </InputGeneric>
          <PasswordStrengthBar
            style={{ width: 300 }}
            scoreWords={[
              'SENHA FRACA',
              'SENHA AINDA FRACA',
              'SENHA QUASE BOA...',
              'SENHA BOA',
              'SENHA FORTE',
            ]}
            shortScoreWord="SENHA MUITO CURTA"
            onChangeScore={(s) => {
              setScore(s);
            }}
            password={password}
          />
          {score < 3 ? (
            <Button disabled>Entrar2</Button>
          ) : (
            <Button onClick={() => handleLogin()}>Entrar</Button>
          )}
        </DivForm>
      </Container>
    </>
  );
}
