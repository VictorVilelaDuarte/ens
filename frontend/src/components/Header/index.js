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
  FaEnvelope,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

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
              <Link to="/">
                <Item.Link href="#home">
                  <FaHome />
                </Item.Link>
              </Link>
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
              <Dropdown
                title={
                  <>
                    <FaCalendarAlt /> Noticias/Eventos
                  </>
                }
              >
                <Link to="/noticias">
                  <Dropdown.Item href="#noticias">Notícias</Dropdown.Item>
                </Link>
                <Link to="/eventos">
                  <Dropdown.Item href="#eventos">Eventos</Dropdown.Item>
                </Link>
              </Dropdown>
              <Link to="/liturgia">
                <Item.Link href="#liturgia">
                  <FaBook /> Liturgia
                </Item.Link>
              </Link>
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
              <Link to="/galeria">
                <Item.Link href="#galeria">
                  <FaImages /> Galeria
                </Item.Link>
              </Link>
              <Link to="/login">
                <Item.Link href="#link">
                  <FaTh /> Quadrante
                </Item.Link>
              </Link>
              <Link to="/informens">
                <Item.Link href="#informens">
                  <FaInfo /> Informens
                </Item.Link>
              </Link>
              <Link to="/contato">
                <Item.Link href="#contato">
                  <FaEnvelope /> Contato
                </Item.Link>
              </Link>
            </Item>
          </Menu.Collapse>
        </Menu>
      </Container>
    </>
  );
}
