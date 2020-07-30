import bd from '../../config/database';

class CasalController {
  listaOpcao(req, res) {
    bd.query(
      `SELECT Casal_IDMENS, Casal_Nome FROM ens_casal`,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível buscar os casais.',
          });
        }
        return res.status(200).json({
          status: true,
          data: result,
        });
      }
    );
  }

  lista(req, res) {
    const { equipe } = req.params;
    bd.query(
      `SELECT * FROM ens_casal WHERE Casal_EquipeID = ${equipe}`,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possísvel buscar os casais.',
          });
        }
        return res.status(200).json({
          status: true,
          data: result,
        });
      }
    );
  }

  busca(req, res) {
    const { idmens } = req.params;
    bd.query(
      `SELECT * FROM ens_casal WHERE Casal_IDMENS=${idmens}`,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível buscar o casal.',
          });
        }
        return res.status(200).json({
          status: true,
          data: result,
        });
      }
    );
  }

  altera(req, res) {
    const { idmens } = req.params;

    const {
      Casal_HomemID,
      Casal_HomemNome,
      Casal_HomemEmail,
      Casal_HomemTelCel,
      Casal_HomemTelCom,
      Casal_HomemDataNascimento,
      Casal_MulherID,
      Casal_MulherNome,
      Casal_MulherEmail,
      Casal_MulherTelCel,
      Casal_MulherTelCom,
      Casal_MulherDataNascimento,
      Casal_Nome,
      Casal_DataCasamento,
      Casal_ParoquiaCasamento,
      Casal_IgrejaCasamento,
      Casal_Endereco,
      Casal_EndBairro,
      Casal_EndCEP,
      Casal_Cidade,
      Casal_Estado,
      Casal_Pais,
      Casal_TelResid,
      Casal_DataInicioENS,
      Casal_NomeFilho1,
      Casal_DataNascFilho1,
      Casal_NomeFilho2,
      Casal_DataNascFilho2,
      Casal_NomeFilho3,
      Casal_DataNascFilho3,
      Casal_NomeFilho4,
      Casal_DataNascFilho4,
      Casal_NomeFilho5,
      Casal_DataNascFilho5,
    } = req.body;

    bd.query(
      `UPDATE ens_casal
    SET
    Casal_HomemID = '${Casal_HomemID}',
    Casal_HomemNome = '${Casal_HomemNome}',
    Casal_HomemEmail = '${Casal_HomemEmail}',
    Casal_HomemTelCel = '${Casal_HomemTelCel}',
    Casal_HomemTelCom = '${Casal_HomemTelCom}',
    Casal_HomemDataNascimento = '${Casal_HomemDataNascimento}',
    Casal_MulherID = '${Casal_MulherID}',
    Casal_MulherNome = '${Casal_MulherNome}',
    Casal_MulherEmail = '${Casal_MulherEmail}',
    Casal_MulherTelCel = '${Casal_MulherTelCel}',
    Casal_MulherTelCom = '${Casal_MulherTelCom}',
    Casal_MulherDataNascimento = '${Casal_MulherDataNascimento}',
    Casal_Nome = '${Casal_Nome}',
    Casal_DataCasamento = '${Casal_DataCasamento}',
    Casal_ParoquiaCasamento = '${Casal_ParoquiaCasamento}',
    Casal_IgrejaCasamento = '${Casal_IgrejaCasamento}',
    Casal_Endereco = '${Casal_Endereco}',
    Casal_EndBairro = '${Casal_EndBairro}',
    Casal_EndCEP = '${Casal_EndCEP}',
    Casal_Cidade = '${Casal_Cidade}',
    Casal_Estado = '${Casal_Estado}',
    Casal_Pais = '${Casal_Pais}',
    Casal_TelResid = ${Casal_TelResid ? `'${Casal_TelResid}'` : null},
    Casal_DataInicioENS = '${Casal_DataInicioENS}',
    Casal_NomeFilho1 = ${Casal_NomeFilho1 ? `'${Casal_NomeFilho1}'` : null},
    Casal_DataNascFilho1 = ${
      Casal_DataNascFilho1 ? `'${Casal_DataNascFilho1}'` : null
    },
    Casal_NomeFilho2 = ${Casal_NomeFilho2 ? `'${Casal_NomeFilho2}'` : null},
    Casal_DataNascFilho2 = ${
      Casal_DataNascFilho2 ? `'${Casal_DataNascFilho2}'` : null
    },
    Casal_NomeFilho3 = ${Casal_NomeFilho3 ? `'${Casal_NomeFilho3}'` : null},
    Casal_DataNascFilho3 = ${
      Casal_DataNascFilho3 ? `'${Casal_DataNascFilho3}'` : null
    },
    Casal_NomeFilho4 = ${Casal_NomeFilho4 ? `'${Casal_NomeFilho4}'` : null},
    Casal_DataNascFilho4 = ${
      Casal_DataNascFilho4 ? `'${Casal_DataNascFilho4}'` : null
    },
    Casal_NomeFilho5 = ${Casal_NomeFilho5 ? `'${Casal_NomeFilho5}'` : null},
    Casal_DataNascFilho5 = ${
      Casal_DataNascFilho5 ? `'${Casal_DataNascFilho5}'` : null
    }
    WHERE Casal_IDMENS = '${idmens}'`,
      (err) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível salvar o casal.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Casal atualizado com sucesso!',
        });
      }
    );
  }

  alteraFoto(req, res) {
    const { idmens } = req.params;
    const { filename: path } = req.file;
    const final_path = `${process.env.APP_URL}/files-casal/${path}`;

    bd.query(
      `UPDATE ens_casal SET Casal_imagem='${final_path}' WHERE Casal_IDMENS='${idmens}'`,
      (err) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível salvar a foto.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Foto atualizada com sucesso!',
        });
      }
    );
  }
}

export default new CasalController();
