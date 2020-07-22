import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  padding: 10px;
`;

export const ButtonDelete = styled.button`
  height: 46px;
  background-color: #f54b30;
  border-radius: 4px;
  border: none;
  width: 150px;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #fff;
`;

export const ButtonCancelDelete = styled.button`
  height: 46px;
  background-color: #326b97;
  border-radius: 4px;
  border: none;
  width: 150px;
  margin-top: 10px;
  margin-bottom: 10px;

  color: #fff;
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

export const CasalFotoDiv = styled.div`
  height: 250px;
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

export const Label = styled.label`
  align-self: flex-start;
  padding-left: 5px;
  margin-top: 5px;
  margin-bottom: -8px;
  font-size: 15px;
  color: #222222;
`;
