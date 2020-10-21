import styled from 'styled-components';
import { Page } from 'react-pdf';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
`;

export const PrincipalItens = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  height: min-content;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;
`;

export const Itens = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;

export const Principal = styled(Page)`
  margin-left: 8px;
  margin-right: 8px;
`;

export const SubTitle = styled.p`
  margin-top: 5px;
  text-align: center;
`;

export const SelectDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const FilterDiv = styled.div`
  width: 300px;
`;
