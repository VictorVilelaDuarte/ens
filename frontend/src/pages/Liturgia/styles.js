import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
`;

export const Principal = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  @media screen and (max-width: 1200px) {
    justify-content: center;
  }
`;

export const LiturgiaDiv = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
`;

export const OracaoDiv = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
`;

export const SubTitle = styled.p`
  color: #70cae3;
  font-size: 22px;
  font-weight: bold;
  margin-top: 20px;
`;

export const Item = styled.p`
  font-size: 17px;
  margin-left: 25px;
`;
