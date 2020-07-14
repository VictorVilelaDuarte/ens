import bd from '../../config/database';

class PilotagemController {
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
      Pilot_EquipeID,
      Pilot_FuncaoEquipeID,
      Pilot_FuncaoSetorID,
      Pilot_FuncaoRegiaoID,
      Pilot_FuncaoMovimentoID,
      Pilot_FuncaoParoquialID1,
      Pilot_FuncaoParoquialID2,
      Pilot_FuncaoParoquialID3,
      Pilot_FuncaoParoquialID4,
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
      Pilot_PilotagemID,
      Pilot_AnoPilotagem,
      Pilot_Historico,
      Pilot_SetorID,
    } = req.body;

    bd.query(
      `INSERT INTO ens_pilotagem (Pilot_IDMENS, Pilot_HomemID, Pilot_HomemNome, Pilot_HomemEmail, Pilot_HomemTelCel,
        Pilot_HomemTelCom, Pilot_HomemDataNascimento, Pilot_MulherID, Pilot_MulherNome, Pilot_MulherEmail, Pilot_MulherTelCel,
        Pilot_MulherTelCom, Pilot_MulherDataNascimento, Pilot_Nome, Pilot_DataCasamento, Pilot_ParoquiaCasamento,
        Pilot_IgrejaCasamento, Pilot_Endereco, Pilot_EndBairro, Pilot_EndCEP, Pilot_Cidade, Pilot_Estado, Pilot_Pais,
        Pilot_TelResid, Pilot_DataInicioENS, Pilot_EquipeID, Pilot_FuncaoEquipeID, Pilot_FuncaoSetorID, Pilot_FuncaoRegiaoID,
        Pilot_FuncaoMovimentoID, Pilot_FuncaoParoquialID1, Pilot_FuncaoParoquialID2, Pilot_FuncaoParoquialID3,
        Pilot_FuncaoParoquialID4, Pilot_NomeFilho1, Pilot_DataNascFilho1, Pilot_NomeFilho2, Pilot_DataNascFilho2,
        Pilot_NomeFilho3, Pilot_DataNascFilho3, Pilot_NomeFilho4, Pilot_DataNascFilho4, Pilot_NomeFilho5, Pilot_DataNascFilho5,
        Pilot_ExpComID, Pilot_AnoExpCom, Pilot_PilotagemID, Pilot_AnoPilotagem, Pilot_Historico, Pilot_SetorID)
        VALUES (${Pilot_IDMENS}, ${Pilot_HomemID}, ${Pilot_HomemNome}, ${Pilot_HomemEmail}, ${Pilot_HomemTelCel},
        ${Pilot_HomemTelCom}, ${Pilot_HomemDataNascimento}, ${Pilot_MulherID}, ${Pilot_MulherNome}, ${Pilot_MulherEmail},
        ${Pilot_MulherTelCel}, ${Pilot_MulherTelCom}, ${Pilot_MulherDataNascimento}, ${Pilot_Nome}, ${Pilot_DataCasamento},
        ${Pilot_ParoquiaCasamento}, ${Pilot_IgrejaCasamento}, ${Pilot_Endereco}, ${Pilot_EndBairro}, ${Pilot_EndCEP},
        ${Pilot_Cidade}, ${Pilot_Estado}, ${Pilot_Pais}, ${Pilot_TelResid}, ${Pilot_DataInicioENS}, ${Pilot_EquipeID},
        ${Pilot_FuncaoEquipeID}, ${Pilot_FuncaoSetorID}, ${Pilot_FuncaoRegiaoID}, ${Pilot_FuncaoMovimentoID},
        ${Pilot_FuncaoParoquialID1}, ${Pilot_FuncaoParoquialID2}, ${Pilot_FuncaoParoquialID3}, ${Pilot_FuncaoParoquialID4},
        ${Pilot_NomeFilho1}, ${Pilot_DataNascFilho1}, ${Pilot_NomeFilho2}, ${Pilot_DataNascFilho2}, ${Pilot_NomeFilho3},
        ${Pilot_DataNascFilho3}, ${Pilot_NomeFilho4}, ${Pilot_DataNascFilho4}, ${Pilot_NomeFilho5}, ${Pilot_DataNascFilho5},
        ${Pilot_ExpComID}, ${Pilot_AnoExpCom}, ${Pilot_PilotagemID}, ${Pilot_AnoPilotagem}, ${Pilot_Historico},
        ${Pilot_SetorID});`,
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
}

export default new PilotagemController();
