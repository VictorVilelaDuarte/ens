import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import api from '../../services/api';
import history from '../../services/history';

import Title from '../../components/Title';
import InputTexto from '../../components/InputTexto';
import InputFile from '../../components/InputFile';
import Button from '../../components/Button';

import { Container, FormDiv, TitleDiv, FormInputs } from './styles';

function InformensCadastro() {
  const formRef = useRef(null);
  const [file, setFile] = useState();

  function handleFile(e) {
    setFile(e.target.files[0]);
  }

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        title: Yup.string().required('O titulo é obrigatório'),
        file: Yup.string().required('O arquivo é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const formData = new FormData();
      formData.append('file', file);
      formData.append('titulo', data.title);
      api
        .post('/arquivo', formData)
        .then((res) => {
          toast.info(res.data.message);
          history.push('/arquivoadm');
        })
        .catch((err) => {
          console.log(err);
          // toast.error(err.data.message);
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
        <TitleDiv>
          <Title back="/arquivoadm">Cadastro de Arquivo</Title>
        </TitleDiv>
        <FormDiv>
          <FormInputs ref={formRef} onSubmit={handleSubmit}>
            <InputTexto name="title" placeholder="Digite o titulo do Arquivo" />
            <InputFile
              name="file"
              accept="*"
              onChange={(event) => handleFile(event)}
            />
            <Button type="submit">Enviar</Button>
          </FormInputs>
        </FormDiv>
      </Container>
    </>
  );
}

export default InformensCadastro;
