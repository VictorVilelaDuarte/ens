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

function PilotagemAdm({ match }) {
  const [pilotagem, setPilotagem] = useState([]);
  const [showDelete, setShowDetele] = useState(false);
  const [pilotagemToDelete, setPilotagemToDelete] = useState({});

  useEffect(() => {
    function getPilotagem() {
      api
        .get(`/pilotagem`)
        .then((res) => {
          if (res.data.status === true) {
            res.data.data.map((item) => {
              setPilotagem((prevPilotagens) => [...prevPilotagens, item]);
            });
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
    getPilotagem();
  }, []);

  function handleShowDelete(pilotagemDelete) {
    if (pilotagemDelete) {
      setPilotagemToDelete(pilotagemDelete);
    } else {
      setPilotagemToDelete({});
    }
    setShowDetele(!showDelete);
  }

  function handleDelete() {
    api
      .delete(`/pilotagem/${pilotagemToDelete.Pilot_IDMENS}`)
      .then((res) => {
        toast.info(res.data.message);
        setPilotagem(
          pilotagem.filter(
            (item) => item.Pilot_IDMENS !== pilotagemToDelete.Pilot_IDMENS
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
          <Title back="/painel">Pilotagem</Title>
          <AddButton url="/pilotagemCadastro">Adicionar</AddButton>
        </TitleDiv>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>IDMENS</th>
              <th>Nome Casal</th>
              <th>Editar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {pilotagem.map((item) => (
              <tr>
                <td>{item.Pilot_IDMENS}</td>
                <td>{item.Pilot_Nome}</td>
                <td>
                  <ButtonIconPointer>
                    <FaEdit
                      onClick={() =>
                        history.push(`/pilotagemCadastro/${item.Pilot_IDMENS}`)
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
          Tem certeza que deseja deletar o casal: {pilotagemToDelete.Pilot_Nome}
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

export default PilotagemAdm;
