import bcrypt from 'bcryptjs';

import bd from '../../config/database';

class UserController {
  lista(req, res) {
    bd.query(`SELECT * FROM ens_siteacesso`, (err, result) => {
      if (err) {
        return res.status(400).json({
          staus: false,
          message: 'Não foi possível buscar os casais administradores.',
        });
      }
      return res.status(200).json({
        status: true,
        data: result,
      });
    });
  }

  async insere(req, res) {
    const { idmens, senha } = req.body;
    let nome = '';
    let equipe = '';

    bd.query(
      `SELECT Casal_EquipeID, Casal_Nome FROM ens_Casal WHERE Casal_IDMENS = ${idmens}`,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível criar o usuario.',
          });
        }
        nome = result[0].Casal_Nome;
        equipe = result[0].Casal_EquipeID;
      }
    );
    const novaSenha = await bcrypt.hash(senha, 8);

    bd.query(
      `INSERT INTO ens_siteacesso (SiteAcesso_CasalIDMENS, SiteAcesso_CasalNome, SiteAcesso_CasalEquipeID, SiteAcesso_CasalSenha)
       VALUES ('${idmens}', '${nome}', '${equipe}', '${novaSenha}')`,
      (err) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível criar o usuario.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Usuario registrado com sucesso!',
        });
      }
    );
  }

  busca(req, res) {
    const { idmens } = req.params;
    bd.query(
      `SELECT * FROM ens_siteacesso WHERE SiteAcesso_CasalIDMENS = ${idmens}`,
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

  deleta(req, res) {
    const { idmens } = req.params;
    bd.query(
      `DELETE FROM ens_siteacesso WHERE SiteAcesso_CasalIDMENS=${idmens}`,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível excluir o casal administrador.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Casal administrador deletado com sucesso!',
        });
      }
    );
  }

  alteraAdm(req, res) {
    const { idmens } = req.params;
    const { adm } = req.body;
    bd.query(
      `UPDATE ens_siteacesso SET SiteAcesso_Adm='${adm}' WHERE SiteAcesso_CasalIDMENS='${idmens}'`,
      (err) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível tornar ADM.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Usuario atualizado com sucesso!',
        });
      }
    );
  }
}

export default new UserController();
