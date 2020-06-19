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

function PadroeiraAdm({ match }) {
  const [padroeira, setPadroeira] = useState([]);
  const [showDelete, setShowDetele] = useState(false);
  const [padroeiraToDelete, setPadroeiraToDelete] = useState({});

  useEffect(() => {
    function getPadroeira() {
      api
        .get(`/padroeira`)
        .then((res) => {
          if (res.data.status === true) {
            res.data.data.map((item) => {
              setPadroeira((prevPadroeiras) => [...prevPadroeiras, item]);
            });
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
    getPadroeira();
  }, []);

  function handleShowDelete(padroeiraDelete) {
    if (padroeiraDelete) {
      setPadroeiraToDelete(padroeiraDelete);
    } else {
      setPadroeiraToDelete({});
    }
    setShowDetele(!showDelete);
  }

  function handleDelete() {
    api
      .delete(`/padroeira/${padroeiraToDelete.Padroeira_ID}`)
      .then((res) => {
        toast.info(res.data.message);
        setPadroeira(
          padroeira.filter(
            (item) => item.Padroeira_ID !== padroeiraToDelete.Padroeira_ID
          )
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
          <Title back="/painel">Padroeiras</Title>
          <AddButton url="/padroeiraCadastro">Adicionar</AddButton>
        </TitleDiv>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Editar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {padroeira.map((item) => (
              <tr>
                <td>{item.Padroeira_Nome}</td>
                <td>{item.Padroeira_Descricao}</td>
                <td>
                  <ButtonIconPointer>
                    <FaEdit
                      onClick={() =>
                        history.push(`/padroeiraCadastro/${item.Padroeira_ID}`)
                      }
                      size={18}
                      color="#326B97"
                    />
                  </ButtonIconPointer>
                </td>
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
          Tem certeza que deseja deletar a padroeira:{' '}
          {padroeiraToDelete.Padroeira_Nome}
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

export default PadroeiraAdm;
