import React, { useState, useRef } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ImageUploader from 'react-images-upload';

// import styles from './ckeditor.module.css';
import './ckeditor.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Title from '../../components/Title';
import InputTexto from '../../components/InputTexto';
import InputSwitch from '../../components/InputSwitch';

import { Container, FormDiv, TitleDiv, FormData } from './styles';

function NoticiaCadastro() {
  const formRef = useRef(null);
  const [picture, setPicture] = useState([]);
  const [text, setText] = useState('');

  function onDrop(Cpicture) {
    setPicture([...picture, Cpicture]);
  }

  function handleSubmit(data) {
    console.log(data);
    console.log(picture, text);
  }

  return (
    <>
      <Header />
      <Container>
        <TitleDiv>
          <Title>Cadastro de notícia</Title>
        </TitleDiv>
        <FormDiv>
          <FormData ref={formRef} onSubmit={handleSubmit}>
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
          </FormData>
        </FormDiv>
      </Container>
      <Footer />
    </>
  );
}

export default NoticiaCadastro;
