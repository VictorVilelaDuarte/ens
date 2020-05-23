import React, { useState, useEffect, useContext } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import { FaEdit, FaTrash, FaTimesCircle, FaCheckCircle } from 'react-icons/fa';

import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

import { Container } from './styles';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Title from '../../components/Title';

function NoticiaAdm() {
  const { verifyAuth } = useContext(AuthContext);
  const [noticia, setNoticia] = useState([]);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    verifyAuth('/noticiaadm');
  }, []);

  useEffect(() => {
    function getNoticias() {
      api
        .get(`/noticia`)
        .then((res) => {
          if (res.data.status === true) {
            res.data.data.map((item) => {
              setNoticia((prevNoticias) => [...prevNoticias, item]);
            });

            console.log(res);
          }
        })
        .catch(() => {});
    }
    getNoticias();
  }, []);

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
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Ellipsis />

          <Pagination.Item>{10}</Pagination.Item>
          <Pagination.Item>{11}</Pagination.Item>
          <Pagination.Item active>{12}</Pagination.Item>
          <Pagination.Item>{13}</Pagination.Item>
          <Pagination.Item disabled>{14}</Pagination.Item>

          <Pagination.Ellipsis />
          <Pagination.Item>{20}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </Container>
      <Footer />
    </>
  );
}

export default NoticiaAdm;
