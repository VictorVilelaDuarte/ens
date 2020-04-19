import React from 'react';

import { Container, ImagemTopo } from './styles';
import topo from '../../assets/topo.png';

export default function Header() {
  return (
    <Container>
      <ImagemTopo src={topo} alt="ENS" />
    </Container>
  );
}
