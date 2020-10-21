/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import { Table, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash, FaArrowAltCircleRight } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import history from '../../services/history';
import api from '../../services/api';

import {
  Container,
  ButtonDelete,
  ButtonCancelDelete,
  TitleDiv,
  Label,
} from './styles';

import Title from '../../components/Title';
import AddButton from '../../components/AddButton';
import InputSelect from '../../components/InputSelect';
import ButtonIconPointer from '../../components/ButtonIconPointer';

function PilotagemAdm({ match }) {
  const formRef = useRef(null);
  const [pilotagem, setPilotagem] = useState([]);
  const [equipe, setEquipe] = useState([]);
  const [showDelete, setShowDetele] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pilotagemToDelete, setPilotagemToDelete] = useState({});
  const [pilotagemToPromove, setPilotagemToPromove] = useState({});

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

    function getEquipes() {
      api
        .get(`/equipe`)
        .then((res) => {
          if (res.data.status === true) {
            res.data.data.map((item) => {
              const equipeOBJ = {
                value: item.Equipe_ID,
                label: `${item.Equipe_ID} - ${item.Equipe_Nome}`,
              };
              setEquipe((prevEquipes) => [...prevEquipes, equipeOBJ]);
            });
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }

    getEquipes();
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

  function handleShowModal(pilotagemPromove) {
    if (pilotagemPromove) {
      setPilotagemToPromove(pilotagemPromove);
    } else {
      setPilotagemToPromove({});
    }
    setShowModal(!showModal);
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

  async function handlePromove(data) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        equipe: Yup.string().required('A equipe é obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const json = {
        idmens: pilotagemToPromove.Pilot_IDMENS,
        equipe: data.equipe,
      };
      api
        .post(`/pilotagemPromove`, json)
        .then((res) => {
          toast.info(res.data.message);
          api
            .get(`/pilotagem`)
            .then((res) => {
              setPilotagem([]);
              if (res.data.status === true) {
                res.data.data.map((item) => {
                  setPilotagem((prevPilotagens) => [...prevPilotagens, item]);
                });
              }
            })
            .catch((err) => {
              toast.error(err.response.data.message);
            });
          handleShowModal();
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          handleShowModal();
        });
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
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
              <th>Promover</th>
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
                    <FaArrowAltCircleRight
                      onClick={() => handleShowModal(item)}
                      size={18}
                      color="#326B97"
                    />
                  </ButtonIconPointer>
                </td>
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

      <Modal show={showModal} onHide={handleShowModal}>
        <Modal.Header
          style={{ backgroundColor: '#326B97', color: '#fff' }}
          closeButton
        >
          <Modal.Title>Tem certeza que deseja promover?</Modal.Title>
        </Modal.Header>
        <Form ref={formRef} onSubmit={handlePromove}>
          <Modal.Body>
            <Label>Selecione a equipe de destino</Label>
            <InputSelect name="equipe" opcoes={equipe} />
          </Modal.Body>
          <Modal.Footer>
            <ButtonCancelDelete type="submit">Promover</ButtonCancelDelete>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default PilotagemAdm;
