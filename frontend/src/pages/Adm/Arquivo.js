/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Table, Modal } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
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

function InformensAdm({ match }) {
  const [arquivo, setArquivo] = useState([]);
  const [showDelete, setShowDetele] = useState(false);
  const [arquivoToDelete, setArquivoToDelete] = useState({});

  useEffect(() => {
    function getNoticias() {
      api
        .get(`/arquivo`)
        .then((res) => {
          if (res.data.status === true) {
            res.data.data.map((item) => {
              setArquivo((prevArquivos) => [...prevArquivos, item]);
            });
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
    getNoticias();
  }, []);

  function handleShowDelete(arquivoDelete) {
    if (arquivoDelete) {
      setArquivoToDelete(arquivoDelete);
    } else {
      setArquivoToDelete({});
    }
    setShowDetele(!showDelete);
  }

  function handleDelete() {
    api
      .delete(`/arquivo/${arquivoToDelete.Arquivo_ID}`)
      .then((res) => {
        toast.info(res.data.message);
        setArquivo(
          arquivo.filter(
            (item) => item.Arquivo_ID !== arquivoToDelete.Arquivo_ID
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
          <Title back="/painel">Arquivo</Title>
          <AddButton url="/arquivoCadastro">Adicionar</AddButton>
        </TitleDiv>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Link</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {arquivo.map((item) => (
              <tr>
                <td>{item.Arquivo_Titulo}</td>
                <td>{item.Arquivo_Path}</td>
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
          Tem certeza que deseja deletar o arquivo:{' '}
          {arquivoToDelete.Arquivo_Titulo}
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
