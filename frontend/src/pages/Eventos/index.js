/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Modal } from 'react-bootstrap';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/sass/styles.scss';

import { Container, Evento, DivEvento } from './styles';

import api from '../../services/api';

import Title from '../../components/Title';

export default function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [eventosDestaque, setEventosDetaque] = useState([]);
  const [showEventoDetail, setShowEventoDetail] = useState(false);
  const [eventoDetail, setEventoDetail] = useState({});

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

    return `${year}-${month}-${dt} 00:00`;
  }

  function formatDateDestaque(date) {
    const d = new Date(date);
    let mes = `${d.getMonth() + 1}`;
    let dia = `${d.getDate()}`;
    const ano = `${d.getFullYear()}`;

    mes.length < 2 ? (mes = `0${mes}`) : mes;
    dia.length < 2 ? (dia = `0${dia}`) : dia;

    return [dia, mes, ano].join('/');
  }

  function formatHourDestaque(hour) {
    return hour.substring(0, 5);
  }

  useEffect(() => {
    function getEventos() {
      api
        .get(`/eventoCompleto`)
        .then((res) => {
          res.data.data.map((item) => {
            const eventoOBJ = {
              id: item.Evento_ID,
              title: item.Evento_Descricao,
              start: formatDate(item.Evento_Data),
              end: formatDate(item.Evento_Data),
              local: item.Evento_Local,
              time: item.Evento_Horario,
              equipe: item.Evento_EquipeResp,
              destaque: item.Evento_Destaque,
            };
            if (eventoOBJ.destaque) {
              setEventosDetaque((prevEventosDestaque) => [
                ...prevEventosDestaque,
                eventoOBJ,
              ]);
            }
            setEventos((prevEventos) => [...prevEventos, eventoOBJ]);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getEventos();
  }, []);

  function showModal(item) {
    setShowEventoDetail(!showEventoDetail);
    if (item) {
      setEventoDetail(item);
    } else {
      setEventoDetail({});
    }
  }

  const localizer = momentLocalizer(moment);
  return (
    <Container>
      <Title>Eventos</Title>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        messages={{
          today: 'Hoje',
          next: 'Próximo',
          month: 'Mês',
          week: 'Semana',
          day: 'Dia',
          previous: 'Anterior',
          noEventsInRange: 'Não há eventos neste período',
          date: 'Dia',
          event: 'Evento',
        }}
        style={{ height: 600, marginBottom: 15 }}
        events={eventos}
        views={['month']}
        onSelectEvent={(e) => showModal(e)}
      />
      <Title>Eventos destaque</Title>
      <DivEvento>
        <ul>
          {eventosDestaque.map((item) => (
            <Evento key={item.Evento_ID}>
              <b>{formatDateDestaque(item.start)}</b>
              {item.time ? (
                <text>
                  {' '}
                  às <b>{formatHourDestaque(item.time)}</b> -{' '}
                </text>
              ) : (
                ` - `
              )}
              <b>{item.title}</b>
              {item.local ? (
                <text>
                  {' '}
                  em <b>{item.local}</b> realizado por equipe{' '}
                </text>
              ) : (
                ` realizado por equipe `
              )}
              <b>{item.equipe}</b>
            </Evento>
          ))}
        </ul>
      </DivEvento>
      <Modal show={showEventoDetail} centered onHide={showModal}>
        <Modal.Header closeButton>
          <Modal.Title>{eventoDetail.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Hora: {eventoDetail.time}</Modal.Body>
        <Modal.Body>Onde: {eventoDetail.local}</Modal.Body>
        <Modal.Body>Realizado pela equipe: {eventoDetail.local}</Modal.Body>
      </Modal>
    </Container>
  );
}
