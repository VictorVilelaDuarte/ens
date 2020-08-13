import bd from '../config/database';

class ConselheiroController {
  lista(req, res) {
    bd.query(`SELECT * from ens_conselheiro;`, (err, result) => {
      if (err) {
        return res.status(400).json({
          staus: false,
          message: 'Não foi possível buscar os conselheiros.',
        });
      }
      return res.status(200).json({
        status: true,
        data: result,
      });
    });
  }

  busca(req, res) {
    const { id } = req.params;
    bd.query(
      `SELECT * FROM ens_conselheiro WHERE Conselheiro_IDMENS=${id}`,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível buscar o conselheiro.',
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
    const final_path = `${process.env.APP_URL}/files-conselheiro/${path}`;
    const {
      idmens,
      id,
      nome,
      email,
      celular,
      telefone,
      comercial,
      endereco,
      paroquia,
      nascimento,
      ordenacao,
      ingresso,
      funcao,
      perfil,
      text,
    } = req.body;
    bd.query(
      `INSERT INTO ens_conselheiro (Conselheiro_IDMENS, Conselheiro_ID, Conselheiro_Nome, Conselheiro_Email, Conselheiro_TelCel, Conselheiro_TelRes, Conselheiro_TelCom, Conselheiro_Endereco, Conselheiro_Paroquia, Conselheiro_DataNascimento, Conselheiro_DataOrdenacao, Conselheiro_AnoIngressoEquipe, Conselheiro_FuncaoID, Conselheiro_Perfil, Conselheiro_Historico, Conselheiro_Imagem )
      VALUES ('${idmens}', '${id}', '${nome}', '${email}', '${celular}', '${telefone}', '${comercial}', '${endereco}', '${paroquia}', '${nascimento}', '${ordenacao}','${ingresso}','${funcao}','${perfil}','${text}', '${final_path}');`,
      (err) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível salvar o conselheiro.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Conselheiro registrado com sucesso!',
        });
      }
    );
  }

  altera(req, res) {
    const { idmens } = req.params;
    const {
      nome,
      email,
      celular,
      telefone,
      comercial,
      endereco,
      paroquia,
      nascimento,
      ordenacao,
      ingresso,
      funcao,
      perfil,
      text,
    } = req.body;
    let sql = `UPDATE ens_conselheiro
    SET
    Conselheiro_Nome = '${nome}',
    Conselheiro_Email = '${email}',
    Conselheiro_TelCel = '${celular}',
    Conselheiro_TelRes = '${telefone}',
    Conselheiro_TelCom = '${comercial}',
    Conselheiro_Endereco = '${endereco}',
    Conselheiro_Paroquia = '${paroquia}',
    Conselheiro_DataNascimento = '${nascimento}',
    Conselheiro_DataOrdenacao = '${ordenacao}',
    Conselheiro_AnoIngressoEquipe = '${ingresso}',
    Conselheiro_FuncaoID = '${funcao}',
    Conselheiro_Perfil = '${perfil}',
    Conselheiro_Historico = '${text}'
    WHERE Conselheiro_IDMENS = ${idmens};`;
    if (req.file) {
      const { filename: path } = req.file;
      const final_path = `${process.env.APP_URL}/files-conselheiro/${path}`;
      sql = `UPDATE ens_conselheiro
    SET
    Conselheiro_Nome = '${nome}',
    Conselheiro_Email = '${email}',
    Conselheiro_TelCel = '${celular}',
    Conselheiro_TelRes = '${telefone}',
    Conselheiro_TelCom = '${comercial}',
    Conselheiro_Endereco = '${endereco}',
    Conselheiro_Paroquia = '${paroquia}',
    Conselheiro_DataNascimento = '${nascimento}',
    Conselheiro_DataOrdenacao = '${ordenacao}',
    Conselheiro_AnoIngressoEquipe = '${ingresso}',
    Conselheiro_FuncaoID = '${funcao}',
    Conselheiro_Perfil = '${perfil}',
    Conselheiro_Historico = '${text}',
    Conselheiro_Imagem = '${final_path}'
    WHERE Conselheiro_IDMENS = ${idmens};`;
    }

    bd.query(sql, (err) => {
      if (err) {
        return res.status(400).json({
          staus: false,
          message: 'Não foi possível salvar o conselheiro.',
        });
      }
      return res.status(200).json({
        status: true,
        message: 'Conselheiro registrado com sucesso!',
      });
    });
  }

  deleta(req, res) {
    const { idmens } = req.params;
    bd.query(
      `DELETE FROM ens_conselheiro WHERE Conselheiro_IDMENS=${idmens}`,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível excluir a padroeira.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Padroeira deletada com sucesso!',
        });
      }
    );
  }
}

export default new ConselheiroController();
