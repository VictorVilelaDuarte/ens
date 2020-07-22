import bd from '../../config/database';

class PilotagemController {
  lista(req, res) {
    bd.query(`SELECT * FROM ens_pilotagem`, (err, result) => {
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
    });
  }

  insere(req, res) {
    const {
      Pilot_IDMENS,
      Pilot_HomemID,
      Pilot_HomemNome,
      Pilot_HomemEmail,
      Pilot_HomemTelCel,
      Pilot_HomemTelCom,
      Pilot_HomemDataNascimento,
      Pilot_MulherID,
      Pilot_MulherNome,
      Pilot_MulherEmail,
      Pilot_MulherTelCel,
      Pilot_MulherTelCom,
      Pilot_MulherDataNascimento,
      Pilot_Nome,
      Pilot_DataCasamento,
      Pilot_ParoquiaCasamento,
      Pilot_IgrejaCasamento,
      Pilot_Endereco,
      Pilot_EndBairro,
      Pilot_EndCEP,
      Pilot_Cidade,
      Pilot_Estado,
      Pilot_Pais,
      Pilot_TelResid,
      Pilot_DataInicioENS,
      Pilot_NomeFilho1,
      Pilot_DataNascFilho1,
      Pilot_NomeFilho2,
      Pilot_DataNascFilho2,
      Pilot_NomeFilho3,
      Pilot_DataNascFilho3,
      Pilot_NomeFilho4,
      Pilot_DataNascFilho4,
      Pilot_NomeFilho5,
      Pilot_DataNascFilho5,
      Pilot_ExpComID,
      Pilot_AnoExpCom,
    } = req.body;

    // console.log(req.body);
    // return;

    bd.query(
      `INSERT INTO ens_pilotagem (Pilot_IDMENS, Pilot_HomemID, Pilot_HomemNome, Pilot_HomemEmail, Pilot_HomemTelCel,
        Pilot_HomemTelCom, Pilot_HomemDataNascimento, Pilot_MulherID, Pilot_MulherNome, Pilot_MulherEmail, Pilot_MulherTelCel,
        Pilot_MulherTelCom, Pilot_MulherDataNascimento, Pilot_Nome, Pilot_DataCasamento, Pilot_ParoquiaCasamento,
        Pilot_IgrejaCasamento, Pilot_Endereco, Pilot_EndBairro, Pilot_EndCEP, Pilot_Cidade, Pilot_Estado, Pilot_Pais,
        Pilot_TelResid, Pilot_DataInicioENS, Pilot_NomeFilho1, Pilot_DataNascFilho1, Pilot_NomeFilho2, Pilot_DataNascFilho2,
        Pilot_NomeFilho3, Pilot_DataNascFilho3, Pilot_NomeFilho4, Pilot_DataNascFilho4, Pilot_NomeFilho5, Pilot_DataNascFilho5,
        Pilot_ExpComID, Pilot_AnoExpCom, Pilot_EquipeID)
        VALUES ('${Pilot_IDMENS}', '${Pilot_HomemID}', '${Pilot_HomemNome}', '${Pilot_HomemEmail}', '${Pilot_HomemTelCel}',
        '${Pilot_HomemTelCom}', '${Pilot_HomemDataNascimento}', '${Pilot_MulherID}', '${Pilot_MulherNome}', '${Pilot_MulherEmail}',
        '${Pilot_MulherTelCel}', '${Pilot_MulherTelCom}', '${Pilot_MulherDataNascimento}', '${Pilot_Nome}', '${Pilot_DataCasamento}',
        '${Pilot_ParoquiaCasamento}', '${Pilot_IgrejaCasamento}', '${Pilot_Endereco}', '${Pilot_EndBairro}', '${Pilot_EndCEP}',
        '${Pilot_Cidade}', '${Pilot_Estado}', '${Pilot_Pais}',
        ${Pilot_TelResid ? `'${Pilot_TelResid}'` : null},
        '${Pilot_DataInicioENS}',
        ${Pilot_NomeFilho1 ? `'${Pilot_NomeFilho1}'` : null},
        ${Pilot_DataNascFilho1 ? `'${Pilot_DataNascFilho1}'` : null},
        ${Pilot_NomeFilho2 ? `'${Pilot_NomeFilho2}'` : null},
        ${Pilot_DataNascFilho2 ? `'${Pilot_DataNascFilho2}'` : null},
        ${Pilot_NomeFilho3 ? `'${Pilot_NomeFilho3}'` : null},
        ${Pilot_DataNascFilho3 ? `'${Pilot_DataNascFilho3}'` : null},
        ${Pilot_NomeFilho4 ? `'${Pilot_NomeFilho4}'` : null},
        ${Pilot_DataNascFilho4 ? `'${Pilot_DataNascFilho4}'` : null},
        ${Pilot_NomeFilho5 ? `'${Pilot_NomeFilho5}'` : null},
        ${Pilot_DataNascFilho5 ? `'${Pilot_DataNascFilho5}'` : null},
        ${Pilot_ExpComID ? `'${Pilot_ExpComID}'` : null},
        ${Pilot_AnoExpCom ? `'${Pilot_AnoExpCom}'` : null}, '0');`,
      (err) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível salvar o casal.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Casal registrado com sucesso!',
        });
      }
    );
  }

  busca(req, res) {
    const { idmens } = req.params;
    bd.query(
      `SELECT * FROM ens_pilotagem WHERE Pilot_IDMENS=${idmens}`,
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
      Pilot_HomemID,
      Pilot_HomemNome,
      Pilot_HomemEmail,
      Pilot_HomemTelCel,
      Pilot_HomemTelCom,
      Pilot_HomemDataNascimento,
      Pilot_MulherID,
      Pilot_MulherNome,
      Pilot_MulherEmail,
      Pilot_MulherTelCel,
      Pilot_MulherTelCom,
      Pilot_MulherDataNascimento,
      Pilot_Nome,
      Pilot_DataCasamento,
      Pilot_ParoquiaCasamento,
      Pilot_IgrejaCasamento,
      Pilot_Endereco,
      Pilot_EndBairro,
      Pilot_EndCEP,
      Pilot_Cidade,
      Pilot_Estado,
      Pilot_Pais,
      Pilot_TelResid,
      Pilot_DataInicioENS,
      Pilot_NomeFilho1,
      Pilot_DataNascFilho1,
      Pilot_NomeFilho2,
      Pilot_DataNascFilho2,
      Pilot_NomeFilho3,
      Pilot_DataNascFilho3,
      Pilot_NomeFilho4,
      Pilot_DataNascFilho4,
      Pilot_NomeFilho5,
      Pilot_DataNascFilho5,
      Pilot_ExpComID,
      Pilot_AnoExpCom,
    } = req.body;

    bd.query(
      `UPDATE ens_pilotagem
    SET
    Pilot_HomemID = '${Pilot_HomemID}',
    Pilot_HomemNome = '${Pilot_HomemNome}',
    Pilot_HomemEmail = '${Pilot_HomemEmail}',
    Pilot_HomemTelCel = '${Pilot_HomemTelCel}',
    Pilot_HomemTelCom = '${Pilot_HomemTelCom}',
    Pilot_HomemDataNascimento = '${Pilot_HomemDataNascimento}',
    Pilot_MulherID = '${Pilot_MulherID}',
    Pilot_MulherNome = '${Pilot_MulherNome}',
    Pilot_MulherEmail = '${Pilot_MulherEmail}',
    Pilot_MulherTelCel = '${Pilot_MulherTelCel}',
    Pilot_MulherTelCom = '${Pilot_MulherTelCom}',
    Pilot_MulherDataNascimento = '${Pilot_MulherDataNascimento}',
    Pilot_Nome = '${Pilot_Nome}',
    Pilot_DataCasamento = '${Pilot_DataCasamento}',
    Pilot_ParoquiaCasamento = '${Pilot_ParoquiaCasamento}',
    Pilot_IgrejaCasamento = '${Pilot_IgrejaCasamento}',
    Pilot_Endereco = '${Pilot_Endereco}',
    Pilot_EndBairro = '${Pilot_EndBairro}',
    Pilot_EndCEP = '${Pilot_EndCEP}',
    Pilot_Cidade = '${Pilot_Cidade}',
    Pilot_Estado = '${Pilot_Estado}',
    Pilot_Pais = '${Pilot_Pais}',
    Pilot_TelResid = ${Pilot_TelResid ? `'${Pilot_TelResid}'` : null},
    Pilot_DataInicioENS = '${Pilot_DataInicioENS}',
    Pilot_NomeFilho1 = ${Pilot_NomeFilho1 ? `'${Pilot_NomeFilho1}'` : null},
    Pilot_DataNascFilho1 = ${
      Pilot_DataNascFilho1 ? `'${Pilot_DataNascFilho1}'` : null
    },
    Pilot_NomeFilho2 = ${Pilot_NomeFilho2 ? `'${Pilot_NomeFilho2}'` : null},
    Pilot_DataNascFilho2 = ${
      Pilot_DataNascFilho2 ? `'${Pilot_DataNascFilho2}'` : null
    },
    Pilot_NomeFilho3 = ${Pilot_NomeFilho3 ? `'${Pilot_NomeFilho3}'` : null},
    Pilot_DataNascFilho3 = ${
      Pilot_DataNascFilho3 ? `'${Pilot_DataNascFilho3}'` : null
    },
    Pilot_NomeFilho4 = ${Pilot_NomeFilho4 ? `'${Pilot_NomeFilho4}'` : null},
    Pilot_DataNascFilho4 = ${
      Pilot_DataNascFilho4 ? `'${Pilot_DataNascFilho4}'` : null
    },
    Pilot_NomeFilho5 = ${Pilot_NomeFilho5 ? `'${Pilot_NomeFilho5}'` : null},
    Pilot_DataNascFilho5 = ${
      Pilot_DataNascFilho5 ? `'${Pilot_DataNascFilho5}'` : null
    },
    Pilot_ExpComID = ${Pilot_ExpComID ? `'${Pilot_ExpComID}'` : null},
    Pilot_AnoExpCom = ${Pilot_AnoExpCom ? `'${Pilot_AnoExpCom}'` : null}
    WHERE Pilot_IDMENS = '${idmens}'`,
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

  deleta(req, res) {
    const { idmens } = req.params;
    bd.query(
      `DELETE FROM ens_pilotagem WHERE Pilot_IDMENS=${idmens}`,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível excluir o casal.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Casal deletada com sucesso!',
        });
      }
    );
  }

  promove(req, res) {
    const { idmens, equipe } = req.body;

    bd.query(
      `INSERT INTO ens_casal(Casal_IDMENS, Casal_HomemID, Casal_HomemNome, Casal_HomemEmail,
      Casal_HomemTelCel, Casal_HomemTelCom, Casal_HomemDataNascimento, Casal_MulherID, Casal_MulherNome,
      Casal_MulherEmail, Casal_MulherTelCel, Casal_MulherTelCom, Casal_MulherDataNascimento, Casal_Nome,
      Casal_DataCasamento, Casal_ParoquiaCasamento, Casal_IgrejaCasamento, Casal_Endereco, Casal_EndBairro,
      Casal_EndCEP, Casal_Cidade, Casal_Estado, Casal_Pais, Casal_TelResid, Casal_DataInicioENS, Casal_EquipeID,
      Casal_NomeFilho1, Casal_DataNascFilho1, Casal_NomeFilho2, Casal_DataNascFilho2, Casal_NomeFilho3,
      Casal_DataNascFilho3, Casal_NomeFilho4, Casal_DataNascFilho4, Casal_NomeFilho5, Casal_DataNascFilho5,
      Casal_ExpComID, Casal_AnoExpCom)
      SELECT Pilot_IDMENS, Pilot_HomemID, Pilot_HomemNome, Pilot_HomemEmail, Pilot_HomemTelCel,
      Pilot_HomemTelCom, Pilot_HomemDataNascimento, Pilot_MulherID, Pilot_MulherNome, Pilot_MulherEmail,
      Pilot_MulherTelCel, Pilot_MulherTelCom, Pilot_MulherDataNascimento, Pilot_Nome, Pilot_DataCasamento,
      Pilot_ParoquiaCasamento, Pilot_IgrejaCasamento, Pilot_Endereco, Pilot_EndBairro, Pilot_EndCEP, Pilot_Cidade,
      Pilot_Estado, Pilot_Pais, Pilot_TelResid, Pilot_DataInicioENS, ${equipe}, Pilot_NomeFilho1,
      Pilot_DataNascFilho1, Pilot_NomeFilho2, Pilot_DataNascFilho2, Pilot_NomeFilho3, Pilot_DataNascFilho3,
      Pilot_NomeFilho4, Pilot_DataNascFilho4, Pilot_NomeFilho5, Pilot_DataNascFilho5, Pilot_ExpComID,
      Pilot_AnoExpCom FROM ens_pilotagem WHERE Pilot_IDMENS = ${idmens}`,
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível transferir o casal',
          });
        }
        bd.query(
          `DELETE FROM ens_pilotagem WHERE Pilot_IDMENS=${idmens}`,
          (err, result) => {
            if (err) {
              return res.status(400).json({
                staus: false,
                message: 'Não foi possível transferir o casal',
              });
            }
            return res.status(200).json({
              status: true,
              message: 'Casal promovido com sucesso!',
            });
          }
        );
      }
    );
  }
}

export default new PilotagemController();
