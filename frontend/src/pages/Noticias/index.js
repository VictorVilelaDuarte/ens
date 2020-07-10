/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import { Link } from 'react-router-dom';

import {
  Container,
  DivNoticias,
  DivNoticia,
  DivImagemNoticia,
  Imagem,
  DivNoticiaDetalhe,
  NoticiaTitulo,
  LerMais,
} from './styles';

import api from '../../services/api';

import Title from '../../components/Title';

function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [Cpage, setCPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    function getEventos() {
      api
        .get(`/noticia?page=${Cpage}`)
        .then((res) => {
          res.data.data.map((item) => {
            setNoticias((prevNoticias) => [...prevNoticias, item]);
          });
          const { lastpage, page, nextpage, prevpage } = res.headers;
          setPagination({
            lastpage,
            page,
            nextpage,
            prevpage,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getEventos();
  }, [Cpage]);

  function handleChangePagination(nPage) {
    setNoticias([]);
    setCPage(nPage);
  }

  return (
    <Container>
      <Title>Notícias</Title>
      <DivNoticias>
        {noticias.map((item) => (
          <DivNoticia>
            <DivImagemNoticia>
              <Imagem src={item.noticia_imagem} />
            </DivImagemNoticia>
            <DivNoticiaDetalhe>
              <NoticiaTitulo>{item.noticia_titulo}</NoticiaTitulo>
              <HTMLEllipsis
                unsafeHTML={item.noticia_texto}
                maxLine="8"
                ellipsis="..."
                basedOn="letters"
              />
              <Link to={`/noticia/${item.noticia_cod}`}>
                <LerMais>Ler mais</LerMais>
              </Link>
            </DivNoticiaDetalhe>
          </DivNoticia>
        ))}
      </DivNoticias>
      <Pagination>
        {pagination.lastpage === '1' ? (
          <></>
        ) : pagination.page === pagination.prevpage ? (
          <>
            <Pagination.Item active>{pagination.page}</Pagination.Item>
            <Pagination.Item
              onClick={() => handleChangePagination(pagination.nextpage)}
            >
              {pagination.nextpage}
            </Pagination.Item>
            <Pagination.Last
              onClick={() => handleChangePagination(pagination.lastpage)}
            />
          </>
        ) : pagination.page === pagination.lastpage ? (
          <>
            <Pagination.First onClick={() => handleChangePagination(1)} />
            <Pagination.Item
              onClick={() => handleChangePagination(pagination.prevpage)}
            >
              {pagination.prevpage}
            </Pagination.Item>
            <Pagination.Item active>{pagination.page}</Pagination.Item>
          </>
        ) : (
          <>
            <Pagination.First onClick={() => handleChangePagination(1)} />
            <Pagination.Item
              onClick={() => handleChangePagination(pagination.prevpage)}
            >
              {pagination.prevpage}
            </Pagination.Item>
            <Pagination.Item active>{pagination.page}</Pagination.Item>
            <Pagination.Item
              onClick={() => handleChangePagination(pagination.nextpage)}
            >
              {pagination.nextpage}
            </Pagination.Item>
            <Pagination.Last
              onClick={() => handleChangePagination(pagination.lastpage)}
            />
          </>
        )}
      </Pagination>
    </Container>
  );
}

export default Noticias;
