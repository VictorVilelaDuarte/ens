import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import api from '../../services/api';
import history from '../../services/history';

import './ckeditor.css';
import Title from '../../components/Title';
import InputTexto from '../../components/InputTexto';
import Button from '../../components/Button';

import { Container, FormDiv, TitleDiv, FormInputs, Label } from './styles';

function PadroeiraCadastro({ match }) {
  const formRef = useRef(null);
  const [CPadroeira, setCPadroeira] = useState();

  useEffect(() => {
    const { padroeira } = match.params;
    function getCPadroeira() {
      api
        .get(`/padroeira/${padroeira}`)
        .then((res) => {
          const response = res.data.data[0];
          const CPadroeiraOBJ = {
            id: response.Padroeira_ID,
            nome: response.Padroeira_Nome,
            descricao: response.Padroeira_Descricao,
          };
          setCPadroeira(CPadroeiraOBJ);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (padroeira) {
      getCPadroeira();
    }
  }, []);

  async function handleSubmit(data) {
    console.log(data);

    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        nome: Yup.string().required('O nome da padroeira é obrigatório'),
        descricao: Yup.string().required('A descrição é obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const json = {
        nome: data.nome,
        descricao: data.descricao,
      };

      if (CPadroeira) {
        api
          .put(`/padroeira/${CPadroeira.id}`, json)
          .then((res) => {
            toast.info(res.data.message);
            history.push('/padroeiraadm');
          })
          .catch((err) => {
            toast.error(err.data.message);
          });
      } else {
        api
          .post('/padroeira', json)
          .then((res) => {
            toast.info(res.data.message);
            history.push('/padroeiraadm');
          })
          .catch((err) => {
            toast.error(err.data.message);
          });
      }
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
        <TitleDiv>
          <Title>Cadastro de Padroeira</Title>
        </TitleDiv>
        <FormDiv>
          <FormInputs
            ref={formRef}
            initialData={CPadroeira}
            onSubmit={handleSubmit}
          >
            <Label>Nome da padroira</Label>
            <InputTexto name="nome" placeholder="Digite o nome da padroeira" />
            <Label>Descrição da padroira</Label>
            <InputTexto
              name="descricao"
              placeholder="Digite a descrição da padroeira"
            />
            <Button type="submit">Enviar</Button>
          </FormInputs>
        </FormDiv>
      </Container>
    </>
  );
}

export default PadroeiraCadastro;
