/* eslint-disable no-unused-expressions */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import bd from '../config/database';
import authConfig from '../config/authConfig';

class SessionController {
  insere(req, res) {
    const { idmens, senha } = req.body;
    bd.query(
      `SELECT * FROM ens_siteacesso WHERE SiteAcesso_CasalIDMENS = ${idmens}`,
      async (err, result) => {
        if (err || result.length === 0) {
          bd.query(
            `SELECT Casal_nome, Casal_IDMENS FROM ens_casal WHERE Casal_IDMENS = ${idmens}`,
            (error, results) => {
              if (error || results.length === 0) {
                return res.status(400).json({
                  status: false,
                  message: 'IDMENS inválido, tente novamente.',
                });
              }
              return res.status(200).json({
                status: true,
                data: results,
                new: true,
              });
            }
          );
          return;
        }
        const valido = await bcrypt.compare(
          senha,
          result[0].SiteAcesso_CasalSenha
        );
        if (!valido) {
          return res.status(400).json({
            staus: false,
            message: 'Senha inválida, tente novamente.',
          });
        }

        return res.json({
          status: true,
          user: {
            IDMENS: result[0].SiteAcesso_CasalIDMENS,
            Nome: result[0].SiteAcesso_CasalNome,
            Adm: result[0].SiteAcesso_Adm,
          },
          token: jwt.sign(
            { idmens, nome: result[0].SiteAcesso_CasalNome },
            authConfig.secret,
            {
              expiresIn: authConfig.expiresIn,
            }
          ),
        });
      }
    );
  }
}

export default new SessionController();
