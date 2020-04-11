import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import bd from '../../config/database';
class SessionController {
  insere(req, res) {
    const { idmens, senha } = req.body;
    bd.query(
      `SELECT * FROM ens_siteacesso WHERE SiteAcesso_CasalIDMENS = ${idmens}`,
      async (err, result) => {
        if (err || result.length == 0) {
          return res.status(400).json({
            staus: false,
            message: 'IDMENS inválido, tente novamente.',
          });
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
          },
          token: jwt.sign({ idmens }, '22f73b1d5b9b6d85fb8986bc3c055981', {
            expiresIn: '7d',
          }),
        });
      }
    );
  }
}

export default new SessionController();
