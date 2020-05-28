import React, { useState, useRef, useEffect, useContext } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ImageUploader from 'react-images-upload';
import { toast } from 'react-toastify';

import api from '../../services/api';
import history from '../../services/history';
import { AuthContext } from '../../context/AuthContext';

import './ckeditor.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Title from '../../components/Title';
import InputTexto from '../../components/InputTexto';
import InputSwitch from '../../components/InputSwitch';
import Button from '../../components/Button';

import { Container, FormDiv, TitleDiv, FormInputs } from './styles';

function NoticiaCadastro() {
  const formRef = useRef(null);
  const [picture, setPicture] = useState();
  const [text, setText] = useState('');

  const { verifyAuth } = useContext(AuthContext);
  useEffect(() => {
    verifyAuth('/noticiaCadastro');
  }, []);

  function onDrop(Cpicture) {
    setPicture(Cpicture);
  }

  function handleSubmit(data) {
    const formData = new FormData();
    formData.append('file', picture[0]);
    formData.append('titulo', data.title);
    formData.append('texto', text);
    formData.append('destaque', data.noticiaDestaque ? '1' : '0');

    api
      .post('/noticia', formData)
      .then((res) => {
        toast.info(res.data.message);
        history.push('/noticiaadm');
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  }

  return (
    <>
      <Header />
      <Container>
        <TitleDiv>
          <Title>Cadastro de notícia</Title>
        </TitleDiv>
        <FormDiv>
          <FormInputs ref={formRef} onSubmit={handleSubmit}>
            <InputTexto name="title" placeholder="Digite o titulo da notícia" />
            <ImageUploader
              withIcon
              withPreview
              singleImage
              label="Escolha imagem da notícia (até 5Mb)"
              buttonText="Escolher imagem"
              onChange={onDrop}
              imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
              maxFileSize={5242880}
            />
            <CKEditor
              editor={ClassicEditor}
              config={{ placeholder: 'Digite o texto da notícia' }}
              data=""
              onChange={(event, editor) => {
                const data = editor.getData();
                setText(data);
              }}
            />
            <InputSwitch label="Notícia destaque" name="noticiaDestaque" />
            <Button type="submit">Enviar</Button>
          </FormInputs>
        </FormDiv>
      </Container>
      <Footer />
    </>
  );
}

export default NoticiaCadastro;
