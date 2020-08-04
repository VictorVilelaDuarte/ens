import React, { useState, useEffect } from 'react';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';

import { Container } from './styles';

import api from '../../services/api';
import Title from '../../components/Title';

function Regiao() {
  const [page, setPage] = useState('');

  useEffect(() => {
    function getPage() {
      api
        .get(`/pagina/${2}`)
        .then((res) => {
          setPage(res.data.data[0].pagina_conteudo);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getPage();
  }, []);

  return (
    <Container>
      <Title>Região</Title>
      <HTMLEllipsis
        unsafeHTML={page}
        maxLine="500"
        ellipsis="..."
        basedOn="letters"
      />
    </Container>
  );
}

export default Regiao;
