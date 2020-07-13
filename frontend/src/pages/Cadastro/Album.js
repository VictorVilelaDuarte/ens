import React, { useState, useRef, useEffect } from 'react';
import ImageUploader from 'react-images-upload';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import api from '../../services/api';
import history from '../../services/history';

import Title from '../../components/Title';
import Button from '../../components/Button';

import { Container, FormDiv, TitleDiv, FormInputs } from './styles';

function AlbumCadastro({ match }) {
  const formRef = useRef(null);
  const [picture, setPicture] = useState([]);
  const [CAlbum, setCAlbum] = useState();

  useEffect(() => {
    const { album } = match.params;
    function getCAlbum() {
      api
        .get(`/album/${album}`)
        .then((res) => {
          setCAlbum(album);
          res.data.data.map((item) => {
            setPicture((oldPictures) => [...oldPictures, item.Foto_Path]);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getCAlbum();
  }, []);

  // async function handleSubmit(data) {
  //   try {
  //     formRef.current.setErrors({});
  //     const schema = Yup.object().shape({
  //       data: Yup.string().required('A data do album é obrigatória'),
  //       titulo: Yup.string().required('O titulo do album é obrigatória'),
  //     });

  //     await schema.validate(data, {
  //       abortEarly: false,
  //     });

  //     if (!picture && !CGaleria) {
  //       toast.error('É necessário inserir capa no album');
  //       return;
  //     }

  //     const json = {
  //       data: data.data,
  //       titulo: data.titulo,
  //     };

  //     if (CGaleria) {
  //       api
  //         .put(`/galeria/${CGaleria.id}`, json)
  //         .then((res) => {
  //           const formData = new FormData();
  //           if (picture) {
  //             formData.append('file', picture[0]);
  //             formData.append('galeria', CGaleria.id);
  //             api
  //               .post(`/capa`, formData)
  //               .then(() => {
  //                 toast.info('Album alterado com sucesso!');
  //                 history.push('/galeriaadm');
  //               })
  //               .catch((err) => console.log(err));
  //           } else {
  //             toast.info(res.data.message);
  //             history.push('/galeriaadm');
  //           }
  //         })
  //         .catch((err) => {
  //           toast.error(err.data.message);
  //         });
  //     } else {
  //       api
  //         .post('/galeria', json)
  //         .then((res) => {
  //           const formData = new FormData();
  //           formData.append('file', picture[0]);
  //           formData.append('galeria', res.data.data[0].Galeria_ID);
  //           api
  //             .post(`/capa`, formData)
  //             .then(() => {
  //               toast.info('Album salvo com sucesso!');
  //               history.push('/galeriaadm');
  //             })
  //             .catch((err) => console.log(err));
  //         })
  //         .catch((err) => {
  //           toast.error(err.data.message);
  //         });
  //     }
  //   } catch (err) {
  //     const validationErrors = {};
  //     if (err instanceof Yup.ValidationError) {
  //       err.inner.forEach((error) => {
  //         validationErrors[error.path] = error.message;
  //       });
  //       formRef.current.setErrors(validationErrors);
  //     }
  //   }
  // }

  useEffect(() => {
    console.log(picture);
    console.log('lteriu');
  }, [picture]);

  function onDrop(Cpicture) {
    console.log(Cpicture);
    // setPicture(Cpicture);
    if (Cpicture.length > 0) {
      console.log('entro');
      setPicture((oldPictures) => [...oldPictures, Cpicture]);
    }
  }

  return (
    <>
      <Container>
        <TitleDiv>
          <Title back="/galeriaadm">Cadastro de album</Title>
        </TitleDiv>
        <FormDiv>
          <FormInputs
            ref={formRef}
            // onSubmit={handleSubmit}
          >
            {/* {console.log(picture)} */}
            <ImageUploader
              defaultImages={picture}
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

export default AlbumCadastro;
