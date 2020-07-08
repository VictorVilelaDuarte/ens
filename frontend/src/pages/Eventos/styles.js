import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
`;

export const Evento = styled.li`
  margin-bottom: 8px;
  width: 100%;
  list-style: disc;
  font-size: 16px;
`;

export const DivEvento = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 1200px;
  padding: 10px 10px 10px 20px;
`;
