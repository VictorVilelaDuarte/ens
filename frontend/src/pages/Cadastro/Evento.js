import React, { useState, useRef, useEffect } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import api from '../../services/api';
import history from '../../services/history';

import './ckeditor.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
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

  // useEffect(() => {
  //   const { evento } = match.params;

  //   api
  //     .get(`/evento/${evento}`)
  //     .then((res) => {
  //       const response = res.data.data[0];
  //       const CNoticiaOBJ = {
  //         id: response.noticia_cod,
  //         title: response.noticia_titulo,
  //         text: response.noticia_texto,
  //         picture: [response.noticia_imagem],
  //         noticiaDestaque: response.noticia_destaque === 1,
  //       };
  //       setCNoticia(CNoticiaOBJ);
  //       setText(CNoticiaOBJ.text);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  async function handleSubmit(data) {
    console.log(data);

    // try {
    //   formRef.current.setErrors({});
    //   const schema = Yup.object().shape({
    //     title: Yup.string().required('O titulo é obrigatório'),
    //     noticiaDestaque: Yup.bool(),
    //   });

    //   await schema.validate(data, {
    //     abortEarly: false,
    //   });

    //   if (!picture && !CNoticia) {
    //     toast.error('É necessário inserir imagem na notícia');
    //     return;
    //   }

    //   if (!text) {
    //     toast.error('É necessário inserir um texto na notícia');
    //     return;
    //   }

    //   const formData = new FormData();
    //   if (picture) {
    //     formData.append('file', picture[0]);
    //   }

    //   formData.append('titulo', data.title);
    //   formData.append('texto', text);
    //   formData.append('destaque', data.noticiaDestaque ? '1' : '0');

    //   if (CNoticia) {
    //     api
    //       .post(`/noticia/${CNoticia.id}`, formData)
    //       .then((res) => {
    //         toast.info(res.data.message);
    //         history.push('/noticiaadm');
    //       })
    //       .catch((err) => {
    //         toast.error(err.data.message);
    //       });
    //   } else {
    //     api
    //       .post('/noticia', formData)
    //       .then((res) => {
    //         toast.info(res.data.message);
    //         history.push('/noticiaadm');
    //       })
    //       .catch((err) => {
    //         toast.error(err.data.message);
    //       });
    //   }
    // } catch (err) {
    //   const validationErrors = {};
    //   if (err instanceof Yup.ValidationError) {
    //     err.inner.forEach((error) => {
    //       validationErrors[error.path] = error.message;
    //     });
    //     formRef.current.setErrors(validationErrors);
    //   }
    // }
  }

  useEffect(() => {
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
  }, []);

  return (
    <>
      <Header />
      <Container>
        <TitleDiv>
          <Title>Cadastro de notícia</Title>
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
            {/* {console.log(optionsTipo[0])} */}
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
      <Footer />
    </>
  );
}

export default EventoCadastro;
