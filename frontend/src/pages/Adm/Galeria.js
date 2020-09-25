/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Table, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
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

function GaleriaAdm() {
  const [galeria, setGaleria] = useState([]);
  const [showDelete, setShowDetele] = useState(false);
  const [galeriaToDelete, setGaleriaToDelete] = useState({});

  useEffect(() => {
    function getGaleria() {
      api
        .get(`/galeria`)
        .then((res) => {
          if (res.data.status === true) {
            res.data.data.map((item) => {
              setGaleria((prevGalerias) => [...prevGalerias, item]);
            });
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
    getGaleria();
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

  function handleShowDelete(galeriaDelete) {
    if (galeriaDelete) {
      setGaleriaToDelete(galeriaDelete);
    } else {
      setGaleriaToDelete({});
    }
    setShowDetele(!showDelete);
  }

  function handleDelete() {
    api
      .delete(`/galeria/${galeriaToDelete.Galeria_ID}`)
      .then((res) => {
        toast.info(res.data.message);
        setGaleria(
          galeria.filter(
            (item) => item.Galeria_ID !== galeriaToDelete.Galeria_ID
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
          <Title back="/painel">Galeria</Title>
          <AddButton url="/galeriaCadastro">Adicionar</AddButton>
        </TitleDiv>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Data</th>
              <th>Adicionar fotos</th>
              <th>Excluir fotos</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {galeria.map((item) => (
              <tr>
                <td>{item.Galeria_Titulo}</td>
                <td>{formatDate(item.Galeria_Data)}</td>
                <td>
                  <ButtonIconPointer>
                    <FaPlus
                      onClick={() =>
                        history.push(`/albumCadastro/${item.Galeria_ID}`)
                      }
                      size={18}
                      color="#326B97"
                    />
                  </ButtonIconPointer>
                </td>
                <td>
                  <ButtonIconPointer>
                    <FaMinus
                      onClick={() =>
                        history.push(`/albumCadastro/${item.Galeria_ID}`)
                      }
                      size={18}
                      color="#F54B30"
                    />
                  </ButtonIconPointer>
                </td>
                <td>
                  <ButtonIconPointer>
                    <FaEdit
                      onClick={() =>
                        history.push(`/galeriaCadastro/${item.Galeria_ID}`)
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
          Tem certeza que deseja deletar a galeria:{' '}
          {galeriaToDelete.Galeria_Titulo}
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

export default GaleriaAdm;
