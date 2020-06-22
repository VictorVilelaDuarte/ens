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
import InputSwitch from '../../components/InputSwitch';
import InputDate from '../../components/InputDate';
import InputTime from '../../components/InputTime';
import InputSelect from '../../components/InputSelect';
import Button from '../../components/Button';

import { Container, FormDiv, TitleDiv, FormInputs, Label } from './styles';

function EventoCadastro({ match }) {
  const formRef = useRef(null);
  const [text, setText] = useState('');
  const [picture, setPicture] = useState();
  const [optionsTipo, setOptionsTipo] = useState([]);
  const [CConselheiro, setCConselheiro] = useState();

  useEffect(() => {
    const { conselheiro } = match.params;
    function getCConselheiro() {
      api
        .get(`/conselheiro/${conselheiro}`)
        .then((res) => {
          const response = res.data.data[0];
          const CConselheiroOBJ = {
            idmens: response.Conselheiro_IDMENS,
            id: response.Conselheiro_ID,
            nome: response.Conselheiro_Nome,
            email: response.Conselheiro_Email,
            celular: response.Conselheiro_TelCel,
            telefone: response.Conselheiro_TelRes,
            comercial: response.Conselheiro_TelCom,
            endereco: response.Conselheiro_Endereco,
            paroquia: response.Conselheiro_Paroquia,
            nascimento: response.Conselheiro_DataNascimento,
            ordenacao: response.Conselheiro_DataOrdenacao,
            ingresso: response.Conselheiro_AnoIngressoEquipe,
            funcao: response.Conselheiro_FuncaoID,
            perfil: response.Conselheiro_Perfil,
            text: response.Conselheiro_Historico,
            picture: [response.Conselheiro_Imagem],
          };
          setCConselheiro(CConselheiroOBJ);
          setText(CConselheiroOBJ.text);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (conselheiro) {
      getCConselheiro();
    }
  }, []);

  function onDrop(Cpicture) {
    setPicture(Cpicture);
  }

  async function handleSubmit(data) {
    console.log(data);

    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        idmens: Yup.number()
          .typeError('O IDMENS deve ser apenas números')
          .test(
            'len',
            'O IDMENS deve ter 12 números',
            (val) => val.toString().length === 12
          )
          .required('O IDMENS é obrigatório'),
        id: Yup.number()
          .typeError('O ID deve ser apenas números')
          .required('O ID é obrigatório'),
        nome: Yup.string().required('O nome do conselheiro é obrigatório'),
        email: Yup.string().required('O e-mail do conselheiro é obrigatório'),
        celular: Yup.string().required(
          'O celular do conselheiro é obrigatório'
        ),
        telefone: Yup.string(),
        comercial: Yup.string(),
        endereco: Yup.string().required(
          'O endereço do conselheiro é obrigatório'
        ),
        paroquia: Yup.string().required(
          'A paróquia do conselheiro é obrigatória'
        ),
        nascimento: Yup.string().required(
          'A data de nascimento do conselheiro é obrigatória'
        ),
        ordenacao: Yup.string().required(
          'A data de ordenacao do conselheiro é obrigatória'
        ),
        ingresso: Yup.string().required(
          'A data de ingresso do conselheiro é obrigatória'
        ),
        funcao: Yup.string().required('A função do conselheiro é obrigatória'),
        perfil: Yup.string().required('O perfil do conselheiro é obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (!picture && !CConselheiro) {
        toast.error('É necessário inserir imagem para o conselheiro');
        return;
      }

      const formData = new FormData();
      if (picture) {
        formData.append('file', picture[0]);
      }

      formData.append('idmens', data.idmens);
      formData.append('id', data.id);
      formData.append('nome', data.nome);
      formData.append('email', data.email);
      formData.append('celular', data.celular);
      formData.append('telefone', data.telefone);
      formData.append('comercial', data.comercial);
      formData.append('endereco', data.endereco);
      formData.append('paroquia', data.paroquia);
      formData.append('nascimento', data.nascimento);
      formData.append('ordenacao', data.ordenacao);
      formData.append('ingresso', data.ingresso);
      formData.append('funcao', data.funcao);
      formData.append('perfil', data.perfil);
      formData.append('text', text);

      if (CConselheiro) {
        api
          .post(`/conselheiro/${CConselheiro.idmens}`, formData)
          .then((res) => {
            toast.info(res.data.message);
            history.push('/conselheiroadm');
          })
          .catch((err) => {
            toast.error(err.data.message);
          });
      } else {
        api
          .post('/conselheiro', formData)
          .then((res) => {
            toast.info(res.data.message);
            history.push('/conselheiroadm');
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
          <Title back="/conselheiroadm">Cadastro de conselheiro</Title>
        </TitleDiv>
        <FormDiv>
          {console.log(CConselheiro)}
          <FormInputs
            ref={formRef}
            initialData={CConselheiro}
            onSubmit={handleSubmit}
          >
            <Label>IDMENS do conselheiro</Label>
            <InputTexto
              name="idmens"
              placeholder="Digite o idmens do conselheiro"
              disabled={!!CConselheiro}
              max
            />
            <Label>ID do conselheiro</Label>
            <InputTexto
              name="id"
              placeholder="Digite o id do conselheiro"
              disabled={!!CConselheiro}
            />
            <Label>Nome do conselheiro</Label>
            <InputTexto
              name="nome"
              placeholder="Digite o nome do conselheiro"
            />
            <Label>E-mail do conselheiro</Label>
            <InputTexto
              name="email"
              placeholder="Digite o e-mail do conselheiro"
            />
            <Label>Celular do conselheiro</Label>
            <InputTexto
              name="celular"
              placeholder="Digite o celular do conselheiro"
            />
            <Label>Telefone do conselheiro</Label>
            <InputTexto
              name="telefone"
              placeholder="Digite o telefone do conselheiro"
            />
            <Label>Telefone comercial do conselheiro</Label>
            <InputTexto
              name="comercial"
              placeholder="Digite o telefone comercial do conselheiro"
            />
            <Label>Endereço do conselheiro</Label>
            <InputTexto
              name="endereco"
              placeholder="Digite o endereco do conselheiro"
            />
            <Label>Paroquia do conselheiro</Label>
            <InputTexto
              name="paroquia"
              placeholder="Digite a paroquia do conselheiro"
            />
            <Label>Data de nascimento do conselheiro</Label>
            <InputDate name="nascimento" />
            <Label>Data de ordenação do conselheiro</Label>
            <InputDate name="ordenacao" />
            <Label>Data de ano ingresso a equipe do conselheiro</Label>
            <InputDate name="ingresso" />
            <Label>Função</Label>
            <InputSelect
              name="funcao"
              opcoes={[
                { value: 1, label: '(SCE) Sacerdote Conselheiro Espiritual' },
                { value: 2, label: '(CE) Conselheiro Espiritual' },
                { value: 3, label: '(CS) Conselheiro Espiritual do Setor' },
              ]}
            />
            <Label>Perfil do conselheiro</Label>
            <InputTexto
              name="perfil"
              placeholder="Digite o perfil do conselheiro"
            />
            <ImageUploader
              defaultImages={CConselheiro ? CConselheiro.picture : ''}
              withIcon
              withPreview
              singleImage
              label="Escolha imagem do conselheiro (até 5Mb)"
              buttonText="Escolher imagem"
              onChange={onDrop}
              imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
              maxFileSize={5242880}
            />
            <Label>Histórico do conselheiro</Label>
            <CKEditor
              editor={ClassicEditor}
              config={{ placeholder: 'Digite o histórico do conselheiro' }}
              data={CConselheiro ? CConselheiro.text : ''}
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

export default EventoCadastro;
