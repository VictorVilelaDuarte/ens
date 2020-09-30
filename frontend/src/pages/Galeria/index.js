import React, { useState, useEffect } from 'react';
import ReactBnbGallery from 'react-bnb-gallery';

import {
  Container,
  GaleriaDiv,
  AlbumDiv,
  AlbumFoto,
  AlbumFotoDiv,
  AlbumNome,
  AlbumData,
} from './styles';

import api from '../../services/api';

import Title from '../../components/Title';

function Galeria() {
  const [galeria, setGaleria] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    api
      .get(`/galeria`)
      .then((res) => {
        if (res.data.status === true) {
          res.data.data.map((item) => {
            setGaleria((prevGaleria) => [...prevGaleria, item]);
          });
        }
      })
      .catch(() => {});
  }, []);

  function formatDate(date) {
    const nDate = new Date(date);
    const year = nDate.getFullYear();
    let month = nDate.getMonth() + 1;
    let dt = nDate.getDate();

    if (dt < 10) {
      dt = `0${dt}`;
    }
    if (month < 10) {
      month = `0${month}`;
    }
    return `${dt}/${month}/${year}`;
  }

  function loadPhotos(id) {
    setPhotos([]);
    api
      .get(`/album/${id}`)
      .then((res) => {
        if (res.data.status === true) {
          res.data.data.map((item) => {
            const i = {
              photo: item.Foto_Path,
            };
            setPhotos((prevPhotos) => [...prevPhotos, i]);
          });
        }
        setIsOpen(true);
      })
      .catch(() => {});
  }

  return (
    <Container>
      <Title>Galeria</Title>
      <GaleriaDiv>
        {galeria.map((item) => (
          <AlbumDiv onClick={() => loadPhotos(item.Galeria_ID)}>
            <AlbumFotoDiv>
              <AlbumFoto src={item.Capa_Path} />
            </AlbumFotoDiv>
            <AlbumNome>{item.Galeria_Titulo}</AlbumNome>
            <AlbumData>{formatDate(item.Galeria_Data)}</AlbumData>
          </AlbumDiv>
        ))}
        <ReactBnbGallery
          phrases={{
            showPhotoList: 'Mostrar miniaturas',
            hidePhotoList: 'Esconder miniaturas',
          }}
          show={isOpen}
          photos={photos}
          onClose={() => setIsOpen(false)}
        />
      </GaleriaDiv>
    </Container>
  );
}

export default Galeria;
