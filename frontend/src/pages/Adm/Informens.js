/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Table, Modal } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

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

function InformensAdm() {
  const [informens, setInformens] = useState([]);
  const [showDelete, setShowDetele] = useState(false);
  const [informensToDelete, setInformensToDelete] = useState({});

  useEffect(() => {
    function getInformens() {
      api
        .get(`/informens`)
        .then((res) => {
          if (res.data.status === true) {
            res.data.data.map((item) => {
              setInformens((prevInformens) => [...prevInformens, item]);
            });
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
    getInformens();
  }, []);

  function formatDate(date) {
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

  function handleShowDelete(informensDelete) {
    if (informensDelete) {
      setInformensToDelete(informensDelete);
    } else {
      setInformensToDelete({});
    }
    setShowDetele(!showDelete);
  }

  function handleDelete() {
    api
      .delete(`/informens/${informensToDelete.Informens_ID}`)
      .then((res) => {
        toast.info(res.data.message);
        setInformens(
          informens.filter(
            (item) => item.Informens_ID !== informensToDelete.Informens_ID
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
          <Title back="/painel">Informens</Title>
          <AddButton url="/informensCadastro">Adicionar</AddButton>
        </TitleDiv>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Data</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {informens.map((item) => (
              <tr>
                <td>{item.Informens_Titulo}</td>
                <td>{formatDate(item.Informens_Data)}</td>
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
          Tem certeza que deseja deletar o informens:{' '}
          {informensToDelete.Informens_Titulo}
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

export default InformensAdm;
