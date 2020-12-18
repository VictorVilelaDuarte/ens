/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Table, Modal } from 'react-bootstrap';
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
  const [showMessageDetail, setShowMessageDatail] = useState(false);
  const [messageDetail, setMessageDetail] = useState({});

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

  function handleShowDetail(message) {
    console.log(message);
    if (message) {
      setMessageDetail(message);
    } else {
      setMessageDetail({});
    }
    setShowMessageDatail(!showMessageDetail);
  }

  function formatDate(date) {
    const nDate = new Date(date);
    nDate.setDate(nDate.getDate() + 1);
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
                    <FaArrowAltCircleRight
                      size={18}
                      color="#326B97"
                      onClick={() => handleShowDetail(item)}
                    />
                  </ButtonIconPointer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Modal size="lg" show={showMessageDetail} onHide={handleShowDetail}>
        <Modal.Header
          style={{ backgroundColor: '#326B97', color: '#fff' }}
          closeButton
        >
          <Modal.Title>
            {messageDetail.Mensagem_Assunto} - {messageDetail.Mensagem_Nome}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <b>Nome: </b> {messageDetail.Mensagem_Nome} <hr />
          <b>Assunto: </b> {messageDetail.Mensagem_Assunto} <hr />
          <b>Texto: </b> {messageDetail.Mensagem_Conteudo} <hr />
          <b>Telefone: </b> {messageDetail.Mensagem_Telefone} <hr />
          <b>E-mail: </b> {messageDetail.Mensagem_Email} <hr />
          <b>Data: </b> {formatDate(messageDetail.Mensagem_Data)}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MensagemAdm;
