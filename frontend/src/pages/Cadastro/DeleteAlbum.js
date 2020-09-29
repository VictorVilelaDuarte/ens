import React, { useState, useRef, useEffect } from 'react';
import ImageUploader from 'react-images-upload';
import { toast } from 'react-toastify';

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
    setCAlbum(album);
  }, []);

  async function handleSubmit() {
    const formData = new FormData();
    formData.append('galeria', CAlbum);
    picture.map((item) => {
      formData.append('file', item);
    });

    api
      .post('/album', formData)
      .then(() => {
        toast.info('Fotos salvas com sucesso!');
        history.push('/galeriaadm');
      })
      .catch('Erro ao salvar as fotos');
  }

  function onDrop(Cpicture) {
    setPicture(Cpicture);
  }

  return (
    <>
      <Container>
        <TitleDiv>
          <Title back="/galeriaadm">Deletar fotos</Title>
        </TitleDiv>
        <FormDiv>
          <FormInputs ref={formRef} onSubmit={handleSubmit}>
            <ImageUploader
              withIcon
              withPreview
              label="Escolha fotos para adicionar ao album (até 5Mb)"
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
