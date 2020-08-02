import React, { useRef, useContext } from 'react';
import { FaUser, FaLock, FaMobile, FaEnvelope, FaFile } from 'react-icons/fa';
import * as Yup from 'yup';

import { AuthContext } from '../../context/AuthContext';

import { Container, DivForm, FormLogin } from './styles';

import InputTexto from '../../components/InputTexto';
import InputTextArea from '../../components/InputTextArea';
import InputSelect from '../../components/InputSelect';
import Button from '../../components/Button';
import Title from '../../components/Title';

export default function Contato() {
  const { signIn } = useContext(AuthContext);

  const formRef = useRef(null);
  async function handleLogin(data) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        idmens: Yup.string()
          .required('O IDMENS é obrigatório')
          .length(12, 'O IDMENS deve ter 12 dígitos'),
        password: Yup.string()
          .min(6, 'Minimo 6 caracteres')
          .required('A senha é obrigatória'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      signIn(data);
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <>
      <Container>
        <Title>Contato</Title>
        <DivForm>
          <FormLogin ref={formRef} onSubmit={handleLogin}>
            <InputTexto name="nome" placeholder="Digite seu Nome">
              <FaUser size={20} />
            </InputTexto>
            <InputTexto name="telefone" placeholder="Digite seu telefone">
              <FaMobile size={20} />
            </InputTexto>
            <InputTexto name="email" placeholder="Digite seu e-email">
              <FaEnvelope size={20} />
            </InputTexto>
            <InputSelect
              name="assunto"
              opcoes={[
                {
                  value: '0',
                  label: 'Selecione o assunto',
                },
                {
                  value: 'Informens',
                  label: 'Informens',
                },
                {
                  value: 'Acervo',
                  label: 'Acervo',
                },
                {
                  value: 'Site',
                  label: 'Site',
                },
              ]}
            >
              <FaFile size={20} />
            </InputSelect>
            <InputTextArea
              rows={9}
              name="conteudo"
              placeholder="Digite aqui sua mensagem..."
            >
              <FaLock size={20} />
            </InputTextArea>
            <Button type="submit">Entrar</Button>
          </FormLogin>
        </DivForm>
      </Container>
    </>
  );
}
