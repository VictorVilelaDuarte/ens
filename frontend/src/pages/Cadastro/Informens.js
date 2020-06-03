import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import api from '../../services/api';
import history from '../../services/history';

import './ckeditor.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Title from '../../components/Title';
import InputTexto from '../../components/InputTexto';
import InputFile from '../../components/InputFile';
import InputDate from '../../components/InputDate';
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
        date: Yup.string().required('A data é obrigatória'),
        file: Yup.string().required('O arquivo é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const formData = new FormData();
      formData.append('file', file);
      formData.append('titulo', data.title);
      formData.append('data', data.date);
      api
        .post('/informens', formData)
        .then((res) => {
          toast.info(res.data.message);
          history.push('/informensadm');
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
      <Header />
      <Container>
        <TitleDiv>
          <Title>Cadastro de Informens</Title>
        </TitleDiv>
        <FormDiv>
          <FormInputs ref={formRef} onSubmit={handleSubmit}>
            <InputTexto
              name="title"
              placeholder="Digite o titulo do Informens"
            />
            <InputFile
              name="file"
              accept="application/pdf"
              onChange={(event) => handleFile(event)}
            />
            <InputDate name="date" placeholder="Data do informens" />
            <Button type="submit">Enviar</Button>
          </FormInputs>
        </FormDiv>
      </Container>
      <Footer />
    </>
  );
}

export default InformensCadastro;
