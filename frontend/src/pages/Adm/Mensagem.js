/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import {
  FaArrowAltCircleRight,
  FaExclamationCircle,
  FaCheckCircle,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

import api from '../../services/api';

import { Container, TitleDiv } from './styles';

import Title from '../../components/Title';
import ButtonIconPointer from '../../components/ButtonIconPointer';

function MensagemAdm({ match }) {
  const [mensagem, setMensagem] = useState([]);

  useEffect(() => {
    function getMensagens() {
      api
        .get(`/mensagem`)
        .then((res) => {
          if (res.data.status === true) {
            res.data.data.map((item) => {
              setMensagem((prevMensagens) => [...prevMensagens, item]);
            });
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
    getMensagens();
  }, []);

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

  return (
    <>
      <Container>
        <TitleDiv>
          <Title back="/painel">Mensagens</Title>
        </TitleDiv>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Remetente</th>
              <th>Assunto</th>
              <th>Data</th>
              <th>Status</th>
              <th>Visualizar</th>
            </tr>
          </thead>
          <tbody>
            {mensagem.map((item) => (
              <tr>
                <td>{item.Mensagem_Nome}</td>
                <td>{item.Mensagem_Assunto}</td>
                <td>{formatDate(item.Mensagem_Data)}</td>
                <td>
                  <ButtonIconPointer>
                    {item.Mensagem_Lida ? (
                      <FaCheckCircle size={18} color="#4BAA4E" />
                    ) : (
                      <FaExclamationCircle size={18} color="#F54B30" />
                    )}
                  </ButtonIconPointer>
                </td>
                <td>
                  <ButtonIconPointer>
                    <FaArrowAltCircleRight size={18} color="#326B97" />
                  </ButtonIconPointer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default MensagemAdm;
