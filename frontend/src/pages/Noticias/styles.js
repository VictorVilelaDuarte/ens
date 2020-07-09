import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
`;

export const DivNoticias = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DivNoticia = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom-color: #2a2a2a;
  border-bottom-style: solid;
  border-bottom-width: 1px;
`;

export const DivImagemNoticia = styled.div`
  width: 500px;
`;

export const Imagem = styled.img`
  width: 100%;
  object-fit: cover;
`;

export const DivNoticiaDetalhe = styled.div`
  display: flex;
  width: 500px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
`;

export const NoticiaTitulo = styled.h2`
  margin-bottom: 20px;
`;

export const LerMais = styled.button`
  height: 30px;
  background-color: #0875d1;
  color: #fff;
  padding-left: 30px;
  padding-right: 30px;
  border: none;
  border-radius: 4px;
`;
