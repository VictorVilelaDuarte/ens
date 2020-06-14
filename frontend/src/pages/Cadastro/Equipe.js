import React, { useState, useRef, useEffect } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ImageUploader from 'react-images-upload';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import api from '../../services/api';
import history from '../../services/history';

import './ckeditor.css';
import Title from '../../components/Title';
import InputTexto from '../../components/InputTexto';
import InputDate from '../../components/InputDate';
import InputSelect from '../../components/InputSelect';
import InputSwitch from '../../components/InputSwitch';
import Button from '../../components/Button';

import { Container, FormDiv, TitleDiv, FormInputs } from './styles';

function EquipeCadastro({ match }) {
  const formRef = useRef(null);
  const [picture, setPicture] = useState();
  const [text, setText] = useState('');
  const [CEquipe, setCEquipe] = useState();
  const [conselheiro, setConselheiro] = useState([]);
  const [padroeira, setPadroeira] = useState([]);

  useEffect(() => {
    const { equipe } = match.params;

    function getEquipe() {
      api
        .get(`/equipe/${equipe}`)
        .then((res) => {
          const response = res.data.data[0];
          const CEquipeOBJ = {
            id: response.Equipe_ID,
            nome: response.Equipe_Nome,
            descricao: response.Equipe_Descricao,
            padroeira: response.Equipe_PadroeiraID,
            conselheiro: response.Equipe_ConselheiroIDMENS,
            resp: response.Equipe_CasalRespAtualIDMENS,
            data: response.Equipe_DataFundacao,
            ligacao: response.Equipe_CasalLigacaoAtualIDMENS,
            setor: response.Equipe_SetorID,
            pilotagem: response.Equipe_NecessRepilotagem,
            text: response.Equipe_Historico,
            picture: [response.Equipe_imagem],
          };
          setCEquipe(CEquipeOBJ);
          setText(CEquipeOBJ.historico);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    function getConselheiros() {
      api
        .get('/conselheiro')
        .then((res) => {
          const ConselheiroOBJ = [];
          res.data.data.map((item) => {
            const draftOBJ = {
              value: item.Conselheiro_IDMENS,
              label: item.Conselheiro_Nome,
            };
            ConselheiroOBJ.push(draftOBJ);
          });
          setConselheiro(ConselheiroOBJ);
        })
        .catch((err) => {
          toast.error(err.data.message);
        });
    }

    function getPadroeiras() {
      api
        .get('/padroeira')
        .then((res) => {
          const PadroeiraOBJ = [];
          res.data.data.map((item) => {
            const draftOBJ = {
              value: item.Padroeira_ID,
              label: item.Padroeira_Nome,
            };
            PadroeiraOBJ.push(draftOBJ);
          });
          setPadroeira(PadroeiraOBJ);
        })
        .catch((err) => {
          toast.error(err.data.message);
        });
    }

    getEquipe();
    getConselheiros();
    getPadroeiras();
  }, []);

  function onDrop(Cpicture) {
    setPicture(Cpicture);
  }

  // async function handleSubmit(data) {
  //   try {
  //     formRef.current.setErrors({});
  //     const schema = Yup.object().shape({
  //       title: Yup.string().required('O titulo é obrigatório'),
  //       noticiaDestaque: Yup.bool(),
  //     });

  //     await schema.validate(data, {
  //       abortEarly: false,
  //     });

  //     if (!picture && !CEquipe) {
  //       toast.error('É necessário inserir imagem na notícia');
  //       return;
  //     }

  //     if (!text) {
  //       toast.error('É necessário inserir um texto na notícia');
  //       return;
  //     }

  //     const formData = new FormData();
  //     if (picture) {
  //       formData.append('file', picture[0]);
  //     }

  //     formData.append('titulo', data.title);
  //     formData.append('texto', text);
  //     formData.append('destaque', data.noticiaDestaque ? '1' : '0');

  //     if (CNoticia) {
  //       api
  //         .post(`/noticia/${CNoticia.id}`, formData)
  //         .then((res) => {
  //           toast.info(res.data.message);
  //           history.push('/noticiaadm');
  //         })
  //         .catch((err) => {
  //           toast.error(err.data.message);
  //         });
  //     } else {
  //       api
  //         .post('/noticia', formData)
  //         .then((res) => {
  //           toast.info(res.data.message);
  //           history.push('/noticiaadm');
  //         })
  //         .catch((err) => {
  //           toast.error(err.data.message);
  //         });
  //     }
  //   } catch (err) {
  //     const validationErrors = {};
  //     if (err instanceof Yup.ValidationError) {
  //       err.inner.forEach((error) => {
  //         validationErrors[error.path] = error.message;
  //       });
  //       formRef.current.setErrors(validationErrors);
  //     }
  //   }
  // }

  return (
    <>
      <Container>
        <TitleDiv>
          <Title>Cadastro de Equipe</Title>
        </TitleDiv>
        <FormDiv>
          <FormInputs
            ref={formRef}
            initialData={CEquipe}
            // onSubmit={handleSubmit}
          >
            <InputTexto name="nome" placeholder="Digite o nome da equipe" />
            <InputTexto
              name="descricao"
              placeholder="Digite a descrição da equipe"
            />
            <InputSelect name="padroeira" opcoes={padroeira} />
            <InputSelect name="conselheiro" opcoes={conselheiro} />
            <ImageUploader
              defaultImages={CEquipe ? CEquipe.picture : ''}
              withIcon
              withPreview
              singleImage
              label="Escolha imagem da notícia (até 5Mb)"
              buttonText="Escolher imagem"
              onChange={onDrop}
              imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
              maxFileSize={5242880}
            />
            <CKEditor
              editor={ClassicEditor}
              config={{ placeholder: 'Digite o texto da notícia' }}
              data={CEquipe ? CEquipe.text : ''}
              onChange={(event, editor) => {
                const data = editor.getData();
                setText(data);
              }}
            />
            <InputSwitch label="Notícia destaque" name="noticiaDestaque" />
            <Button type="submit">Enviar</Button>
          </FormInputs>
        </FormDiv>
      </Container>
    </>
  );
}

export default EquipeCadastro;
