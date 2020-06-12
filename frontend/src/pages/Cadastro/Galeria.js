import React, { useState, useRef, useEffect } from 'react';
import ImageUploader from 'react-images-upload';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import api from '../../services/api';
import history from '../../services/history';

import Title from '../../components/Title';
import InputTexto from '../../components/InputTexto';
import InputDate from '../../components/InputDate';
import Button from '../../components/Button';

import { Container, FormDiv, TitleDiv, FormInputs } from './styles';

function GaleriaEvento({ match }) {
  const formRef = useRef(null);
  const [picture, setPicture] = useState();
  const [CGaleria, setCGaleria] = useState();

  useEffect(() => {
    const { galeria } = match.params;
    function getCGaleria() {
      api
        .get(`/galeria/${galeria}`)
        .then((res) => {
          const response = res.data.data[0];
          const CGaleriaOBJ = {
            id: response.Galeria_ID,
            data: response.Galeria_Data,
            titulo: response.Galeria_Titulo,
            picture: [response.Capa_Path],
          };
          setCGaleria(CGaleriaOBJ);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getCGaleria();
  }, []);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        data: Yup.string().required('A data do album é obrigatória'),
        titulo: Yup.string().required('O titulo do album é obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (!picture && !CGaleria) {
        toast.error('É necessário inserir capa no album');
        return;
      }

      const json = {
        data: data.data,
        titulo: data.titulo,
      };

      if (CGaleria) {
        console.log(CGaleria);
        api
          .put(`/galeria/${CGaleria.id}`, json)
          .then((res) => {
            const formData = new FormData();
            if (picture) {
              formData.append('file', picture[0]);
              formData.append('galeria', CGaleria.id);
              api
                .post(`/capa`, formData)
                .then(() => {
                  toast.info('Album alterado com sucesso!');
                  history.push('/galeriaadm');
                })
                .catch((err) => console.log(err));
            } else {
              toast.info(res.data.message);
              history.push('/galeriaadm');
            }
          })
          .catch((err) => {
            toast.error(err.data.message);
          });
      } else {
        api
          .post('/galeria', json)
          .then((res) => {
            const formData = new FormData();
            formData.append('file', picture[0]);
            formData.append('galeria', res.data.data[0].Galeria_ID);
            api
              .post(`/capa`, formData)
              .then(() => {
                toast.info('Album salvo com sucesso!');
                history.push('/galeriaadm');
              })
              .catch((err) => console.log(err));
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

  function onDrop(Cpicture) {
    setPicture(Cpicture);
  }

  return (
    <>
      <Container>
        <TitleDiv>
          <Title>Cadastro de album</Title>
        </TitleDiv>
        <FormDiv>
          <FormInputs
            ref={formRef}
            initialData={CGaleria}
            onSubmit={handleSubmit}
          >
            <InputTexto name="titulo" placeholder="Digite o titulo do album" />
            <InputDate name="data" placeholder="Digite a data do do allbum" />
            <ImageUploader
              defaultImages={CGaleria ? CGaleria.picture : ''}
              withIcon
              withPreview
              singleImage
              label="Escolha capa do album (até 5Mb)"
              buttonText="Escolher imagem"
              onChange={onDrop}
              imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
              maxFileSize={5242880}
            />
            <Button type="submit">Enviar</Button>
          </FormInputs>
        </FormDiv>
      </Container>
    </>
  );
}

export default GaleriaEvento;
