import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #f7ee92;
  border-top: 2px solid #00ffff;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const Content = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
`;

export const FooterImage = styled.img`
  height: 150px;
  width: 150px;

  @media screen and (max-width: 600px) {
    height: 75px;
    width: 75px;
  }
`;

export const FooterEnsImage = styled.img`
  height: 84px;
  width: 150px;

  @media screen and (max-width: 600px) {
    height: 42px;
    width: 75px;
  }
`;

export const DivImages = styled.div`
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  /* border: 1px solid red; */
`;

export const DivServile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  p {
    color: #444;
  }

  img {
    width: 50px;
  }
`;
