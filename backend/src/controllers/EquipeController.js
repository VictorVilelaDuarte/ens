import bd from '../../config/database';

class EquipeController {
  lista(req, res) {
    bd.query(
      `SELECT ens_equipe.*, ens_conselheiro.Conselheiro_Nome, a.Casal_Nome as Casal_Ligacao,  b.Casal_Nome as Casal_Resp FROM ens_equipe
    LEFT JOIN ens_conselheiro 
    ON ens_equipe.Equipe_ConselheiroIDMENS = ens_conselheiro.Conselheiro_IDMENS
    LEFT JOIN ens_casal AS a
    ON ens_equipe.Equipe_CasalLigacaoAtualIDMENS = a.Casal_IDMENS
    LEFT JOIN ens_casal AS b
    ON ens_equipe.Equipe_CasalRespAtualIDMENS = b.Casal_IDMENS;
    ;`,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível buscar as equipes.',
          });
        }
        return res.status(200).json({
          status: true,
          data: result,
        });
      }
    );
  }

  insere(req, res) {
    const { filename: path } = req.file;
    const final_path = `${process.env.APP_URL}/files-equipe/${path}`;
    const {
      Equipe_Nome,
      Equipe_Descricao,
      Equipe_PadroeiraID,
      Equipe_ConselheiroIDMENS,
      Equipe_CasalRespAtualIDMENS,
      Equipe_DataFundacao,
      Equipe_CasalLigacaoAtualIDMENS,
      Equipe_SetorID,
      Equipe_NecessRepilotagem,
      Equipe_Historico,
    } = req.body;
    bd.query(
      `INSERT INTO ens_equipe (Equipe_Nome, Equipe_Descricao, Equipe_PadroeiraID, Equipe_ConselheiroIDMENS, Equipe_CasalRespAtualIDMENS, Equipe_DataFundacao, Equipe_CasalLigacaoAtualIDMENS, Equipe_SetorID, Equipe_NecessRepilotagem, Equipe_Historico, Equipe_imagem)
      VALUES ('${Equipe_Nome}', '${Equipe_Descricao}', '${Equipe_PadroeiraID}', '${Equipe_ConselheiroIDMENS}', '${Equipe_CasalRespAtualIDMENS}', '${Equipe_DataFundacao}', '${Equipe_CasalLigacaoAtualIDMENS}', '${Equipe_SetorID}', '${Equipe_NecessRepilotagem}', '${Equipe_Historico}', '${final_path}');`,
      (err) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível salvar a equipe.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Equipe registrada com sucesso!',
        });
      }
    );
  }

  altera(req, res) {
    const { id } = req.params;
    const {
      Equipe_Nome,
      Equipe_Descricao,
      Equipe_PadroeiraID,
      Equipe_ConselheiroIDMENS,
      Equipe_CasalRespAtualIDMENS,
      Equipe_DataFundacao,
      Equipe_CasalLigacaoAtualIDMENS,
      Equipe_SetorID,
      Equipe_NecessRepilotagem,
      Equipe_Historico,
    } = req.body;
    let sql = `UPDATE ens_equipe
     SET Equipe_Nome='${Equipe_Nome}', Equipe_Descricao='${Equipe_Descricao}', Equipe_PadroeiraID='${Equipe_PadroeiraID}', Equipe_ConselheiroIDMENS='${Equipe_ConselheiroIDMENS}',
     Equipe_CasalRespAtualIDMENS='${Equipe_CasalRespAtualIDMENS}', Equipe_DataFundacao='${Equipe_DataFundacao}', Equipe_CasalLigacaoAtualIDMENS='${Equipe_CasalLigacaoAtualIDMENS}',
     Equipe_SetorID='${Equipe_SetorID}', Equipe_NecessRepilotagem='${Equipe_NecessRepilotagem}', Equipe_Historico='${Equipe_Historico}'
     WHERE Equipe_ID='${id}'`;
    if (req.file) {
      const { filename: path } = req.file;
      const final_path = `${process.env.APP_URL}/files-equipe/${path}`;
      sql = `UPDATE ens_equipe
     SET Equipe_Nome='${Equipe_Nome}', Equipe_Descricao='${Equipe_Descricao}', Equipe_PadroeiraID='${Equipe_PadroeiraID}', Equipe_ConselheiroIDMENS='${Equipe_ConselheiroIDMENS}',
     Equipe_CasalRespAtualIDMENS='${Equipe_CasalRespAtualIDMENS}', Equipe_DataFundacao='${Equipe_DataFundacao}', Equipe_CasalLigacaoAtualIDMENS='${Equipe_CasalLigacaoAtualIDMENS}',
     Equipe_SetorID='${Equipe_SetorID}', Equipe_NecessRepilotagem='${Equipe_NecessRepilotagem}', Equipe_Historico='${Equipe_Historico}', Equipe_imagem='${final_path}'
     WHERE Equipe_ID='${id}'`;
    }
    bd.query(sql, (err) => {
      if (err) {
        return res.status(400).json({
          staus: false,
          message: 'Não foi possível salvar a equipe.',
        });
      }
      return res.status(200).json({
        status: true,
        message: 'Equipe atualizada com sucesso!',
      });
    });
  }

  busca(req, res) {
    const { id } = req.params;
    bd.query(
      `SELECT * FROM ens_equipe WHERE Equipe_ID=${id}`,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível buscar a equipe.',
          });
        }
        return res.status(200).json({
          status: true,
          data: result,
        });
      }
    );
  }

  deleta(req, res) {
    const { id } = req.params;
    bd.query(`DELETE FROM ens_equipe WHERE Equipe_ID=${id}`, (err, result) => {
      if (err) {
        return res.status(400).json({
          staus: false,
          message: 'Não foi possível excluir a equipe.',
        });
      }
      return res.status(200).json({
        status: true,
        message: 'Equipe deletada com sucesso!',
      });
    });
  }
}

export default new EquipeController();
