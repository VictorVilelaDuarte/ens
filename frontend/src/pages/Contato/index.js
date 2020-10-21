import React, { useRef } from 'react';
import {
  FaUser,
  FaMobile,
  FaEnvelope,
  FaFile,
  FaCommentDots,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import api from '../../services/api';
import history from '../../services/history';

import { Container, DivForm, FormLogin } from './styles';

import InputTexto from '../../components/InputTexto';
import InputTextArea from '../../components/InputTextArea';
import InputSelect from '../../components/InputSelect';
import Button from '../../components/Button';
import Title from '../../components/Title';

export default function Contato() {
  const formRef = useRef(null);
  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        nome: Yup.string().required('O Nome é obrigatório'),
        telefone: Yup.string().required('O telefone é obrigatório'),
        email: Yup.string().required('O e-mail é obrigatório'),
        assunto: Yup.string().test(
          'is-selecione',
          'O assunto obrigatório',
          (value) => value !== '0'
        ),
        conteudo: Yup.string().required('A mensagem é obrigatória'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      const json = {
        nome: data.nome,
        assunto: data.assunto,
        conteudo: data.conteudo,
        telefone: data.telefone,
        email: data.email,
      };

      api
        .post('/mensagem', json)
        .then((res) => {
          toast.info(res.data.message);
          history.push('/');
        })
        .catch((err) => {
          toast.error(err.data.message);
        });
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
          <FormLogin ref={formRef} onSubmit={handleSubmit}>
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
                  value: 'Acervo',
                  label: 'Acervo',
                },
                {
                  value: 'Comunicação',
                  label: 'Comunicação',
                },
                {
                  value: 'Informens',
                  label: 'Informens',
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
              <FaCommentDots size={20} />
            </InputTextArea>
            <Button type="submit">Entrar</Button>
          </FormLogin>
        </DivForm>
      </Container>
    </>
  );
}
