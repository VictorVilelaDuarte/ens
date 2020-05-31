import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import { Container, TitleP } from './styles';

function Title({ back, children }) {
  return (
    <Container>
      {back && (
        <Link to={back}>
          <FaArrowLeft color="#f4f4f4" />
        </Link>
      )}
      <TitleP>{children}</TitleP>
    </Container>
  );
}

export default Title;
