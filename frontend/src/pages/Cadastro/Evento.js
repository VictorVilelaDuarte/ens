import React, { useState, useRef, useEffect } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import api from '../../services/api';
import history from '../../services/history';

import './ckeditor.css';
import Title from '../../components/Title';
import InputTexto from '../../components/InputTexto';
import InputSwitch from '../../components/InputSwitch';
import InputDate from '../../components/InputDate';
import InputTime from '../../components/InputTime';
import InputSelect from '../../components/InputSelect';
import Button from '../../components/Button';

import { Container, FormDiv, TitleDiv, FormInputs } from './styles';

function EventoCadastro({ match }) {
  const formRef = useRef(null);
  const [text, setText] = useState('');
  const [optionsTipo, setOptionsTipo] = useState([]);
  const [CEvento, setCEvento] = useState();

  useEffect(() => {
    const { evento } = match.params;
    function getCEvento() {
      api
        .get(`/evento/${evento}`)
        .then((res) => {
          const response = res.data.data[0];
          const CEventoOBJ = {
            id: response.Evento_ID,
            data: response.Evento_Data,
            descricao: response.Evento_Descricao,
            equipe: response.Evento_EquipeResp,
            hora: response.Evento_Horario,
            local: response.Evento_Local,
            tipo: response.Evento_TipoID,
            text: response.Evento_Historico,
            eventoDestaque: response.Evento_Destaque === 1,
          };
          setCEvento(CEventoOBJ);
          setText(CEventoOBJ.text);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    function getOptionTipoEvento() {
      api
        .get('/tipoevento')
        .then((res) => {
          const OptionsOBJ = [];
          res.data.data.map((item) => {
            const draftOBJ = {
              value: item.Evento_TipoID,
              label: item.Evento_TipoDescricao,
            };
            OptionsOBJ.push(draftOBJ);
          });
          setOptionsTipo(OptionsOBJ);
        })
        .catch((err) => {
          toast.error(err.data.message);
        });
    }

    getOptionTipoEvento();
    if (evento) {
      getCEvento();
    }
  }, []);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        data: Yup.string().required('A data do evento é obrigatória'),
        descricao: Yup.string().required('A descrição é obrigatória'),
        equipe: Yup.string().required('A equipe responsavel é obrigatória'),
        hora: Yup.string().required('A hora do evento é obrigatória'),
        local: Yup.string().required('O local do evento é obrigatório'),
        tipo: Yup.string().required('O tipo do evento é obrigatório'),
        eventoDestaque: Yup.bool(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const json = {
        data: data.data,
        hora: data.hora,
        local: data.local,
        equipe: data.equipe,
        descricao: data.descricao,
        historico: text,
        tipo: data.tipo,
        destaque: data.eventoDestaque ? '1' : '0',
      };

      if (CEvento) {
        api
          .put(`/evento/${CEvento.id}`, json)
          .then((res) => {
            toast.info(res.data.message);
            history.push('/eventoadm');
          })
          .catch((err) => {
            toast.error(err.data.message);
          });
      } else {
        api
          .post('/evento', json)
          .then((res) => {
            toast.info(res.data.message);
            history.push('/eventoadm');
          })
          .catch((err) => {
            toast.error(err.data.message);
          });
      }
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <>
      <Container>
        <TitleDiv>
          <Title back="/eventoadm">Cadastro de notícia</Title>
        </TitleDiv>
        <FormDiv>
          <FormInputs
            ref={formRef}
            initialData={CEvento}
            onSubmit={handleSubmit}
          >
            <InputTexto
              name="descricao"
              placeholder="Digite a descrição do evento"
            />
            <InputDate name="data" placeholder="Digite a data do evento" />
            <InputTime name="hora" placeholder="Digite a hora do evento" />
            <InputTexto name="local" placeholder="Digite o local do evento" />
            <InputTexto
              name="equipe"
              placeholder="Digite a equipe responsável pelo evento"
            />
            <InputSelect name="tipo" opcoes={optionsTipo} />
            <CKEditor
              editor={ClassicEditor}
              config={{ placeholder: 'Digite o histórico do evento' }}
              data={CEvento ? CEvento.text : ''}
              onChange={(event, editor) => {
                const data = editor.getData();
                setText(data);
              }}
            />
            <InputSwitch label="Evento destaque" name="eventoDestaque" />
            <Button type="submit">Enviar</Button>
          </FormInputs>
        </FormDiv>
      </Container>
    </>
  );
}

export default EventoCadastro;
