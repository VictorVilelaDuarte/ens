import React, { useState } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ImageUploader from 'react-images-upload';

// import styles from './ckeditor.module.css';
import './ckeditor.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Title from '../../components/Title';

import { Container, FormDiv, TitleDiv } from './styles';

function NoticiaCadastro() {
  const [pictures, setPictures] = useState([]);
  const [text, setText] = useState('');

  function onDrop(picture) {
    setPictures([...pictures, picture]);
  }

  return (
    <>
      <Header />
      <Container>
        <TitleDiv>
          <Title>Cadastro de notícia</Title>
        </TitleDiv>
        <FormDiv>
          <ImageUploader
            withIcon
            withPreview
            singleImage
            label="Escolha imagem de até 5Mb"
            buttonText="Escolher imagem"
            onChange={onDrop}
            imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
            maxFileSize={5242880}
          />
          <CKEditor
            editor={ClassicEditor}
            data=""
            onInit={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
              setText(data);
            }}
            onBlur={(event, editor) => {
              console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
              console.log('Focus.', editor);
            }}
          />
        </FormDiv>
      </Container>
      <Footer />
    </>
  );
}

export default NoticiaCadastro;
