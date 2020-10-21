/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Link } from 'react-router-dom';

import {
  Container,
  PrincipalItens,
  Principal,
  SubTitle,
  Itens,
} from './styles';

import api from '../../services/api';

import Title from '../../components/Title';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Informens() {
  const [informensDestaque, setInformensDestaque] = useState([]);
  const [informens, setInformens] = useState([]);

  useEffect(() => {
    function getInformens() {
      api
        .get(`/informens`)
        .then((res) => {
          res.data.data.map((item, index) => {
            if (index < 4) {
              setInformensDestaque((prevInformens) => [...prevInformens, item]);
            } else {
              setInformens((prevInformens) => [...prevInformens, item]);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getInformens();
  }, []);

  return (
    <Container>
      <Title>Informens</Title>
      <PrincipalItens>
        {informensDestaque.map((item) => (
          <Document loading="Carregando o PDF..." file={item.Informens_Path}>
            <Principal scale={0.7} pageNumber={1} />
            <SubTitle>{item.Informens_Titulo}</SubTitle>
          </Document>
        ))}
      </PrincipalItens>
      <Itens>
        {informens.map((item) => (
          <Document loading="Carregando o PDF..." file={item.Informens_Path}>
            <Principal scale={0.4} pageNumber={1} />
            <SubTitle>{item.Informens_Titulo}</SubTitle>
          </Document>
        ))}
      </Itens>
    </Container>
  );
}

export default Informens;
