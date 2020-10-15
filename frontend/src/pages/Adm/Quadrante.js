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
} from './styles';

import Title from '../../components/Title';
import AddButton from '../../components/AddButton';

function QuadranteAdm({ match }) {
  const [casal, setCasal] = useState([]);
  const [equipe, setEquipe] = useState(1);
  const [showDelete, setShowDetele] = useState(false);
  const [casalToDelete, setCasalToDelete] = useState({});
  const equipes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  useEffect(() => {
    console.log(casal);
  }, [casal]);

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
            <CasalDiv>
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
    </>
  );
}

export default QuadranteAdm;
