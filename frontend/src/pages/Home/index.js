import React, { useState, useEffect } from 'react';

import { Container } from './styles';
import api from '../../services/api';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Home() {
  const [noticia, setNoticia] = useState([]);
  const [evento, setEvento] = useState([]);

  useEffect(() => {
    function getNoticias() {
      api
        .get(`/noticiahome`)
        .then((res) => {
          if (res.data.status === true) {
            res.data.data.map((item) => {
              setNoticia((prevNoticias) => [...prevNoticias, item]);
            });
          } else {
            console.log(`erro ao buscar`);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    function getEventos() {
      api
        .get(`/eventohome`)
        .then((res) => {
          if (res.data.status === true) {
            res.data.data.map((item) => {
              setEvento((prevEventos) => [...prevEventos, item]);
            });
          } else {
            console.log(`erro ao buscar`);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getNoticias();
    getEventos();
  }, []);

  return (
    <>
      {console.log(noticia, evento)}
      <Header />
      <Container>
        <h1>HOMEPAGE</h1>
      </Container>
      <Footer />
    </>
  );
}
