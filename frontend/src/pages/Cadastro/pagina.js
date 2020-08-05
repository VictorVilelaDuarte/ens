import React, { useState, useRef, useEffect } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import api from '../../services/api';
import history from '../../services/history';

import './ckeditor.css';
import Title from '../../components/Title';
import InputTexto from '../../components/InputTexto';
import InputSwitch from '../../components/InputSwitch';
import Button from '../../components/Button';

import { Container, FormDiv, TitleDiv, FormInputs } from './styles';

function NoticiaCadastro({ match }) {
  const formRef = useRef(null);
  const [picture, setPicture] = useState();
  const [text, setText] = useState('');
  const [CNoticia, setCNoticia] = useState();

  useEffect(() => {
    const { noticia } = match.params;

    api
      .get(`/noticia/${noticia}`)
      .then((res) => {
        const response = res.data.data[0];
        const CNoticiaOBJ = {
          id: response.noticia_cod,
          title: response.noticia_titulo,
          text: response.noticia_texto,
          picture: [response.noticia_imagem],
          noticiaDestaque: response.noticia_destaque === 1,
        };
        setCNoticia(CNoticiaOBJ);
        setText(CNoticiaOBJ.text);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function onDrop(Cpicture) {
    setPicture(Cpicture);
  }

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        title: Yup.string().required('O titulo é obrigatório'),
        noticiaDestaque: Yup.bool(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (!picture && !CNoticia) {
        toast.error('É necessário inserir imagem na notícia');
        return;
      }

      if (!text) {
        toast.error('É necessário inserir um texto na notícia');
        return;
      }

      const formData = new FormData();
      if (picture) {
        formData.append('file', picture[0]);
      }

      formData.append('titulo', data.title);
      formData.append('texto', text);
      formData.append('destaque', data.noticiaDestaque ? '1' : '0');

      if (CNoticia) {
        api
          .post(`/noticia/${CNoticia.id}`, formData)
          .then((res) => {
            toast.info(res.data.message);
            history.push('/noticiaadm');
          })
          .catch((err) => {
            toast.error(err.data.message);
          });
      } else {
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
          <Title back="/noticiaadm">Cadastro de notícia</Title>
        </TitleDiv>
        <FormDiv>
          <FormInputs
            ref={formRef}
            initialData={CNoticia}
            onSubmit={handleSubmit}
          >
            <InputTexto name="title" placeholder="Digite o titulo da notícia" />
            <ImageUploader
              defaultImages={CNoticia ? CNoticia.picture : ''}
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
              data={CNoticia ? CNoticia.text : ''}
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
    </>
  );
}

export default NoticiaCadastro;
