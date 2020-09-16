import styled from 'styled-components';
import { Page } from 'react-pdf';

export const Container = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  align-items: center;
`;

export const Principal = styled(Page)`
  margin-left: 8px;
  margin-right: 8px;
`;

export const Controls = styled.a`
  margin-left: 10px;
  margin-right: 10px;
  font-weight: bold;
`;
