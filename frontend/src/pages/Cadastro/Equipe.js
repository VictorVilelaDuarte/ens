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

import { Container, FormDiv, TitleDiv, FormInputs, Label } from './styles';

function EquipeCadastro({ match }) {
  const formRef = useRef(null);
  const [picture, setPicture] = useState();
  const [text, setText] = useState('');
  const [CEquipe, setCEquipe] = useState();
  const [conselheiro, setConselheiro] = useState([]);
  const [padroeira, setPadroeira] = useState([]);
  const [casal, setCasal] = useState([]);

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
            pilotagem: response.Equipe_NecessRepilotagem === 'S',
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

    function getCasais() {
      api
        .get('/casalOpcao')
        .then((res) => {
          const CasalOBJ = [];
          res.data.data.map((item) => {
            const draftOBJ = {
              value: item.Casal_IDMENS,
              label: item.Casal_Nome,
            };
            CasalOBJ.push(draftOBJ);
          });
          setCasal(CasalOBJ);
        })
        .catch((err) => {
          toast.error(err.data.message);
        });
    }

    getEquipe();
    getConselheiros();
    getPadroeiras();
    getCasais();
  }, []);

  function onDrop(Cpicture) {
    setPicture(Cpicture);
  }

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        nome: Yup.string().required('O nome é obrigatório'),
        descricao: Yup.string().required('A descricao é obrigatória'),
        padroeira: Yup.string().required('A padroeira é obrigatória'),
        conselheiro: Yup.string().required('O conselheiro é obrigatório'),
        resp: Yup.string().required('O casal responsável é obrigatório'),
        data: Yup.string().required('A data de fundação é obrigatória'),
        ligacao: Yup.string().required('O casal ligação é obrigatório'),
        pilotagem: Yup.bool(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (!picture && !CEquipe) {
        toast.error('É necessário inserir imagem na equipe');
        return;
      }

      const formData = new FormData();
      if (picture) {
        formData.append('file', picture[0]);
      }

      formData.append('Equipe_Nome', data.nome);
      formData.append('Equipe_Descricao', data.descricao);
      formData.append('Equipe_PadroeiraID', data.padroeira);
      formData.append('Equipe_ConselheiroIDMENS', data.conselheiro);
      formData.append('Equipe_CasalRespAtualIDMENS', data.resp);
      formData.append('Equipe_DataFundacao', data.data);
      formData.append('Equipe_CasalLigacaoAtualIDMENS', data.ligacao);
      formData.append('Equipe_NecessRepilotagem', data.pilotagem ? 'S' : 'N');
      formData.append('Equipe_SetorID', 1);
      formData.append('Equipe_Historico', text);

      if (CEquipe) {
        api
          .post(`/equipe/${CEquipe.id}`, formData)
          .then((res) => {
            toast.info(res.data.message);
            history.push('/equipeadm');
          })
          .catch((err) => {
            toast.error(err.data.message);
          });
      } else {
        api
          .post('/equipe', formData)
          .then((res) => {
            toast.info(res.data.message);
            history.push('/equipeadm');
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
          <Title back="/equipeadm">Cadastro de Equipe</Title>
        </TitleDiv>
        <FormDiv>
          <FormInputs
            ref={formRef}
            initialData={CEquipe}
            onSubmit={handleSubmit}
          >
            <Label>Nome da equipe</Label>
            <InputTexto name="nome" placeholder="Digite o nome da equipe" />
            <Label>Descrição da equipe</Label>
            <InputTexto
              name="descricao"
              placeholder="Digite a descrição da equipe"
            />
            <Label>Padroeira da equipe</Label>
            <InputSelect name="padroeira" opcoes={padroeira} />
            <Label>Conselheiro da equipe</Label>
            <InputSelect name="conselheiro" opcoes={conselheiro} />
            <Label>Casal responsável pela equipe</Label>
            <InputSelect name="resp" opcoes={casal} />
            <Label>Casal ligação da equipe</Label>
            <InputSelect name="ligacao" opcoes={casal} />
            <Label>Data de fundação</Label>
            <InputDate name="data" />
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
            <InputSwitch label="Necessida de repilotagem" name="pilotagem" />
            <Label>Histórico da equipe</Label>
            <CKEditor
              editor={ClassicEditor}
              config={{ placeholder: 'Digite o histórico da equipe' }}
              data={CEquipe ? CEquipe.text : ''}
              onChange={(event, editor) => {
                const data = editor.getData();
                setText(data);
              }}
            />
            <Button type="submit">Enviar</Button>
          </FormInputs>
        </FormDiv>
      </Container>
    </>
  );
}

export default EquipeCadastro;
