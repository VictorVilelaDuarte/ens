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
  border: 1px solid black;
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
  border: 1px solid red;
`;
