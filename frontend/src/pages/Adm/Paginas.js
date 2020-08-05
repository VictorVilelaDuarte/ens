/* eslint-disable no-nested-ternary */
import React from 'react';
import { Table } from 'react-bootstrap';
import { FaEdit, FaTrash, FaTimesCircle, FaCheckCircle } from 'react-icons/fa';

import history from '../../services/history';

import { Container, TitleDiv } from './styles';

import Title from '../../components/Title';
import ButtonIconPointer from '../../components/ButtonIconPointer';

function PaginasAdm() {
  return (
    <>
      <Container>
        <TitleDiv>
          <Title back="/painel">Páginas</Title>
        </TitleDiv>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Página</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Quem somos</td>
              <td>
                <ButtonIconPointer>
                  <FaEdit
                    onClick={() => history.push(`/paginaCadastro/${1}`)}
                    size={18}
                    color="#326B97"
                  />
                </ButtonIconPointer>
              </td>
            </tr>
            <tr>
              <td>Região</td>
              <td>
                <ButtonIconPointer>
                  <FaEdit
                    onClick={() => history.push(`/paginaCadastro/${2}`)}
                    size={18}
                    color="#326B97"
                  />
                </ButtonIconPointer>
              </td>
            </tr>
            <tr>
              <td>Setor Caçapava</td>
              <td>
                <ButtonIconPointer>
                  <FaEdit
                    onClick={() => history.push(`/paginaCadastro/${3}`)}
                    size={18}
                    color="#326B97"
                  />
                </ButtonIconPointer>
              </td>
            </tr>
            <tr>
              <td>Siglas</td>
              <td>
                <ButtonIconPointer>
                  <FaEdit
                    onClick={() => history.push(`/paginaCadastro/${4}`)}
                    size={18}
                    color="#326B97"
                  />
                </ButtonIconPointer>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default PaginasAdm;
