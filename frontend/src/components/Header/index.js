import React from 'react';
import {
  FaHome,
  FaPray,
  FaCross,
  FaChurch,
  FaHeart,
  FaCalendarAlt,
  FaBook,
  FaUsers,
  FaImages,
  FaTh,
  FaInfo,
  FaPhone,
} from 'react-icons/fa';

import { Container, ImagemTopo, Menu, Item, Dropdown } from './styles';
import topo from '../../assets/topo.png';

export default function Header() {
  return (
    <>
      <Container>
        <ImagemTopo src={topo} alt="ENS" />
        <Menu bg="light" expand="lg">
          <Menu.Toggle aria-controls="basic-navbar-nav" />
          <Menu.Collapse id="basic-navbar-nav">
            <Item className="mr-auto">
              <Item.Link href="#home">
                <FaHome /> Inicio
              </Item.Link>
              <Item.Link href="#home">
                <FaCross /> Pe Caffarel
              </Item.Link>
              <Item.Link href="#link">
                <FaPray /> Quem Somos
              </Item.Link>
              <Item.Link href="#link">
                <FaHeart /> PCEs
              </Item.Link>
              <Item.Link href="#link">
                <FaChurch /> Movimento
              </Item.Link>
              <Item.Link href="#link">
                <FaCalendarAlt /> Noticias/Eventos
              </Item.Link>
              <Item.Link href="#link">
                <FaBook /> Liturgia
              </Item.Link>
              <Dropdown
                title={
                  <>
                    <FaUsers /> Equipes
                  </>
                }
              >
                <Dropdown.Item href="#action/3.1">Equipe I</Dropdown.Item>
                <Dropdown.Item href="#action/3.1">Equipe II</Dropdown.Item>
                <Dropdown.Item href="#action/3.1">Equipe III</Dropdown.Item>
                <Dropdown.Item href="#action/3.1">Equipe IV</Dropdown.Item>
                <Dropdown.Item href="#action/3.1">Equipe V</Dropdown.Item>
                <Dropdown.Item href="#action/3.1">Equipe VI</Dropdown.Item>
                <Dropdown.Item href="#action/3.1">Equipe VII</Dropdown.Item>
                <Dropdown.Item href="#action/3.1">Equipe VIII</Dropdown.Item>
                <Dropdown.Item href="#action/3.1">Equipe IX</Dropdown.Item>
                <Dropdown.Item href="#action/3.1">Equipe X</Dropdown.Item>
                <Dropdown.Item href="#action/3.1">Equipe XI</Dropdown.Item>
                <Dropdown.Item href="#action/3.1">Equipe XII</Dropdown.Item>
                <Dropdown.Item href="#action/3.1">Equipe XIII</Dropdown.Item>
                <Dropdown.Item href="#action/3.1">Equipe XIV</Dropdown.Item>
                <Dropdown.Item href="#action/3.1">Equipe XV</Dropdown.Item>
                <Dropdown.Item href="#action/3.1">Equipe XVI</Dropdown.Item>
              </Dropdown>
              <Item.Link href="#link">
                <FaImages /> Galeria
              </Item.Link>
              <Item.Link href="#link">
                <FaTh /> Quadrante
              </Item.Link>
              <Item.Link href="#link">
                <FaInfo /> Informens
              </Item.Link>
              <Item.Link href="#link">
                <FaPhone /> Contato
              </Item.Link>
            </Item>
          </Menu.Collapse>
        </Menu>
      </Container>
    </>
  );
}