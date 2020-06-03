import React from 'react';
import {
  FaNewspaper,
  FaFile,
  FaCalendarAlt,
  FaImages,
  FaPrayingHands,
  FaUsers,
  FaTh,
  FaFileUpload,
  FaCode,
  FaUserShield,
  FaUserTie,
  FaChurch,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Container, BigButtons, DivButtons } from './styles';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AdmHeader from '../../components/AdmHeader';

function Painel() {
  return (
    <>
      <Header />
      <AdmHeader />
      <Container>
        <DivButtons>
          <Link to="/noticiaadm">
            <BigButtons color="blue">
              <FaNewspaper /> Notícias
            </BigButtons>
          </Link>
          <Link to="/informensadm">
            <BigButtons color="blue">
              <FaFile /> Informens
            </BigButtons>
          </Link>
          <BigButtons color="blue">
            <FaCalendarAlt /> Eventos
          </BigButtons>
          <BigButtons color="blue">
            <FaImages /> Galeria
          </BigButtons>
          <BigButtons color="blue">
            <FaPrayingHands /> Orações
          </BigButtons>
          <BigButtons color="orange">
            <FaUsers /> Equipes
          </BigButtons>
          <BigButtons color="orange">
            <FaTh /> Quadrante
          </BigButtons>
          <BigButtons color="orange">
            <FaUserTie /> Conselheiro
          </BigButtons>
          <BigButtons color="orange">
            <FaChurch /> Padroeira
          </BigButtons>
          <BigButtons color="green">
            <FaCode /> Páginas
          </BigButtons>
          <BigButtons color="green">
            <FaFileUpload /> Arquivos
          </BigButtons>
          <BigButtons color="red">
            <FaUserShield /> Administradores
          </BigButtons>
        </DivButtons>
      </Container>
      <Footer />
    </>
  );
}

export default Painel;
