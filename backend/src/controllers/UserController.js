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
    const { idmens, nome, equipe, senha } = req.body;

    const novaSenha = await bcrypt.hash(senha, 8);

    bd.query(
      `INSERT INTO ens_siteacesso (SiteAcesso_CasalIDMENS, SiteAcesso_CasalNome, SiteAcesso_CasalEquipeID, SiteAcesso_CasalSenha)
       VALUES ('${idmens}', '${nome}', '${equipe}', '${novaSenha}')`,
      (err) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível salvar o casal administrador.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Casal administrador registrado com sucesso!',
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
}

export default new UserController();
