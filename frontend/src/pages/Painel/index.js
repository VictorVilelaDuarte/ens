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
  FaUserPlus,
  FaEnvelope,
  FaUserSlash,
  FaChartLine,
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
          <Link to="/oracaoadm">
            <BigButtons color="blue">
              <FaPrayingHands /> Orações
            </BigButtons>
          </Link>
          <Link to="/equipeadm">
            <BigButtons color="orange">
              <FaUsers /> Equipes
            </BigButtons>
          </Link>
          <Link to="/quadranteadm">
            <BigButtons color="orange">
              <FaTh /> Quadrante
            </BigButtons>
          </Link>
          <Link to="/conselheiroadm">
            <BigButtons color="orange">
              <FaUserTie /> Conselheiro
            </BigButtons>
          </Link>
          <Link to="/pilotagemadm">
            <BigButtons color="orange">
              <FaUserPlus /> Pilotagem
            </BigButtons>
          </Link>
          <Link to="/quadranteadm">
            <BigButtons color="orange">
              <FaUserSlash /> Ex-equipista
            </BigButtons>
          </Link>
          <Link to="/padroeiraadm">
            <BigButtons color="orange">
              <FaChurch /> Padroeira
            </BigButtons>
          </Link>
          <Link to="/paginaadm">
            <BigButtons color="green">
              <FaCode /> Páginas
            </BigButtons>
          </Link>
          <Link to="/arquivoadm">
            <BigButtons color="green">
              <FaFileUpload /> Arquivos
            </BigButtons>
          </Link>
          <Link to="/mensagemadm">
            <BigButtons color="green">
              <FaEnvelope /> Mensagens
            </BigButtons>
          </Link>
          <Link to="/usuarioadm">
            <BigButtons color="red">
              <FaUserShield /> Usuários
            </BigButtons>
          </Link>
          <Link to="/quadranteadm">
            <BigButtons color="red">
              <FaChartLine /> Estatisticas
            </BigButtons>
          </Link>
        </DivButtons>
      </Container>
    </>
  );
}

export default Painel;
