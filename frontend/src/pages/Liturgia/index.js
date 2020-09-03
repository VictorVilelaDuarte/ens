import React, { useState, useEffect } from 'react';

import {
  Container,
  Principal,
  LiturgiaDiv,
  OracaoDiv,
  SubTitle,
  Item,
} from './styles';
import api from '../../services/api';

import Title from '../../components/Title';

function Liturgia() {
  const [oracao, setOracao] = useState([]);

  useEffect(() => {
    api
      .get(`/oracao`)
      .then((res) => {
        if (res.data.status === true) {
          res.data.data.map((item) => {
            setOracao((prevOracoes) => [...prevOracoes, item]);
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <Container>
      <Principal>
        <LiturgiaDiv>
          <Title> Liturgia </Title>
          <SubTitle>1. Liturgia Diária:</SubTitle>
          <Item>
            (Fonte:
            <a
              target="_blank"
              href="http://catolicoorante.com.br/liturgia_diaria.html"
            >
              {' '}
              Católico Orante{' '}
            </a>
            )
          </Item>
          <Item>
            (Fonte:
            <a
              target="_blank"
              href="http://liturgiadiaria.cnbb.org.br/app/user/user/UserView.php"
            >
              {' '}
              CNBB{' '}
            </a>
            )
          </Item>
          <SubTitle>2. Notícias do Vaticano:</SubTitle>
          <Item>
            (Fonte:
            <a target="_blank" href="https://pt.zenit.org/">
              {' '}
              Zenit.org
            </a>
            )
          </Item>
          <SubTitle>3. Nossa Diocese</SubTitle>
          <Item>
            (Fonte:
            <a
              target="_blank"
              href="http://diocesedetaubate.org.br/categoria/paroquias/cacapava/"
            >
              {' '}
              Diocese de Taubaté - Caçapava
            </a>
            )
          </Item>
        </LiturgiaDiv>
        <OracaoDiv>
          <Title> Orações </Title>
          {oracao.map((item) => (
            <Item>
              <a>{item.Oracao_Titulo}</a>
            </Item>
          ))}
        </OracaoDiv>
      </Principal>
    </Container>
  );
}

export default Liturgia;
