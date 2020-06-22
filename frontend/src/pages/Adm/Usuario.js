/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Table, Modal } from 'react-bootstrap';
import {
  FaUserShield,
  FaTrash,
  FaTimesCircle,
  FaCheckCircle,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

import api from '../../services/api';

import {
  Container,
  ButtonDelete,
  ButtonCancelDelete,
  TitleDiv,
} from './styles';

import Title from '../../components/Title';
import ButtonIconPointer from '../../components/ButtonIconPointer';

function UsuarioAdm({ match }) {
  const [usuario, setUsuario] = useState([]);
  const [showDelete, setShowDetele] = useState(false);
  const [showAdm, setShowAdm] = useState(false);
  const [usuarioToDelete, setUsuarioToDelete] = useState({});
  const [usuarioToAdm, setUsuarioToAdm] = useState({});

  useEffect(() => {
    function getUsers() {
      api
        .get(`/user`)
        .then((res) => {
          if (res.data.status === true) {
            res.data.data.map((item) => {
              setUsuario((prevUsuarios) => [...prevUsuarios, item]);
            });
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
    getUsers();
  }, []);

  function handleShowDelete(userDelete) {
    if (userDelete) {
      setUsuarioToDelete(userDelete);
    } else {
      setUsuarioToDelete({});
    }
    setShowDetele(!showDelete);
  }

  function handleShowAdm(userAdm) {
    if (userAdm) {
      setUsuarioToAdm(userAdm);
    } else {
      setUsuarioToAdm({});
    }
    setShowAdm(!showAdm);
  }

  function handleDelete() {
    api
      .delete(`/user/${usuarioToDelete.SiteAcesso_CasalIDMENS}`)
      .then((res) => {
        toast.info(res.data.message);
        setUsuario(
          usuario.filter(
            (item) =>
              item.SiteAcesso_CasalIDMENS !==
              usuarioToDelete.SiteAcesso_CasalIDMENS
          )
        );
        handleShowDelete();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        handleShowDelete();
      });
  }

  function handleAdm() {
    let new_status = 0;
    if (usuarioToAdm.SiteAcesso_Adm === 0) {
      new_status = 1;
    }
    api
      .put(`/user/${usuarioToAdm.SiteAcesso_CasalIDMENS}`, {
        adm: new_status,
      })
      .then((res) => {
        toast.info(res.data.message);
        setUsuario([]);
        api
          .get(`/user`)
          .then((result) => {
            if (result.data.status === true) {
              result.data.data.map((item) => {
                setUsuario((prevUsuarios) => [...prevUsuarios, item]);
              });
            }
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
        handleShowAdm();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        handleShowAdm();
      });
  }
  return (
    <>
      <Container>
        <TitleDiv>
          <Title back="/painel">Usuarios</Title>
        </TitleDiv>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>IDMENS</th>
              <th>Nome</th>
              <th>Equipe</th>
              <th>Administrador</th>
              <th>Editar Administrador</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {usuario.map((item) => (
              <tr>
                <td>{item.SiteAcesso_CasalIDMENS}</td>
                <td>{item.SiteAcesso_CasalNome}</td>
                <td>{item.SiteAcesso_CasalEquipeID}</td>
                <td>
                  {item.SiteAcesso_Adm === 1 ? (
                    <FaCheckCircle size={18} color="#4BAA4E" />
                  ) : (
                    <FaTimesCircle size={18} color="#000" />
                  )}
                </td>
                <td>
                  <ButtonIconPointer>
                    <FaUserShield
                      onClick={() => handleShowAdm(item)}
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
          Tem certeza que deseja deletar o usuario:{' '}
          {usuarioToDelete.SiteAcesso_CasalNome}
        </Modal.Body>
        <Modal.Footer>
          <ButtonCancelDelete onClick={handleShowDelete}>
            Cancelar
          </ButtonCancelDelete>
          <ButtonDelete onClick={handleDelete}>Deletar</ButtonDelete>
        </Modal.Footer>
      </Modal>
      <Modal show={showAdm} onHide={handleShowAdm}>
        <Modal.Header
          style={{ backgroundColor: '#326B97', color: '#fff' }}
          closeButton
        >
          <Modal.Title>
            {usuarioToAdm.SiteAcesso_Adm ? (
              <>Tem certeza que deseja retirar o ADM?</>
            ) : (
              <>Tem certeza que deseja tornar ADM?</>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {usuarioToAdm.SiteAcesso_Adm ? (
            <>Tem certeza que deseja retirar o usuario de administrador:</>
          ) : (
            <>Tem certeza que deseja tornar o usuario administrador:</>
          )}

          {usuarioToAdm.SiteAcesso_CasalNome}
        </Modal.Body>
        <Modal.Footer>
          <ButtonCancelDelete onClick={handleShowAdm}>
            Cancelar
          </ButtonCancelDelete>
          <ButtonDelete onClick={handleAdm}>Ok!</ButtonDelete>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UsuarioAdm;
