/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Table, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

import history from '../../services/history';
import api from '../../services/api';

import {
  Container,
  ButtonDelete,
  ButtonCancelDelete,
  TitleDiv,
} from './styles';

import Title from '../../components/Title';
import AddButton from '../../components/AddButton';
import ButtonIconPointer from '../../components/ButtonIconPointer';

function OracaoAdm({ match }) {
  const [oracao, setOracao] = useState([]);
  const [showDelete, setShowDetele] = useState(false);
  const [oracaoToDelete, setOracaoToDelete] = useState({});

  useEffect(() => {
    function getOracao() {
      api
        .get(`/oracao`)
        .then((res) => {
          if (res.data.status === true) {
            res.data.data.map((item) => {
              setOracao((prevOracoes) => [...prevOracoes, item]);
            });
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
    getOracao();
  }, []);

  function handleShowDelete(oracaoDelete) {
    if (oracaoDelete) {
      setOracaoToDelete(oracaoDelete);
    } else {
      setOracaoToDelete({});
    }
    setShowDetele(!showDelete);
  }

  function handleDelete() {
    api
      .delete(`/oracao/${oracaoToDelete.Oracao_ID}`)
      .then((res) => {
        toast.info(res.data.message);
        setOracao(
          oracao.filter((item) => item.Oracao_ID !== oracaoToDelete.Oracao_ID)
        );
        handleShowDelete();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        handleShowDelete();
      });
  }

  return (
    <>
      <Container>
        <TitleDiv>
          <Title back="/painel">Orações</Title>
          <AddButton url="/oracaoCadastro">Adicionar</AddButton>
        </TitleDiv>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {oracao.map((item) => (
              <tr>
                <td>{item.Oracao_Titulo}</td>
                <td>
                  <ButtonIconPointer>
                    <FaTrash
                      size={18}
                      color="#F54B30"
                      onClick={() => handleShowDelete(item)}
                    />
                  </ButtonIconPointer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <Modal show={showDelete} onHide={handleShowDelete}>
        <Modal.Header
          style={{ backgroundColor: '#F54B30', color: '#fff' }}
          closeButton
        >
          <Modal.Title>Tem certeza que deseja deletar?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja deletar a oração:{' '}
          {oracaoToDelete.Oracao_Titulo}
        </Modal.Body>
        <Modal.Footer>
          <ButtonCancelDelete onClick={handleShowDelete}>
            Cancelar
          </ButtonCancelDelete>
          <ButtonDelete onClick={handleDelete}>Deletar</ButtonDelete>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OracaoAdm;
