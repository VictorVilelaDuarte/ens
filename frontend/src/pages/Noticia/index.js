import React, { useState, useEffect } from 'react';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';

import api from '../../services/api';

import {
  Container,
  CorpoDiv,
  NoticiaDiv,
  Image,
  NoticiaTitulo,
  NoticiaDetalhe,
} from './styles';

import Title from '../../components/Title';

function Noticia({ match }) {
  const [Cnoticia, setCNoticia] = useState({});

  useEffect(() => {
    const { noticia } = match.params;

    api
      .get(`/noticia/${noticia}`)
      .then((res) => {
        const response = res.data.data[0];
        setCNoticia(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function formatDate(date) {
    const nDate = new Date(date);
    nDate.setDate(nDate.getDate() + 1);
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

  return (
    <Container>
      <Title>Notícia</Title>
      <NoticiaDiv>
        <CorpoDiv>
          <Image src={Cnoticia.noticia_imagem} />
          <NoticiaTitulo>{Cnoticia.noticia_titulo}</NoticiaTitulo>
          <HTMLEllipsis
            unsafeHTML={Cnoticia.noticia_texto}
            maxLine="500"
            ellipsis="..."
            basedOn="letters"
          />
          <NoticiaDetalhe>
            <b>
              Publicado por: {Cnoticia.noticia_autor},{' '}
              {formatDate(Cnoticia.noticia_hora)}
            </b>
          </NoticiaDetalhe>
        </CorpoDiv>
      </NoticiaDiv>
    </Container>
  );
}

export default Noticia;
