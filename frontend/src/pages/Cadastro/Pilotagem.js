import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import api from '../../services/api';
import history from '../../services/history';

import Title from '../../components/Title';
import InputDate from '../../components/InputDate';
import InputTexto from '../../components/InputTexto';
import Button from '../../components/Button';

import { Container, FormDiv, TitleDiv, FormInputs, Label } from './styles';

function PilotagemCadastro({ match }) {
  const formRef = useRef(null);
  const [CPilotagem, setCPilotagem] = useState({});

  useEffect(() => {
    const { pilotagem } = match.params;

    api
      .get(`/pilotagem/${pilotagem}`)
      .then((res) => {
        const response = res.data.data[0];
        setCPilotagem(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        Pilot_IDMENS: Yup.string()
          .required('O IDMENS é obrigatório')
          .length(12, 'O IDMENS deve ter 12 dígitos'),
        Pilot_HomemID: Yup.string().required('O ID do homem é obrigatório'),
        Pilot_HomemNome: Yup.string().required('O nome do homem é obrigatório'),
        Pilot_HomemEmail: Yup.string().required(
          'O e-mail do homem é obrigatório'
        ),
        Pilot_HomemTelCel: Yup.string().required(
          'O celular do homem é obrigatório'
        ),
        Pilot_HomemTelCom: Yup.string(),
        Pilot_HomemDataNascimento: Yup.string().required(
          'A data de nascimento do homem é obrigatória'
        ),
        Pilot_MulherID: Yup.string().required('O ID da mulher é obrigatório'),
        Pilot_MulherNome: Yup.string().required(
          'O nome da mulher é obrigatório'
        ),
        Pilot_MulherEmail: Yup.string().required(
          'O e-mail da mulher é obrigatório'
        ),
        Pilot_MulherTelCel: Yup.string().required(
          'O celular da mulher é obrigatório'
        ),
        Pilot_MulherTelCom: Yup.string(),
        Pilot_MulherDataNascimento: Yup.string().required(
          'A data de nascimento da mulher é obrigatória'
        ),
        Pilot_Nome: Yup.string().required('O nome do casal é obrigatório'),
        Pilot_DataCasamento: Yup.string().required(
          'A data de casamento do casal é obrigatória'
        ),
        Pilot_ParoquiaCasamento: Yup.string().required(
          'A paróquia do casal é obrigatória'
        ),
        Pilot_IgrejaCasamento: Yup.string().required(
          'A igreja do casal é obrigatória'
        ),
        Pilot_Endereco: Yup.string().required(
          'O endereço do casal é obrigatório'
        ),
        Pilot_EndBairro: Yup.string().required(
          'O bairro do casal é obrigatório'
        ),
        Pilot_EndCEP: Yup.string().required('O CEP do casal é obrigatório'),
        Pilot_Cidade: Yup.string().required('A cidade do casal é obrigatória'),
        Pilot_Estado: Yup.string().required('O estado do casal é obrigatório'),
        Pilot_Pais: Yup.string().required('O país do casal é obrigatório'),
        Pilot_TelResid: Yup.string(),
        Pilot_DataInicioENS: Yup.string().required(
          'A data de inicio é obrigatória'
        ),
        Pilot_NomeFilho1: Yup.string(),
        Pilot_DataNascFilho1: Yup.string(),
        Pilot_NomeFilho2: Yup.string(),
        Pilot_DataNascFilho2: Yup.string(),
        Pilot_NomeFilho3: Yup.string(),
        Pilot_DataNascFilho3: Yup.string(),
        Pilot_NomeFilho4: Yup.string(),
        Pilot_DataNascFilho4: Yup.string(),
        Pilot_NomeFilho5: Yup.string(),
        Pilot_DataNascFilho5: Yup.string(),
        Pilot_ExpComID: Yup.string(),
        Pilot_AnoExpCom: Yup.string(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const json = {
        Pilot_IDMENS: data.Pilot_IDMENS,
        Pilot_HomemID: data.Pilot_HomemID,
        Pilot_HomemNome: data.Pilot_HomemNome,
        Pilot_HomemEmail: data.Pilot_HomemEmail,
        Pilot_HomemTelCel: data.Pilot_HomemTelCel,
        Pilot_HomemTelCom: data.Pilot_HomemTelCom,
        Pilot_HomemDataNascimento: data.Pilot_HomemDataNascimento,
        Pilot_MulherID: data.Pilot_MulherID,
        Pilot_MulherNome: data.Pilot_MulherNome,
        Pilot_MulherEmail: data.Pilot_MulherEmail,
        Pilot_MulherTelCel: data.Pilot_MulherTelCel,
        Pilot_MulherTelCom: data.Pilot_MulherTelCom,
        Pilot_MulherDataNascimento: data.Pilot_MulherDataNascimento,
        Pilot_Nome: data.Pilot_Nome,
        Pilot_DataCasamento: data.Pilot_DataCasamento,
        Pilot_ParoquiaCasamento: data.Pilot_ParoquiaCasamento,
        Pilot_IgrejaCasamento: data.Pilot_IgrejaCasamento,
        Pilot_Endereco: data.Pilot_Endereco,
        Pilot_EndBairro: data.Pilot_EndBairro,
        Pilot_EndCEP: data.Pilot_EndCEP,
        Pilot_Cidade: data.Pilot_Cidade,
        Pilot_Estado: data.Pilot_Estado,
        Pilot_Pais: data.Pilot_Pais,
        Pilot_TelResid: data.Pilot_TelResid,
        Pilot_DataInicioENS: data.Pilot_DataInicioENS,
        Pilot_NomeFilho1: data.Pilot_NomeFilho1 ? data.Pilot_NomeFilho1 : null,
        Pilot_DataNascFilho1: data.Pilot_DataNascFilho1
          ? data.Pilot_DataNascFilho1
          : null,
        Pilot_NomeFilho2: data.Pilot_NomeFilho2 ? data.Pilot_NomeFilho2 : null,
        Pilot_DataNascFilho2: data.Pilot_DataNascFilho2
          ? data.Pilot_DataNascFilho2
          : null,
        Pilot_NomeFilho3: data.Pilot_NomeFilho3 ? data.Pilot_NomeFilho3 : null,
        Pilot_DataNascFilho3: data.Pilot_DataNascFilho3
          ? data.Pilot_DataNascFilho3
          : null,
        Pilot_NomeFilho4: data.Pilot_NomeFilho4 ? data.Pilot_NomeFilho4 : null,
        Pilot_DataNascFilho4: data.Pilot_DataNascFilho4
          ? data.Pilot_DataNascFilho4
          : null,
        Pilot_NomeFilho5: data.Pilot_NomeFilho5 ? data.Pilot_NomeFilho5 : null,
        Pilot_DataNascFilho5: data.Pilot_DataNascFilho5
          ? data.Pilot_DataNascFilho5
          : null,
        Pilot_ExpComID: data.Pilot_ExpComID ? data.Pilot_ExpComID : null,
        Pilot_AnoExpCom: data.Pilot_AnoExpCom ? data.Pilot_AnoExpCom : null,
      };

      if (CPilotagem) {
        api
          .put(`/pilotagem/${CPilotagem.IDMENS}`, json)
          .then((res) => {
            toast.info(res.data.message);
            history.push('/pilotagemadm');
          })
          .catch((err) => {
            toast.error(err.data.message);
          });
      } else {
        api
          .post('/pilotagem', json)
          .then((res) => {
            toast.info(res.data.message);
            history.push('/pilotagemadm');
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
          <Title back="/pilotagemadm">Cadastro de casal pilotagem</Title>
        </TitleDiv>
        <FormDiv>
          <FormInputs
            ref={formRef}
            initialData={CPilotagem}
            onSubmit={handleSubmit}
          >
            <Label>IDMENS</Label>
            <InputTexto
              name="Pilot_IDMENS"
              type="number"
              placeholder="Digite o IDMENS do casal"
            />
            <Label>ID homem</Label>
            <InputTexto
              name="Pilot_HomemID"
              type="number"
              placeholder="Digite o ID do homem"
            />
            <Label>Nome do homem</Label>
            <InputTexto
              name="Pilot_HomemNome"
              placeholder="Digite o nome do homem"
            />
            <Label>E-mail do homem</Label>
            <InputTexto
              name="Pilot_HomemEmail"
              type="mail"
              placeholder="Digite o e-mail do homem"
            />
            <Label>Celular do homem</Label>
            <InputTexto
              name="Pilot_HomemTelCel"
              placeholder="Digite o celular do homem"
            />
            <Label>Telefone homem</Label>
            <InputTexto
              name="Pilot_HomemTelCom"
              placeholder="Digite o telefone do homem"
            />
            <Label>Data de nascimento do homem</Label>
            <InputDate name="Pilot_HomemDataNascimento" />
            <hr />
            <Label>ID Mulher</Label>
            <InputTexto
              name="Pilot_MulherID"
              type="number"
              placeholder="Digite o ID da mulher"
            />
            <Label>Nome da mulher</Label>
            <InputTexto
              name="Pilot_MulherNome"
              placeholder="Digite o nome da mulher"
            />
            <Label>E-mail da mulher</Label>
            <InputTexto
              name="Pilot_MulherEmail"
              type="mail"
              placeholder="Digite o e-mail da mulher"
            />
            <Label>Celular da mulher</Label>
            <InputTexto
              name="Pilot_MulherTelCel"
              placeholder="Digite o celular da mulher"
            />
            <Label>Telefone da mulher</Label>
            <InputTexto
              name="Pilot_MulherTelCom"
              placeholder="Digite o telefone da mulher"
            />
            <Label>Data de nascimento da mulher</Label>
            <InputDate name="Pilot_MulherDataNascimento" />
            <hr />
            <Label>Nome do casal</Label>
            <InputTexto
              name="Pilot_Nome"
              placeholder="Digite o nome do casal"
            />
            <Label>Data de casamento</Label>
            <InputDate name="Pilot_DataCasamento" />
            <Label>Paróquia do casamento</Label>
            <InputTexto
              name="Pilot_ParoquiaCasamento"
              placeholder="Digite a paróquia do casamento"
            />
            <Label>Igreja do casamento</Label>
            <InputTexto
              name="Pilot_IgrejaCasamento"
              placeholder="Digite a igreja do casamento"
            />
            <Label>Endereço do casal</Label>
            <InputTexto
              name="Pilot_Endereco"
              placeholder="Digite o endereço do casal"
            />
            <Label>Bairro do casal</Label>
            <InputTexto
              name="Pilot_EndBairro"
              placeholder="Digite o bairro do casal"
            />
            <Label>CEP do casal</Label>
            <InputTexto
              name="Pilot_EndCEP"
              placeholder="Digite o CEP do casal"
            />
            <Label>Cidade do casal</Label>
            <InputTexto
              name="Pilot_Cidade"
              placeholder="Digite a cidade do casal"
            />
            <Label>Estado do casal</Label>
            <InputTexto
              name="Pilot_Estado"
              placeholder="Digite o estado do casal"
            />
            <Label>País do casal</Label>
            <InputTexto
              name="Pilot_Pais"
              placeholder="Digite o país do casal"
            />
            <Label>Telefone residencial do casal</Label>
            <InputTexto
              name="Pilot_TelResid"
              placeholder="Digite o telefone do casal"
            />
            <Label>Data de inicio ENS</Label>
            <InputDate name="Pilot_DataInicioENS" />
            <Label>Nome do filho 1</Label>
            <InputTexto
              name="Pilot_NomeFilho1"
              placeholder="Digite o nome do primeiro filho do casal"
            />
            <Label>Data de nascimento filho 1</Label>
            <InputDate name="Pilot_DataNascFilho1" />
            <Label>Nome do filho 2</Label>
            <InputTexto
              name="Pilot_NomeFilho2"
              placeholder="Digite o nome do segundo filho do casal"
            />
            <Label>Data de nascimento filho 2</Label>
            <InputDate name="Pilot_DataNascFilho2" />
            <Label>Nome do filho 3</Label>
            <InputTexto
              name="Pilot_NomeFilho3"
              placeholder="Digite o nome do terceiro filho do casal"
            />
            <Label>Data de nascimento filho 3</Label>
            <InputDate name="Pilot_DataNascFilho3" />
            <Label>Nome do filho 4</Label>
            <InputTexto
              name="Pilot_NomeFilho4"
              placeholder="Digite o nome do quarto filho do casal"
            />
            <Label>Data de nascimento filho 4</Label>
            <InputDate name="Pilot_DataNascFilho4" />
            <Label>Nome do filho 5</Label>
            <InputTexto
              name="Pilot_NomeFilho5"
              placeholder="Digite o nome do quinto filho do casal"
            />
            <Label>Data de nascimento filho 5</Label>
            <InputDate name="Pilot_DataNascFilho5" />
            <Label>Casal ano Expcom</Label>
            <InputTexto
              name="Pilot_ExpComID"
              placeholder="Digite o Expcom do casal"
            />
            <Label>Data de Expcom do casal</Label>
            <InputDate name="Pilot_AnoExpCom" />

            <Button type="submit">Enviar</Button>
          </FormInputs>
        </FormDiv>
      </Container>
    </>
  );
}

export default PilotagemCadastro;
