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

function CasalagemCadastro({ match }) {
  const formRef = useRef(null);
  const [CCasal, setCCasal] = useState({});

  useEffect(() => {
    const { idmens } = match.params;
    if (idmens) {
      api
        .get(`/casalBusca/${idmens}`)
        .then((res) => {
          const response = res.data.data[0];
          setCCasal(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        Casal_IDMENS: Yup.string()
          .required('O IDMENS é obrigatório')
          .length(12, 'O IDMENS deve ter 12 dígitos'),
        Casal_HomemID: Yup.string().required('O ID do homem é obrigatório'),
        Casal_HomemNome: Yup.string().required('O nome do homem é obrigatório'),
        Casal_HomemEmail: Yup.string().required(
          'O e-mail do homem é obrigatório'
        ),
        Casal_HomemTelCel: Yup.string().required(
          'O celular do homem é obrigatório'
        ),
        Casal_HomemTelCom: Yup.string(),
        Casal_HomemDataNascimento: Yup.string().required(
          'A data de nascimento do homem é obrigatória'
        ),
        Casal_MulherID: Yup.string().required('O ID da mulher é obrigatório'),
        Casal_MulherNome: Yup.string().required(
          'O nome da mulher é obrigatório'
        ),
        Casal_MulherEmail: Yup.string().required(
          'O e-mail da mulher é obrigatório'
        ),
        Casal_MulherTelCel: Yup.string().required(
          'O celular da mulher é obrigatório'
        ),
        Casal_MulherTelCom: Yup.string(),
        Casal_MulherDataNascimento: Yup.string().required(
          'A data de nascimento da mulher é obrigatória'
        ),
        Casal_Nome: Yup.string().required('O nome do casal é obrigatório'),
        Casal_DataCasamento: Yup.string().required(
          'A data de casamento do casal é obrigatória'
        ),
        Casal_ParoquiaCasamento: Yup.string().required(
          'A paróquia do casal é obrigatória'
        ),
        Casal_IgrejaCasamento: Yup.string().required(
          'A igreja do casal é obrigatória'
        ),
        Casal_Endereco: Yup.string().required(
          'O endereço do casal é obrigatório'
        ),
        Casal_EndBairro: Yup.string().required(
          'O bairro do casal é obrigatório'
        ),
        Casal_EndCEP: Yup.string().required('O CEP do casal é obrigatório'),
        Casal_Cidade: Yup.string().required('A cidade do casal é obrigatória'),
        Casal_Estado: Yup.string().required('O estado do casal é obrigatório'),
        Casal_Pais: Yup.string().required('O país do casal é obrigatório'),
        Casal_TelResid: Yup.string(),
        Casal_DataInicioENS: Yup.string().required(
          'A data de inicio é obrigatória'
        ),
        Casal_NomeFilho1: Yup.string(),
        Casal_DataNascFilho1: Yup.string(),
        Casal_NomeFilho2: Yup.string(),
        Casal_DataNascFilho2: Yup.string(),
        Casal_NomeFilho3: Yup.string(),
        Casal_DataNascFilho3: Yup.string(),
        Casal_NomeFilho4: Yup.string(),
        Casal_DataNascFilho4: Yup.string(),
        Casal_NomeFilho5: Yup.string(),
        Casal_DataNascFilho5: Yup.string(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const json = {
        Casal_IDMENS: data.Casal_IDMENS,
        Casal_HomemID: data.Casal_HomemID,
        Casal_HomemNome: data.Casal_HomemNome,
        Casal_HomemEmail: data.Casal_HomemEmail ? data.Casal_HomemEmail : null,
        Casal_HomemTelCel: data.Casal_HomemTelCel
          ? data.Casal_HomemTelCel
          : null,
        Casal_HomemTelCom: data.Casal_HomemTelCom,
        Casal_HomemDataNascimento: data.Casal_HomemDataNascimento,
        Casal_MulherID: data.Casal_MulherID,
        Casal_MulherNome: data.Casal_MulherNome,
        Casal_MulherEmail: data.Casal_MulherEmail
          ? data.Casal_MulherEmail
          : null,
        Casal_MulherTelCel: data.Casal_MulherTelCel
          ? data.Casal_MulherTelCel
          : null,
        Casal_MulherTelCom: data.Casal_MulherTelCom,
        Casal_MulherDataNascimento: data.Casal_MulherDataNascimento,
        Casal_Nome: data.Casal_Nome,
        Casal_DataCasamento: data.Casal_DataCasamento,
        Casal_ParoquiaCasamento: data.Casal_ParoquiaCasamento,
        Casal_IgrejaCasamento: data.Casal_IgrejaCasamento,
        Casal_Endereco: data.Casal_Endereco,
        Casal_EndBairro: data.Casal_EndBairro,
        Casal_EndCEP: data.Casal_EndCEP,
        Casal_Cidade: data.Casal_Cidade,
        Casal_Estado: data.Casal_Estado,
        Casal_Pais: data.Casal_Pais,
        Casal_TelResid: data.Casal_TelResid ? data.Casal_TelResid : null,
        Casal_DataInicioENS: data.Casal_DataInicioENS,
        Casal_NomeFilho1: data.Casal_NomeFilho1 ? data.Casal_NomeFilho1 : null,
        Casal_DataNascFilho1: data.Casal_DataNascFilho1
          ? data.Casal_DataNascFilho1
          : null,
        Casal_NomeFilho2: data.Casal_NomeFilho2 ? data.Casal_NomeFilho2 : null,
        Casal_DataNascFilho2: data.Casal_DataNascFilho2
          ? data.Casal_DataNascFilho2
          : null,
        Casal_NomeFilho3: data.Casal_NomeFilho3 ? data.Casal_NomeFilho3 : null,
        Casal_DataNascFilho3: data.Casal_DataNascFilho3
          ? data.Casal_DataNascFilho3
          : null,
        Casal_NomeFilho4: data.Casal_NomeFilho4 ? data.Casal_NomeFilho4 : null,
        Casal_DataNascFilho4: data.Casal_DataNascFilho4
          ? data.Casal_DataNascFilho4
          : null,
        Casal_NomeFilho5: data.Casal_NomeFilho5 ? data.Casal_NomeFilho5 : null,
        Casal_DataNascFilho5: data.Casal_DataNascFilho5
          ? data.Casal_DataNascFilho5
          : null,
      };

      api
        .put(`/casal/${CCasal.Casal_IDMENS}`, json)
        .then((res) => {
          toast.info(res.data.message);
          history.push('/quadranteadm');
        })
        .catch((err) => {
          toast.error(err.data.message);
        });
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
          <Title back="/quadranteadm">Edição de casal</Title>
        </TitleDiv>
        <FormDiv>
          <FormInputs
            ref={formRef}
            initialData={CCasal}
            onSubmit={handleSubmit}
          >
            <Label>IDMENS</Label>
            <InputTexto
              name="Casal_IDMENS"
              type="number"
              placeholder="Digite o IDMENS do casal"
              disabled
            />
            <Label>ID homem</Label>
            <InputTexto
              name="Casal_HomemID"
              type="number"
              placeholder="Digite o ID do homem"
            />
            <Label>Nome do homem</Label>
            <InputTexto
              name="Casal_HomemNome"
              placeholder="Digite o nome do homem"
            />
            <Label>E-mail do homem</Label>
            <InputTexto
              name="Casal_HomemEmail"
              type="mail"
              placeholder="Digite o e-mail do homem"
            />
            <Label>Celular do homem</Label>
            <InputTexto
              name="Casal_HomemTelCel"
              placeholder="Digite o celular do homem"
            />
            <Label>Telefone homem</Label>
            <InputTexto
              name="Casal_HomemTelCom"
              placeholder="Digite o telefone do homem"
            />
            <Label>Data de nascimento do homem</Label>
            <InputDate name="Casal_HomemDataNascimento" />
            <hr />
            <Label>ID Mulher</Label>
            <InputTexto
              name="Casal_MulherID"
              type="number"
              placeholder="Digite o ID da mulher"
            />
            <Label>Nome da mulher</Label>
            <InputTexto
              name="Casal_MulherNome"
              placeholder="Digite o nome da mulher"
            />
            <Label>E-mail da mulher</Label>
            <InputTexto
              name="Casal_MulherEmail"
              type="mail"
              placeholder="Digite o e-mail da mulher"
            />
            <Label>Celular da mulher</Label>
            <InputTexto
              name="Casal_MulherTelCel"
              placeholder="Digite o celular da mulher"
            />
            <Label>Telefone da mulher</Label>
            <InputTexto
              name="Casal_MulherTelCom"
              placeholder="Digite o telefone da mulher"
            />
            <Label>Data de nascimento da mulher</Label>
            <InputDate name="Casal_MulherDataNascimento" />
            <hr />
            <Label>Nome do casal</Label>
            <InputTexto
              name="Casal_Nome"
              placeholder="Digite o nome do casal"
            />
            <Label>Data de casamento</Label>
            <InputDate name="Casal_DataCasamento" />
            <Label>Paróquia do casamento</Label>
            <InputTexto
              name="Casal_ParoquiaCasamento"
              placeholder="Digite a paróquia do casamento"
            />
            <Label>Igreja do casamento</Label>
            <InputTexto
              name="Casal_IgrejaCasamento"
              placeholder="Digite a igreja do casamento"
            />
            <Label>Endereço do casal</Label>
            <InputTexto
              name="Casal_Endereco"
              placeholder="Digite o endereço do casal"
            />
            <Label>Bairro do casal</Label>
            <InputTexto
              name="Casal_EndBairro"
              placeholder="Digite o bairro do casal"
            />
            <Label>CEP do casal</Label>
            <InputTexto
              name="Casal_EndCEP"
              placeholder="Digite o CEP do casal"
            />
            <Label>Cidade do casal</Label>
            <InputTexto
              name="Casal_Cidade"
              placeholder="Digite a cidade do casal"
            />
            <Label>Estado do casal</Label>
            <InputTexto
              name="Casal_Estado"
              placeholder="Digite o estado do casal"
            />
            <Label>País do casal</Label>
            <InputTexto
              name="Casal_Pais"
              placeholder="Digite o país do casal"
            />
            <Label>Telefone residencial do casal</Label>
            <InputTexto
              name="Casal_TelResid"
              placeholder="Digite o telefone do casal"
            />
            <Label>Data de inicio ENS</Label>
            <InputDate name="Casal_DataInicioENS" />
            <Label>Nome do filho 1</Label>
            <InputTexto
              name="Casal_NomeFilho1"
              placeholder="Digite o nome do primeiro filho do casal"
            />
            <Label>Data de nascimento filho 1</Label>
            <InputDate name="Casal_DataNascFilho1" />
            <Label>Nome do filho 2</Label>
            <InputTexto
              name="Casal_NomeFilho2"
              placeholder="Digite o nome do segundo filho do casal"
            />
            <Label>Data de nascimento filho 2</Label>
            <InputDate name="Casal_DataNascFilho2" />
            <Label>Nome do filho 3</Label>
            <InputTexto
              name="Casal_NomeFilho3"
              placeholder="Digite o nome do terceiro filho do casal"
            />
            <Label>Data de nascimento filho 3</Label>
            <InputDate name="Casal_DataNascFilho3" />
            <Label>Nome do filho 4</Label>
            <InputTexto
              name="Casal_NomeFilho4"
              placeholder="Digite o nome do quarto filho do casal"
            />
            <Label>Data de nascimento filho 4</Label>
            <InputDate name="Casal_DataNascFilho4" />
            <Label>Nome do filho 5</Label>
            <InputTexto
              name="Casal_NomeFilho5"
              placeholder="Digite o nome do quinto filho do casal"
            />
            <Label>Data de nascimento filho 5</Label>
            <InputDate name="Casal_DataNascFilho5" />

            <Button type="submit">Enviar</Button>
          </FormInputs>
        </FormDiv>
      </Container>
    </>
  );
}

export default CasalagemCadastro;
