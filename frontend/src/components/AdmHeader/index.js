import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

import { Container, Profile, Image, Name, Exit } from './styles';

function AdmHeader() {
  return (
    <Container>
      <Profile>
        <Image />
        <Name>Victor Vilela Duarte</Name>
      </Profile>
      <Exit>
        <FaSignOutAlt style={{ marginRight: 8 }} />
        Sair
      </Exit>
    </Container>
  );
}

export default AdmHeader;
