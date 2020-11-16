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

function EventoAdm({ match }) {
  const [evento, setEvento] = useState([]);
  const [pagination, setPagination] = useState({});
  const [changePage, setChangePage] = useState(0);
  const [showDelete, setShowDetele] = useState(false);
  const [eventoToDelete, setEventoToDelete] = useState({});

  useEffect(() => {
    let thisPage = match.params.page;
    if (!thisPage) {
      thisPage = 1;
    }
    function getEvento() {
      api
        .get(`/evento?page=${thisPage}`)
        .then((res) => {
          if (res.data.status === true) {
            res.data.data.map((item) => {
              setEvento((prevEventos) => [...prevEventos, item]);
            });

            const { lastpage, page, nextpage, prevpage } = res.headers;
            setPagination({
              lastpage,
              page,
              nextpage,
              prevpage,
            });
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
    getEvento();
  }, [changePage]);

  function handleChangePagination(nPage) {
    history.push(`/eventoadm/${nPage}`);
    setEvento([]);
    setChangePage(nPage);
  }

  function formatDate(date) {
    const nDate = new Date(date);
    const year = nDate.getFullYear();
    let month = nDate.getMonth() + 1;
    let dt = nDate.getDate() + 1;

    if (dt < 10) {
      dt = `0${dt}`;
    }
    if (month < 10) {
      month = `0${month}`;
    }

    return `${dt}/${month}/${year}`;
  }

  function handleShowDelete(eventoDelete) {
    if (eventoDelete) {
      setEventoToDelete(eventoDelete);
    } else {
      setEventoToDelete({});
    }
    setShowDetele(!showDelete);
  }

  function handleDelete() {
    api
      .delete(`/evento/${eventoToDelete.Evento_ID}`)
      .then((res) => {
        toast.info(res.data.message);
        setEvento(
          evento.filter((item) => item.Evento_ID !== eventoToDelete.Evento_ID)
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
          <Title back="/painel">Eventos</Title>
          <AddButton url="/eventoCadastro">Adicionar</AddButton>
        </TitleDiv>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Data</th>
              <th>Hora</th>
              <th>Local</th>
              <th>Destaque</th>
              <th>Editar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {evento.map((item) => (
              <tr>
                <td>{item.Evento_Descricao}</td>
                <td>{formatDate(item.Evento_Data)}</td>
                <td>{item.Evento_Horario}</td>
                <td>{item.Evento_Local}</td>
                <td>
                  {item.Evento_Destaque === 1 ? (
                    <FaCheckCircle size={18} color="#4BAA4E" />
                  ) : (
                    <FaTimesCircle size={18} color="#000" />
                  )}
                </td>
                <td>
                  <ButtonIconPointer>
                    <FaEdit
                      onClick={() =>
                        history.push(`/eventoCadastro/${item.Evento_ID}`)
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

        <Pagination>
          {pagination.lastpage === '1' ? (
            <></>
          ) : pagination.page === pagination.prevpage ? (
            <>
              <Pagination.Item active>{pagination.page}</Pagination.Item>
              <Pagination.Item
                onClick={() => handleChangePagination(pagination.nextpage)}
              >
                {pagination.nextpage}
              </Pagination.Item>
              <Pagination.Last
                onClick={() => handleChangePagination(pagination.lastpage)}
              />
            </>
          ) : pagination.page === pagination.lastpage ? (
            <>
              <Pagination.First onClick={() => handleChangePagination(1)} />
              <Pagination.Item
                onClick={() => handleChangePagination(pagination.prevpage)}
              >
                {pagination.prevpage}
              </Pagination.Item>
              <Pagination.Item active>{pagination.page}</Pagination.Item>
            </>
          ) : (
            <>
              <Pagination.First onClick={() => handleChangePagination(1)} />
              <Pagination.Item
                onClick={() => handleChangePagination(pagination.prevpage)}
              >
                {pagination.prevpage}
              </Pagination.Item>
              <Pagination.Item active>{pagination.page}</Pagination.Item>
              <Pagination.Item
                onClick={() => handleChangePagination(pagination.nextpage)}
              >
                {pagination.nextpage}
              </Pagination.Item>
              <Pagination.Last
                onClick={() => handleChangePagination(pagination.lastpage)}
              />
            </>
          )}
        </Pagination>
      </Container>
      <Modal show={showDelete} onHide={handleShowDelete}>
        <Modal.Header
          style={{ backgroundColor: '#F54B30', color: '#fff' }}
          closeButton
        >
          <Modal.Title>Tem certeza que deseja deletar?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja deletar o evento:{' '}
          {eventoToDelete.Evento_Descricao}
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

export default EventoAdm;
