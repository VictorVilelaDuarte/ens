import styled from 'styled-components';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1100px;
  max-width: 1100px;
`;

export const ImagemTopo = styled.img`
  margin-top: 0;
  width: 100%;
`;

export const Menu = styled(Navbar)`
  width: 100% !important;
  background-color: #326b97 !important;
  border-radius: 2px !important;
`;

export const Item = styled(Nav)`
  a {
    font-size: 15px;
    color: rgba(255, 255, 255, 0.8) !important;
  }

  a:hover {
    color: rgba(255, 255, 255, 1) !important;
  }
`;

export const Dropdown = styled(NavDropdown)`
  div {
    background-color: #326b97 !important;
  }
  a {
    background-color: #326b97 !important;
    color: rgba(255, 255, 255, 0.8) !important;
  }

  a:hover {
    color: rgba(255, 255, 255, 1) !important;
  }
`;
