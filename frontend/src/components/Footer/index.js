import React from 'react';
import {
  Container,
  Content,
  FooterImage,
  FooterEnsImage,
  DivImages,
  DivServile,
} from './styles';

import Servile from '../../assets/Servile.png';
import Cadeado from '../../assets/cadeado.png';
import Logo from '../../assets/logo.png';
import Ens from '../../assets/ENS.png';

export default function Footer() {
  return (
    <>
      <Container>
        <Content>
          <DivImages>
            <FooterEnsImage src={Ens} />
            <FooterImage src={Logo} />
            <FooterImage src={Cadeado} />
          </DivImages>
          <DivServile>
            <img src={Servile} />
            <p>Desenvolvido por Servile</p>
          </DivServile>
        </Content>
      </Container>
    </>
  );
}
