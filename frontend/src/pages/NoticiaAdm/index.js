/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useContext } from 'react';
import { Table, Pagination, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash, FaTimesCircle, FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import history from '../../services/history';

import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

import {
  Container,
  ButtonDelete,
  ButtonCancelDelete,
  TitleDiv,
} from './styles';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Title from '../../components/Title';
import AddButton from '../../components/AddButton';

function NoticiaAdm({ match }) {
  const { verifyAuth } = useContext(AuthContext);
  const [noticia, setNoticia] = useState([]);
  const [pagination, setPagination] = useState({});
  const [changePage, setChangePage] = useState(0);
  const [showDelete, setShowDetele] = useState(false);
  const [noticiaToDelete, setNoticiaToDelete] = useState({});

  useEffect(() => {
    let thisPage = match.params.page;
    if (!thisPage) {
      thisPage = 1;
    }
    verifyAuth(`/noticiaadm/${thisPage}`);
    function getNoticias() {
      api
        .get(`/noticia?page=${thisPage}`)
        .then((res) => {
          if (res.data.status === true) {
            res.data.data.map((item) => {
              setNoticia((prevNoticias) => [...prevNoticias, item]);
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
    history.push(`/noticiaadm/${nPage}`);
    setNoticia([]);
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

  function handleShowDelete(noticiaDelete) {
    if (noticiaDelete) {
      setNoticiaToDelete(noticiaDelete);
    } else {
      setNoticiaToDelete({});
    }
    setShowDetele(!showDelete);
  }

  function handleDelete() {
    api
      .delete(`/noticia/${noticiaToDelete.noticia_cod}`)
      .then((res) => {
        toast.info(res.data.message);
        setNoticia(
          noticia.filter(
            (item) => item.noticia_cod !== noticiaToDelete.noticia_cod
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
      <Header />
      <Container>
        <TitleDiv>
          <Title>Notícias</Title>
          <AddButton>Adicionar</AddButton>
        </TitleDiv>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Autor</th>
              <th>Titulo</th>
              <th>Data</th>
              <th>Destaque</th>
              <th>Editar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {noticia.map((item) => (
              <tr>
                <td>{item.noticia_autor}</td>
                <td>{item.noticia_titulo}</td>
                <td>{formatDate(item.noticia_hora)}</td>
                <td>
                  {item.noticia_destaque === 0 ? (
                    <FaCheckCircle size={18} color="#4BAA4E" />
                  ) : (
                    <FaTimesCircle size={18} color="#000" />
                  )}
                </td>
                <td>
                  <FaEdit size={18} color="#326B97" />
                </td>
                <td>
                  <FaTrash
                    size={18}
                    color="#F54B30"
                    onClick={() => handleShowDelete(item)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Pagination>
          {pagination.page === pagination.prevpage ? (
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
      <Footer />
      <Modal show={showDelete} onHide={handleShowDelete}>
        <Modal.Header
          style={{ backgroundColor: '#F54B30', color: '#fff' }}
          closeButton
        >
          <Modal.Title>Tem certeza que deseja deletar?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja deletar a noticia:{' '}
          {noticiaToDelete.noticia_titulo}
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

export default NoticiaAdm;
