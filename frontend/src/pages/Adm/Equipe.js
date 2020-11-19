/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

import history from '../../services/history';
import api from '../../services/api';

import { Container, TitleDiv } from './styles';

import Title from '../../components/Title';
import ButtonIconPointer from '../../components/ButtonIconPointer';

function EquipeAdm() {
  const [equipe, setEquipe] = useState([]);

  useEffect(() => {
    function getEquipe() {
      api
        .get(`/equipe`)
        .then((res) => {
          if (res.data.status === true) {
            res.data.data.map((item) => {
              setEquipe((prevEquipes) => [...prevEquipes, item]);
            });
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
    getEquipe();
  }, []);

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
          <Title back="/painel">Equipes</Title>
          {/* <AddButton url="/equipeCadastro">Adicionar</AddButton> */}
        </TitleDiv>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Conselheiro</th>
              <th>Casal Resp.</th>
              <th>Casal Ligação</th>
              <th>Data</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {equipe.map((item) => (
              <tr>
                <td>{item.Equipe_ID}</td>
                <td>{item.Equipe_Nome}</td>
                <td>{item.Conselheiro_Nome}</td>
                <td>{item.Casal_Resp}</td>
                <td>{item.Casal_Ligacao}</td>
                <td>{formatDate(item.Equipe_DataFundacao)}</td>
                <td>
                  <ButtonIconPointer>
                    <FaEdit
                      onClick={() =>
                        history.push(`/equipeCadastro/${item.Equipe_ID}`)
                      }
                      size={18}
                      color="#326B97"
                    />
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

export default EquipeAdm;
