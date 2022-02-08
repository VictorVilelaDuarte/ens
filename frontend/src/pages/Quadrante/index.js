/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

import history from '../../services/history';
import api from '../../services/api';
import CasalDefault from '../../assets/casal.png';
import ConselheiroDefault from '../../assets/padre.png';

import {
  Container,
  TitleDiv,
  QuadranteDiv,
  CasalDiv,
  CasalFoto,
  CasalFotoDiv,
  CasalNome,
  ConselheiroDiv,
  CasalDetailText,
} from './styles';

import Title from '../../components/Title';

function Quadrante() {
  const [casal, setCasal] = useState([]);
  const [conselheiro, setConselheiro] = useState([]);
  const [equipe, setEquipe] = useState(1);
  const [showDetail, setShowDetail] = useState(false);
  const [showConselheiroDetail, setShowConselheiroDetail] = useState(false);
  const [casalToDetail, setCasalToDetail] = useState({});
  const [conselheiroToDetail, setConselheiroToDetail] = useState({});
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

    function getConselheiro() {
      api
        .get(`/conselheiroQuadrante/${equipe}`)
        .then((res) => {
          setConselheiro([]);
          if (res.data.status === true) {
            res.data.data.map((item) => {
              setConselheiro((prevConselheiro) => [...prevConselheiro, item]);
            });
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
    getCasal();
    getConselheiro();
  }, [equipe]);

  // useEffect(() => {
  //   if (!sessionStorage.getItem('ensccpv:token')) {
  //     history.push('/login');
  //   }
  // }, []);

  useEffect(() => {
    history.push('/manutencao');
  }, []);

  function handleShowDetail(casalDetail) {
    if (casalDetail) {
      setCasalToDetail(casalDetail);
    } else {
      setCasalToDetail({});
    }
    setShowDetail(!showDetail);
  }

  function handleShowConselheiroDetail(conselheiroDetail) {
    if (conselheiroDetail) {
      setConselheiroToDetail(conselheiroDetail);
    } else {
      setConselheiroToDetail({});
    }
    setShowConselheiroDetail(!showConselheiroDetail);
  }

  function formatDate(date) {
    const nDate = new Date(date);
    nDate.setDate(nDate.getDate() + 1);
    let month = nDate.getMonth() + 1;
    let dt = nDate.getDate();

    if (dt < 10) {
      dt = `0${dt}`;
    }
    if (month < 10) {
      month = `0${month}`;
    }

    return `${dt}/${month}`;
  }

  function formatDateCompleta(date) {
    const nDate = new Date(date);
    nDate.setDate(nDate.getDate() + 1);
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
          <Title>Quadrante</Title>
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
                  <CasalFoto src={item.Casal_imagem} />
                ) : (
                    <CasalFoto src={CasalDefault} />
                  )}
              </CasalFotoDiv>
              <CasalNome>{item.Casal_Nome}</CasalNome>
            </CasalDiv>
          ))}
          {conselheiro.map((item) => (
            <ConselheiroDiv onClick={() => handleShowConselheiroDetail(item)}>
              <CasalFotoDiv>
                {item.Conselheiro_Imagem ? (
                  <CasalFoto src={item.Conselheiro_Imagem} />
                ) : (
                    <CasalFoto src={ConselheiroDefault} />
                  )}
              </CasalFotoDiv>
              <CasalNome>{item.Conselheiro_Perfil}</CasalNome>
            </ConselheiroDiv>
          ))}
        </QuadranteDiv>
      </Container>

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
            {formatDateCompleta(casalToDetail.Casal_DataCasamento)}
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
            {formatDateCompleta(casalToDetail.Casal_DataInicioENS)}
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
      </Modal>

      <Modal
        size="lg"
        show={showConselheiroDetail}
        onHide={handleShowConselheiroDetail}
      >
        <Modal.Header
          style={{ backgroundColor: '#326B97', color: '#fff' }}
          closeButton
        >
          <Modal.Title>{conselheiroToDetail.Conselheiro_Perfil}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CasalDetailText>
            <b>Nome do conselheiro: </b> {conselheiroToDetail.Conselheiro_Nome}
          </CasalDetailText>
          <CasalDetailText>
            <b>E-mail do conselheiro: </b>{' '}
            {conselheiroToDetail.conselheiroToDetail}
          </CasalDetailText>
          <CasalDetailText>
            <b>Celular do conselheiro: </b>{' '}
            {conselheiroToDetail.Conselheiro_TelCel}
          </CasalDetailText>
          <CasalDetailText>
            <b>Telefone do conselheiro: </b>{' '}
            {conselheiroToDetail.Conselheiro_TelRes}
          </CasalDetailText>
          <CasalDetailText>
            <b>Data de nascimento do conselheiro: </b>
            {formatDate(conselheiroToDetail.Conselheiro_DataNascimento)}
          </CasalDetailText>
          <CasalDetailText>
            <b>Data de ordenação do conselheiro: </b>
            {formatDate(conselheiroToDetail.Conselheiro_DataOrdenacao)}
          </CasalDetailText>
          <CasalDetailText>
            <b>Data de ingresso na equipe: </b>
            {formatDate(conselheiroToDetail.Conselheiro_AnoIngressoEquipe)}
          </CasalDetailText>
          <CasalDetailText>
            <b>Endereço do conselheiro: </b>
            {conselheiroToDetail.Conselheiro_Endereco}
          </CasalDetailText>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Quadrante;
