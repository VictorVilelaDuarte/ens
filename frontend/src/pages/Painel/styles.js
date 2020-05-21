/* eslint-disable no-nested-ternary */
import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
`;

export const DivButtons = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 30px;
`;

export const BigButtons = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 30px;
  width: 280px;
  height: 100px;
  border-radius: 5px;
  border: none;
  margin-bottom: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.4);
  }

  ${(props) =>
    props.color === 'blue'
      ? css`
          background: #396afc;
          background: -webkit-linear-gradient(to right, #2948ff, #396afc);
          background: linear-gradient(to right, #2948ff, #396afc);
        `
      : props.color === 'orange'
      ? css`
          background: #f46b45;
          background: -webkit-linear-gradient(to right, #eea849, #f46b45);
          background: linear-gradient(to right, #eea849, #f46b45);
        `
      : props.color === 'green'
      ? css`
          background: #56ab2f;
          background: -webkit-linear-gradient(to right, #a8e063, #56ab2f);
          background: linear-gradient(to right, #a8e063, #56ab2f);
        `
      : css`
          background: #f85032;
          background: -webkit-linear-gradient(to right, #e73827, #f85032);
          background: linear-gradient(to right, #e73827, #f85032);
        `}
`;
