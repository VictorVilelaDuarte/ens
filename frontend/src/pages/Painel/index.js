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

import AdmHeader from '../../components/AdmHeader';

function Painel() {
  return (
    <>
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
          <Link to="/eventoadm">
            <BigButtons color="blue">
              <FaCalendarAlt /> Eventos
            </BigButtons>
          </Link>
          <Link to="/galeriaadm">
            <BigButtons color="blue">
              <FaImages /> Galeria
            </BigButtons>
          </Link>
          <BigButtons color="blue">
            <FaPrayingHands /> Orações
          </BigButtons>
          <Link to="/equipeadm">
            <BigButtons color="orange">
              <FaUsers /> Equipes
            </BigButtons>
          </Link>
          <BigButtons color="orange">
            <FaTh /> Quadrante
          </BigButtons>
          <Link to="/conselheiroadm">
            <BigButtons color="orange">
              <FaUserTie /> Conselheiro
            </BigButtons>
          </Link>
          <Link to="/padroeiraadm">
            <BigButtons color="orange">
              <FaChurch /> Padroeira
            </BigButtons>
          </Link>
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
    </>
  );
}

export default Painel;
