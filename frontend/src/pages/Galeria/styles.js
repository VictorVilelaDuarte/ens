import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
`;

export const GaleriaDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: start;
`;

export const AlbumDiv = styled.div`
  width: 284px;
  height: auto;
  margin: 5px;
  border-radius: 4px;
  box-sizing: border-box;
  background: #0875d1;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

export const AlbumFotoDiv = styled.div`
  height: auto;
  width: 250px;
  margin-top: 15px;
  background: #fff;
  border-radius: 4px;
`;

export const AlbumFoto = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 4px;
  padding: 5px;
`;

export const AlbumNome = styled.p`
  margin-top: 15px;
  color: #fff;
  font-size: 20px;
  text-align: center;
`;

export const AlbumData = styled.p`
  margin-top: 2px;
  color: #fff;
  font-size: 15px;
  text-align: center;
`;
