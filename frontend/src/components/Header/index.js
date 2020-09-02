import React from 'react';
import {
  FaHome,
  FaPray,
  FaCross,
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
                  <FaHome /> Início
                </Item.Link>
              </Link>
              <Link to="/padre">
                <Item.Link href="#padre">
                  <FaCross /> Pe Caffarel
                </Item.Link>
              </Link>
              <Dropdown
                title={
                  <>
                    <FaPray /> Movimento
                  </>
                }
              >
                <Link to="/quemSomos">
                  <Dropdown.Item href="#quemSomos">Quem somos</Dropdown.Item>
                </Link>
                <Link to="/regiao">
                  <Dropdown.Item href="#regiao">Região</Dropdown.Item>
                </Link>
                <Link to="/setor">
                  <Dropdown.Item href="#setor">Setor Caçapava</Dropdown.Item>
                </Link>
                <Link to="/siglas">
                  <Dropdown.Item href="#siglas">Siglas</Dropdown.Item>
                </Link>
              </Dropdown>
              <Link to="/pce">
                <Item.Link href="#link">
                  <FaHeart /> PCEs
                </Item.Link>
              </Link>
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
                <Link to="/equipe/1">
                  <Dropdown.Item href="#equipe/1">Equipe I</Dropdown.Item>
                </Link>
                <Link to="/equipe/2">
                  <Dropdown.Item href="#equipe/2">Equipe II</Dropdown.Item>
                </Link>
                <Link to="/equipe/3">
                  <Dropdown.Item href="#equipe/3">Equipe III</Dropdown.Item>
                </Link>
                <Link to="/equipe/4">
                  <Dropdown.Item href="#equipe/4">Equipe IV</Dropdown.Item>
                </Link>
                <Link to="/equipe/5">
                  <Dropdown.Item href="#equipe/5">Equipe V</Dropdown.Item>
                </Link>
                <Link to="/equipe/6">
                  <Dropdown.Item href="#equipe/6">Equipe VI</Dropdown.Item>
                </Link>
                <Link to="/equipe/7">
                  <Dropdown.Item href="#equipe/7">Equipe VII</Dropdown.Item>
                </Link>
                <Link to="/equipe/8">
                  <Dropdown.Item href="#equipe/8">Equipe VIII</Dropdown.Item>
                </Link>
                <Link to="/equipe/9">
                  <Dropdown.Item href="#equipe/9">Equipe IX</Dropdown.Item>
                </Link>
                <Link to="/equipe/10">
                  <Dropdown.Item href="#equipe/10">Equipe X</Dropdown.Item>
                </Link>
                <Link to="/equipe/11">
                  <Dropdown.Item href="#equipe/11">Equipe XI</Dropdown.Item>
                </Link>
                <Link to="/equipe/12">
                  <Dropdown.Item href="#equipe/12">Equipe XII</Dropdown.Item>
                </Link>
                <Link to="/equipe/13">
                  <Dropdown.Item href="#equipe/13">Equipe XIII</Dropdown.Item>
                </Link>
                <Link to="/equipe/14">
                  <Dropdown.Item href="#equipe/14">Equipe XIV</Dropdown.Item>
                </Link>
                <Link to="/equipe/15">
                  <Dropdown.Item href="#equipe/15">Equipe XV</Dropdown.Item>
                </Link>
                <Link to="/equipe/16">
                  <Dropdown.Item href="#equipe/16">Equipe XVI</Dropdown.Item>
                </Link>
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
