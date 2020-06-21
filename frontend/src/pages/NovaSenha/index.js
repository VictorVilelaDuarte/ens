import React, { useEffect, useState } from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';
import { FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';

import api from '../../services/api';
import history from '../../services/history';
import { Container, DivForm, WelcomeText } from './styles';

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
    api
      .post(`/user`, {
        idmens: user.idmens,
        senha: password,
      })
      .then((res) => {
        toast.info(res.data.message);
        history.push(`/login`);
      })
      .catch(() => {
        toast.error(`Erro, tente novamente mais tarde`);
      });
  }

  return (
    <>
      <Container>
        <Title>Nova senha - {user.name}</Title>
        <DivForm>
          <WelcomeText>
            Lembre-se que só poderá ser cadastra uma senha forte
          </WelcomeText>
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
            <Button disabled>Entrar</Button>
          ) : (
            <Button onClick={() => handleLogin()}>Entrar</Button>
          )}
        </DivForm>
      </Container>
    </>
  );
}
