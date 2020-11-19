import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  padding: 10px;
`;

export const TitleDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

export const QuadranteDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: start;
`;

export const CasalDiv = styled.div`
  width: 284px;
  height: 350px;
  margin: 5px;
  border-radius: 4px;
  box-sizing: border-box;
  background: #0875d1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ConselheiroDiv = styled.div`
  width: 284px;
  height: 350px;
  margin: 5px;
  border-radius: 4px;
  box-sizing: border-box;
  background: #0830d1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CasalFotoDiv = styled.div`
  height: auto;
  width: 250px;
  margin-top: 15px;
  background: #fff;
  border-radius: 4px;
`;

export const CasalFoto = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 4px;
  padding: 5px;
  max-height: 100%;
`;

export const CasalNome = styled.p`
  margin-top: 15px;
  color: #fff;
  font-size: 18px;
  text-align: center;
`;

export const CasalTelefone = styled.p`
  margin-top: 5px;
  color: #fff;
  font-size: 18px;
  text-align: center;
`;

export const CasalDetailText = styled.div`
  margin-top: 3px;
  margin-bottom: 3px;
`;
