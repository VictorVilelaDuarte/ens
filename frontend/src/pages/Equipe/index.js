import React, { useEffect, useState } from 'react';

import api from '../../services/api';

import Title from '../../components/Title';

import { Container, PhotoDiv, Photo, CasalDiv } from './styles';

function Equipe({ match }) {
  const [equipe, setEquipe] = useState({});
  const [casais, setCasais] = useState([]);

  useEffect(() => {
    const { equipe } = match.params;
    setCasais([]);
    api
      .get(`/equipeDetalhe/${equipe}`)
      .then((res) => {
        const response = res.data.data[0];
        setEquipe(response);
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .get(`/equipeCasais/${equipe}`)
      .then((res) => {
        const response = res.data.data;
        response.map((item) => {
          setCasais((oldCasais) => [...oldCasais, item]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [match.params]);

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
      <Title>{equipe.Equipe_Nome}</Title>
      <PhotoDiv>
        <Photo src={equipe.Equipe_imagem} />
      </PhotoDiv>
      <p>
        <b>Fundação da equipe: </b>
        {formatDate(equipe.Equipe_DataFundacao)}
      </p>
      <p>
        <b>Conselheiro da equipe: </b>
        {equipe.Conselheiro_Perfil}
      </p>
      <p>
        <b>Casal responsável: </b>
        {equipe.Casal_Nome}
      </p>
      <hr />
      <b>Casais da equipe:</b>
      {casais.map((item) => (
        <CasalDiv>{item.Casal_Nome}</CasalDiv>
      ))}
    </Container>
  );
}

export default Equipe;
