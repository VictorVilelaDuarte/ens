/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useContext } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import { FaEdit, FaTrash, FaTimesCircle, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import history from '../../services/history';

import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

import { Container } from './styles';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Title from '../../components/Title';

function NoticiaAdm({ match }) {
  const { verifyAuth } = useContext(AuthContext);
  const [noticia, setNoticia] = useState([]);
  const [pagination, setPagination] = useState({});
  const [changePage, setChangePage] = useState(0);

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
        .catch(() => {});
    }
    getNoticias();
  }, [changePage]);

  function handleChangePagination(nPage) {
    history.push(`/noticiaadm/${nPage}`);
    setNoticia([]);
    setChangePage(nPage);
  }

  return (
    <>
      <Header />
      <Container>
        <Title>Notícias</Title>
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
                <td>{item.noticia_hora}</td>
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
                  <FaTrash size={18} color="#F54B30" />
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
    </>
  );
}

export default NoticiaAdm;
