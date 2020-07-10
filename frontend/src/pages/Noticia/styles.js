import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
`;

export const NoticiaDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CorpoDiv = styled.div`
  max-width: 700px;
`;

export const Image = styled.img`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const NoticiaTitulo = styled.h1`
  text-align: center;
  margin-bottom: 50px;
`;

export const NoticiaDetalhe = styled.p`
  font-size: 12px;
  margin-top: 40px;
  margin-bottom: 5px;
`;
