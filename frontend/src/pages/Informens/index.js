/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Document, pdfjs } from 'react-pdf';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';

import {
  Container,
  PrincipalItens,
  Principal,
  SubTitle,
  Itens,
  SelectDiv,
  FilterDiv,
} from './styles';

import api from '../../services/api';

import InputSelect from '../../components/InputSelect';
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
          res.data.data.map((item) => {
            setInformensDestaque((prevInformens) => [...prevInformens, item]);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getInformens();
  }, []);

  function filterInformens(e) {
    const year = e.target.value;
    setInformens([]);
    api
      .get(`/informensAno/${year}`)
      .then((res) => {
        res.data.data.map((item) => {
          setInformens((prevInformens) => [...prevInformens, item]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Container>
      <Title>Informens</Title>
      <PrincipalItens>
        {informensDestaque.map((item) => (
          <Link
            to={{
              pathname: '/pdf',
              state: item.Informens_Path,
            }}
          >
            <Document loading="Carregando o PDF..." file={item.Informens_Path}>
              <Principal scale={0.7} pageNumber={1} />
              <SubTitle>{item.Informens_Titulo}</SubTitle>
            </Document>
          </Link>
        ))}
      </PrincipalItens>
      <SelectDiv>
        <FilterDiv>
          <Form>
            <InputSelect
              name="ano"
              opcoes={[
                { value: 0, label: 'Selecione um ano para filtrar' },
                { value: 2020, label: '2020' },
                { value: 2019, label: '2019' },
                { value: 2018, label: '2018' },
              ]}
              onChange={(e) => filterInformens(e)}
            />
          </Form>
        </FilterDiv>
      </SelectDiv>
      <Itens>
        {informens.map((item) => (
          <Link
            to={{
              pathname: '/pdf',
              state: item.Informens_Path,
            }}
          >
            <Document loading="Carregando o PDF..." file={item.Informens_Path}>
              <Principal scale={0.4} pageNumber={1} />
              <SubTitle>{item.Informens_Titulo}</SubTitle>
            </Document>
          </Link>
        ))}
      </Itens>
    </Container>
  );
}

export default Informens;
