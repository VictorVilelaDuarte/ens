import bd from '../config/database';

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
    Casal_HomemEmail = '${Casal_HomemEmail ? `'${Casal_HomemEmail}'` : null}',
    Casal_HomemTelCel = '${
      Casal_HomemTelCel ? `'${Casal_HomemTelCel}'` : null
    }',
    Casal_HomemTelCom = '${Casal_HomemTelCom}',
    Casal_HomemDataNascimento = '${Casal_HomemDataNascimento}',
    Casal_MulherID = '${Casal_MulherID}',
    Casal_MulherNome = '${Casal_MulherNome}',
    Casal_MulherEmail = '${
      Casal_MulherEmail ? `'${Casal_MulherEmail}'` : null
    }',
    Casal_MulherTelCel = '${
      Casal_MulherTelCel ? `'${Casal_MulherTelCel}'` : null
    }',
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
    console.log(req.params);
    bd.query(
      `UPDATE ens_casal SET Casal_imagem='${final_path}' WHERE Casal_IDMENS='${idmens}'`,
      (err) => {
        if (err) {
          console.log(err);
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

  deleta(req, res) {
    const { idmens } = req.params;

    bd.query(
      `INSERT INTO ens_exequipista(ExEquipista_IDMENS, ExEquipista_HomemID, ExEquipista_HomemNome,
        ExEquipista_HomemEmail, ExEquipista_HomemTelCel, ExEquipista_HomemTelCom, ExEquipista_HomemDataNascimento,
        ExEquipista_MulherID, ExEquipista_MulherNome, ExEquipista_MulherEmail, ExEquipista_MulherTelCel,
        ExEquipista_MulherTelCom, ExEquipista_MulherDataNasc, ExEquipista_Nome, ExEquipista_DataCasamento,
        ExEquipista_ParoquiaCasamento, ExEquipista_IgrejaCasamento, ExEquipista_Endereco, ExEquipista_EndBairro,
        ExEquipista_EndCEP, ExEquipista_Cidade, ExEquipista_Estado, ExEquipista_Pais, ExEquipista_TelResid,
        ExEquipista_DataInicioENS, ExEquipista_EquipeID, ExEquipista_NomeFilho1, ExEquipista_DataNascFilho1,
        ExEquipista_NomeFilho2, ExEquipista_DataNascFilho2, ExEquipista_NomeFilho3, ExEquipista_DataNascFilho3,
        ExEquipista_NomeFilho4, ExEquipista_DataNascFilho4, ExEquipista_NomeFilho5, ExEquipista_DataNascFilho5,
        ExEquipista_ExpComID, ExEquipista_AnoExpCom, ExEquipista_PilotagemID, ExEquipista_AnoPilotagem,
        ExEquipista_Historico)
        SELECT Casal_IDMENS, Casal_HomemID, Casal_HomemNome, Casal_HomemEmail, Casal_HomemTelCel, Casal_HomemTelCom,
        Casal_HomemDataNascimento, Casal_MulherID, Casal_MulherNome, Casal_MulherEmail, Casal_MulherTelCel,
        Casal_MulherTelCom, Casal_MulherDataNascimento, Casal_Nome, Casal_DataCasamento, Casal_ParoquiaCasamento,
        Casal_IgrejaCasamento, Casal_Endereco, Casal_EndBairro, Casal_EndCEP, Casal_Cidade, Casal_Estado,
        Casal_Pais, Casal_TelResid, Casal_DataInicioENS, Casal_EquipeID, Casal_NomeFilho1, Casal_DataNascFilho1, Casal_NomeFilho2,
        Casal_DataNascFilho2, Casal_NomeFilho3, Casal_DataNascFilho3, Casal_NomeFilho4, Casal_DataNascFilho4,
        Casal_NomeFilho5, Casal_DataNascFilho5, Casal_ExpComID, Casal_AnoExpCom, Casal_PilotagemID,
        Casal_AnoPilotagem, Casal_Historico FROM ens_casal WHERE Casal_IDMENS = ${idmens};`,
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            staus: false,
            message: 'Erro ao deletar casal',
          });
        }
        bd.query(
          `DELETE FROM ens_casal WHERE Casal_IDMENS=${idmens}`,
          (err, result) => {
            if (err) {
              return res.status(400).json({
                staus: false,
                message: 'Não foi possível transferir o casal',
              });
            }
            return res.status(200).json({
              status: true,
              message: 'Casal deletado com sucesso!',
            });
          }
        );
      }
    );
  }
}

export default new CasalController();
