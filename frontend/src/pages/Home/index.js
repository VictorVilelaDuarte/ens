/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';

import { Container, Evento, DivEvento, CarouselDiv } from './styles';
import api from '../../services/api';
import history from '../../services/history';

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
          }
        })
        .catch(() => {});
    }
    function getEventos() {
      api
        .get(`/eventohome`)
        .then((res) => {
          if (res.data.status === true) {
            res.data.data.map((item) => {
              setEvento((prevEventos) => [...prevEventos, item]);
            });
          }
        })
        .catch(() => {});
    }
    getNoticias();
    getEventos();
  }, []);

  function toNoticia(id) {
    history.push(`/noticia/${id}`);
  }

  function formatDate(date) {
    const d = new Date(date);
    let mes = `${d.getMonth() + 1}`;
    let dia = `${d.getDate()}`;
    const ano = `${d.getFullYear()}`;

    mes.length < 2 ? (mes = `0${mes}`) : mes;
    dia.length < 2 ? (dia = `0${dia}`) : dia;

    return [dia, mes, ano].join('/');
  }

  function formatHour(hour) {
    return hour.substring(0, 5);
  }

  return (
    <>
      <Container>
        <CarouselDiv>
          <Carousel
            style={{
              width: 800,
              maxHeight: 450,
            }}
            interval={3000}
            indicators={false}
            keyboard={false}
          >
            {noticia.map((item) => (
              <Carousel.Item
                onClick={() => toNoticia(item.noticia_cod)}
                style={{ maxHeight: 450 }}
              >
                <img
                  className="d-block w-100"
                  src={item.noticia_imagem}
                  alt={item.noticia_titulo}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </CarouselDiv>
        <DivEvento>
          <ul>
            {evento.map((item) => (
              <Evento key={item.Evento_ID}>
                <b>{formatDate(item.Evento_Data)}</b>
                {item.Evento_Horario ? (
                  <text>
                    {' '}
                    às <b>{formatHour(item.Evento_Horario)}</b> -{' '}
                  </text>
                ) : (
                  ` - `
                )}
                <b>{item.Evento_Descricao}</b>
                {item.Evento_Local ? (
                  <text>
                    {' '}
                    em <b>{item.Evento_Local}</b> realizado por equipe{' '}
                  </text>
                ) : (
                  ` realizado por equipe `
                )}
                <b>{item.Evento_EquipeResp}</b>
              </Evento>
            ))}
          </ul>
        </DivEvento>
      </Container>
    </>
  );
}
