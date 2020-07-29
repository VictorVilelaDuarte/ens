/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Modal } from 'react-bootstrap';
import { FaPhone } from 'react-icons/fa';
import { toast } from 'react-toastify';

import history from '../../services/history';
import api from '../../services/api';
import CasalDefault from '../../assets/casal.png';

import {
  Container,
  ButtonDelete,
  ButtonCancelDelete,
  TitleDiv,
  QuadranteDiv,
  CasalDiv,
  CasalFoto,
  CasalFotoDiv,
  CasalNome,
  CasalTelefone,
  CasalDetailText,
} from './styles';

import Title from '../../components/Title';
import AddButton from '../../components/AddButton';

function QuadranteAdm() {
  const [casal, setCasal] = useState([]);
  const [equipe, setEquipe] = useState(1);
  const [showDelete, setShowDetele] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [casalToDelete, setCasalToDelete] = useState({});
  const [casalToDetail, setCasalToDetail] = useState({});
  const equipes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  useEffect(() => {
    function getCasal() {
      api
        .get(`/casal/${equipe}`)
        .then((res) => {
          setCasal([]);
          if (res.data.status === true) {
            res.data.data.map((item) => {
              setCasal((prevCasais) => [...prevCasais, item]);
            });
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
    getCasal();
  }, [equipe]);

  function handleShowDelete(casalDelete) {
    if (casalDelete) {
      setCasalToDelete(casalDelete);
    } else {
      setCasalToDelete({});
    }
    setShowDetele(!showDelete);
  }

  function handleShowDetail(casalDetail) {
    if (casalDetail) {
      setCasalToDetail(casalDetail);
    } else {
      setCasalToDetail({});
    }
    setShowDetail(!showDetail);
  }

  function formatDate(date) {
    const nDate = new Date(date);
    const year = nDate.getFullYear();
    let month = nDate.getMonth() + 1;
    let dt = nDate.getDate();

    if (dt < 10) {
      dt = `0${dt}`;
    }
    if (month < 10) {
      month = `0${month}`;
    }

    return `${dt}/${month}/${year}`;
  }

  return (
    <>
      <Container>
        <TitleDiv>
          <Title back="/painel">Quadrante</Title>
          <AddButton url="/quadranteCadastro">Adicionar</AddButton>
        </TitleDiv>
        <Tabs
          defaultActiveKey={1}
          onSelect={(key) => {
            setEquipe(key);
          }}
        >
          {equipes.map((item) => (
            <Tab eventKey={item} title={item} />
          ))}
        </Tabs>
        <QuadranteDiv>
          {casal.map((item) => (
            <CasalDiv onClick={() => handleShowDetail(item)}>
              <CasalFotoDiv>
                {item.Casal_imagem ? (
                  <CasalFoto src={CasalDefault} />
                ) : (
                  <CasalFoto src={CasalDefault} />
                )}
              </CasalFotoDiv>
              <CasalNome>{item.Casal_Nome}</CasalNome>
              {/* <CasalTelefone>
                <FaPhone color="#000" size={14} /> {item.Casal_HomemTelCel}
              </CasalTelefone>
              <CasalTelefone>
                <FaPhone color="#f041e1" size={14} /> {item.Casal_MulherTelCel}
              </CasalTelefone> */}
            </CasalDiv>
          ))}
        </QuadranteDiv>
      </Container>
      <Modal show={showDelete} onHide={handleShowDelete}>
        <Modal.Header
          style={{ backgroundColor: '#F54B30', color: '#fff' }}
          closeButton
        >
          <Modal.Title>Tem certeza que deseja deletar?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja deletar o casal: {casalToDelete.Casal_Nome}
        </Modal.Body>
        <Modal.Footer>
          <ButtonCancelDelete onClick={handleShowDelete}>
            Cancelar
          </ButtonCancelDelete>
          {/* <ButtonDelete onClick={handleDelete}>Deletar</ButtonDelete> */}
        </Modal.Footer>
      </Modal>

      <Modal size="lg" show={showDetail} onHide={handleShowDetail}>
        <Modal.Header
          style={{ backgroundColor: '#326B97', color: '#fff' }}
          closeButton
        >
          <Modal.Title>{casalToDetail.Casal_Nome}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CasalDetailText>
            <b>Nome do homem: </b> {casalToDetail.Casal_HomemNome}
          </CasalDetailText>
          <CasalDetailText>
            <b>Nome da mulher: </b> {casalToDetail.Casal_MulherNome}
          </CasalDetailText>
          <CasalDetailText>
            <b>E-mail do homem: </b> {casalToDetail.Casal_HomemEmail}
          </CasalDetailText>
          <CasalDetailText>
            <b>E-mail da mulher: </b> {casalToDetail.Casal_MulherEmail}
          </CasalDetailText>
          <CasalDetailText>
            <b>Celular do homem: </b> {casalToDetail.Casal_HomemTelCel}
          </CasalDetailText>
          <CasalDetailText>
            <b>Celular da mulher: </b> {casalToDetail.Casal_MulherTelCel}
          </CasalDetailText>
          <CasalDetailText>
            <b>Data de nascimento do homem: </b>
            {formatDate(casalToDetail.Casal_HomemDataNascimento)}
          </CasalDetailText>
          <CasalDetailText>
            <b>Data de nascimento da mulher: </b>
            {formatDate(casalToDetail.Casal_MulherDataNascimento)}
          </CasalDetailText>
          <CasalDetailText>
            <b>Data de casamento: </b>
            {formatDate(casalToDetail.Casal_DataCasamento)}
          </CasalDetailText>
          <CasalDetailText>
            <b>Igreja do casamento: </b> {casalToDetail.Casal_IgrejaCasamento}
          </CasalDetailText>
          <CasalDetailText>
            <b>Paróquia do casamento: </b>
            {casalToDetail.Casal_ParoquiaCasamento}
          </CasalDetailText>
          <CasalDetailText>
            <b>Endereço do casal: </b>
            {`${casalToDetail.Casal_Endereco}, ${casalToDetail.Casal_EndBairro}, ${casalToDetail.Casal_Cidade}`}
          </CasalDetailText>
          <CasalDetailText>
            <b>Data de inicio ENS: </b>
            {formatDate(casalToDetail.Casal_DataInicioENS)}
          </CasalDetailText>
          {casalToDetail.Casal_NomeFilho1 ? (
            <CasalDetailText>
              <b>Nome do primeiro filho: </b>
              {`${casalToDetail.Casal_NomeFilho1}, ${formatDate(
                casalToDetail.Casal_DataNascFilho1
              )}`}
            </CasalDetailText>
          ) : (
            <></>
          )}
          {casalToDetail.Casal_NomeFilho2 ? (
            <CasalDetailText>
              <b>Nome do segundo filho: </b>
              {`${casalToDetail.Casal_NomeFilho2}, ${formatDate(
                casalToDetail.Casal_DataNascFilho2
              )}`}
            </CasalDetailText>
          ) : (
            <></>
          )}
          {casalToDetail.Casal_NomeFilho3 ? (
            <CasalDetailText>
              <b>Nome do terceiro filho: </b>
              {`${casalToDetail.Casal_NomeFilho3}, ${formatDate(
                casalToDetail.Casal_DataNascFilho3
              )}`}
            </CasalDetailText>
          ) : (
            <></>
          )}
          {casalToDetail.Casal_NomeFilho4 ? (
            <CasalDetailText>
              <b>Nome do quarto filho: </b>
              {`${casalToDetail.Casal_NomeFilho4}, ${formatDate(
                casalToDetail.Casal_DataNascFilho4
              )}`}
            </CasalDetailText>
          ) : (
            <></>
          )}
          {casalToDetail.Casal_NomeFilho5 ? (
            <CasalDetailText>
              <b>Nome do quinto filho: </b>
              {`${casalToDetail.Casal_NomeFilho5}, ${formatDate(
                casalToDetail.Casal_DataNascFilho5
              )}`}
            </CasalDetailText>
          ) : (
            <></>
          )}
        </Modal.Body>
        <Modal.Footer>
          <ButtonCancelDelete onClick={handleShowDetail}>
            Editar
          </ButtonCancelDelete>
          <ButtonDelete>Deletar</ButtonDelete>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default QuadranteAdm;
