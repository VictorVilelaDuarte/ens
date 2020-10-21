import React, { useContext } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

import { AuthContext } from '../../context/AuthContext';

import { Container, Profile, Image, Name, Exit } from './styles';

function AdmHeader() {
  const { loggedUser, signOut } = useContext(AuthContext);
  return (
    <Container>
      <Profile>
        <Image />
        <Name>{loggedUser.user.Nome}</Name>
      </Profile>
      <Exit onClick={() => signOut()}>
        <FaSignOutAlt style={{ marginRight: 8 }} />
        Sair
      </Exit>
    </Container>
  );
}

export default AdmHeader;
