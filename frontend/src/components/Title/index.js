import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import { Container, TitleP, BackButton } from './styles';

function Title({ back, children }) {
  return (
    <Container>
      {back && (
        <Link to={back}>
          <BackButton>
            <FaArrowLeft color="#717171" size={20} />
          </BackButton>
        </Link>
      )}
      <TitleP>{children}</TitleP>
    </Container>
  );
}

export default Title;
