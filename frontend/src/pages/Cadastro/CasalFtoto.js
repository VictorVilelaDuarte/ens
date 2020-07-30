import React, { useState, useRef, useEffect } from 'react';
import ImageUploader from 'react-images-upload';
import { toast } from 'react-toastify';

import api from '../../services/api';
import history from '../../services/history';

import Title from '../../components/Title';
import Button from '../../components/Button';

import { Container, FormDiv, TitleDiv, FormInputs } from './styles';

function NoticiaCadastro({ match }) {
  const formRef = useRef(null);
  const [picture, setPicture] = useState();
  const [CPicture, setCPicture] = useState();
  const [idmens, setIdmens] = useState();

  useEffect(() => {
    const { casal } = match.params;
    setIdmens(casal);

    api
      .get(`/casalBusca/${casal}`)
      .then((res) => {
        const response = res.data.data[0];
        setCPicture({ picture: [response.Casal_imagem] });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function onDrop(Cpicture) {
    setPicture(Cpicture);
  }

  async function handleSubmit(data) {
    if (!picture) {
      return;
    }

    const formData = new FormData();
    if (picture) {
      formData.append('file', picture[0]);
    }

    api
      .post(`/casalFoto/${idmens}`, formData)
      .then((res) => {
        toast.info(res.data.message);
        history.push('/quadranteadm');
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  }

  return (
    <>
      <Container>
        <TitleDiv>
          <Title back="/quadranteadm">Cadastro de foto de casal</Title>
        </TitleDiv>
        <FormDiv>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              alignItems: 'center',
            }}
          >
            <ImageUploader
              defaultImages={CPicture ? CPicture.picture : ''}
              withIcon
              withPreview
              singleImage
              label="Escolha imagem da notícia (até 5Mb)"
              buttonText="Escolher imagem"
              onChange={onDrop}
              imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
              maxFileSize={5242880}
            />
            <Button type="button" onClick={() => handleSubmit()}>
              Enviar
            </Button>
          </div>
        </FormDiv>
      </Container>
    </>
  );
}

export default NoticiaCadastro;
