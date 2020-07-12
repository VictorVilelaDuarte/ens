import React from 'react';

import { Container, SubTitle, Item } from './styles';

import Title from '../../components/Title';

function Liturgia() {
  return (
    <Container>
      <Title> Liturgia </Title>
      <SubTitle>1. Liturgia Diária:</SubTitle>
      <Item>
        (Fonte:
        <a href="https://enscacapava.com.br/liturgia.php"> Católico Orante </a>)
      </Item>
      <Item>
        (Fonte:
        <a href="http://liturgiadiaria.cnbb.org.br/app/user/user/UserView.php">
          {' '}
          CNBB{' '}
        </a>
        )
      </Item>
      <SubTitle>2. Notícias do Vaticano:</SubTitle>
      <Item>
        (Fonte:
        <a href="https://pt.zenit.org/"> Zenit.org</a>)
      </Item>
      <SubTitle>3. Nossa Diocese</SubTitle>
      <Item>
        (Fonte:
        <a href="http://diocesedetaubate.org.br/categoria/paroquias/cacapava/">
          {' '}
          Diocese de Taubaté - Caçapava
        </a>
        )
      </Item>
    </Container>
  );
}

export default Liturgia;
