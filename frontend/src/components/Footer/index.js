import React from 'react';
import { Link } from 'react-router-dom';

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
import Ens from '../../assets/logo-ens.png';

export default function Footer() {
  return (
    <>
      <Container>
        <Content>
          <DivImages>
            <FooterEnsImage src={Ens} />
            <FooterImage src={Logo} />
            <Link to="/loginadm">
              <FooterImage src={Cadeado} />
            </Link>
          </DivImages>
          <DivServile>
            <img src={Servile} alt="servile" />
            <p>Desenvolvido por Servile</p>
          </DivServile>
        </Content>
      </Container>
    </>
  );
}
