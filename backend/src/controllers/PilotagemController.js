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
        '${Pilot_Cidade}', '${Pilot_Estado}', '${Pilot_Pais}', '${Pilot_TelResid}', '${Pilot_DataInicioENS}',
        '${Pilot_NomeFilho1}', '${Pilot_DataNascFilho1}', '${Pilot_NomeFilho2}', '${Pilot_DataNascFilho2}', '${Pilot_NomeFilho3}',
        '${Pilot_DataNascFilho3}', '${Pilot_NomeFilho4}', '${Pilot_DataNascFilho4}', '${Pilot_NomeFilho5}', '${Pilot_DataNascFilho5}',
        '${Pilot_ExpComID}', '${Pilot_AnoExpCom}', '0');`,
      (err) => {
        if (err) {
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
}

export default new PilotagemController();
