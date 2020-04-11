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

  altera(req, res) {
    const { id } = req.params;
    const { idmens, nome, equipe, senha } = req.body;
    bd.query(
      `UPDATE ens_galeria SET Galeria_Titulo='${titulo}', Galeria_Data='${data}'`,
      (err) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível salvar o album.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Album atualizado com sucesso!',
        });
      }
    );
  }

  busca(req, res) {
    const { id } = req.params;
    bd.query(
      `SELECT G.Galeria_Titulo, G.Galeria_Data, C.Capa_Path
      FROM ens_galeria AS G
      JOIN ens_foto_capa AS C ON G.Galeria_ID = C.Capa_Galeria
      WHERE G.Galeria_ID = ${id}`,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível buscar o album.',
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
