/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Table, Pagination, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash, FaTimesCircle, FaCheckCircle } from 'react-icons/fa';
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

function ConselheiroAdm({ match }) {
  const [conselheiro, setConselheiro] = useState([]);
  const [showDelete, setShowDetele] = useState(false);
  const [conselheiroToDelete, setConselheiroToDelete] = useState({});

  useEffect(() => {
    function getConselheiro() {
      api
        .get(`/conselheiro`)
        .then((res) => {
          if (res.data.status === true) {
            res.data.data.map((item) => {
              setConselheiro((prevConselheiros) => [...prevConselheiros, item]);
            });
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
    getConselheiro();
  }, []);

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

  function handleShowDelete(conselheiroDelete) {
    if (conselheiroDelete) {
      setConselheiroToDelete(conselheiroDelete);
    } else {
      setConselheiroToDelete({});
    }
    setShowDetele(!showDelete);
  }

  function handleDelete() {
    api
      .delete(`/conselheiro/${conselheiroToDelete.Conselheiro_IDMENS}`)
      .then((res) => {
        toast.info(res.data.message);
        setConselheiro(
          conselheiro.filter(
            (item) =>
              item.Conselheiro_IDMENS !== conselheiroToDelete.Conselheiro_IDMENS
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
          <Title back="/painel">Conselheiros</Title>
          <AddButton url="/conselheiroCadastro">Adicionar</AddButton>
        </TitleDiv>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Perfil</th>
              <th>Nome</th>
              <th>Data nascimento</th>
              <th>Ano ingresso equipe</th>
              <th>Editar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {conselheiro.map((item) => (
              <tr>
                <td>{item.Conselheiro_Perfil}</td>
                <td>{item.Conselheiro_Nome}</td>
                <td>{formatDate(item.Conselheiro_DataNascimento)}</td>
                <td>{formatDate(item.Conselheiro_AnoIngressoEquipe)}</td>
                <td>
                  <ButtonIconPointer>
                    <FaEdit
                      onClick={() =>
                        history.push(
                          `/conselheiroCadastro/${item.Conselheiro_IDMENS}`
                        )
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
          Tem certeza que deseja deletar o conselheiro:{' '}
          {conselheiroToDelete.Conselheiro_Nome}
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

export default ConselheiroAdm;
