/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Table, Pagination, Modal } from 'react-bootstrap';
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

function InformensAdm({ match }) {
  const [informens, setInformens] = useState([]);
  const [pagination, setPagination] = useState({});
  const [changePage, setChangePage] = useState(0);
  const [showDelete, setShowDetele] = useState(false);
  const [informensToDelete, setInformensToDelete] = useState({});

  useEffect(() => {
    let thisPage = match.params.page;
    if (!thisPage) {
      thisPage = 1;
    }
    function getNoticias() {
      api
        .get(`/informens?page=${thisPage}`)
        .then((res) => {
          if (res.data.status === true) {
            res.data.data.map((item) => {
              setInformens((prevInformens) => [...prevInformens, item]);
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
    getNoticias();
  }, [changePage]);

  function handleChangePagination(nPage) {
    history.push(`/informensadm/${nPage}`);
    setInformens([]);
    setChangePage(nPage);
  }

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
