import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/authConfig';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      status: false,
      message: 'Usuario não autenticado.',
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    (req.usuarioIDMENS = decoded.idmens), (req.usuarioNome = decoded.nome);

    return next();
  } catch (err) {
    return res.status(401).json({
      status: false,
      message: 'Usuario não autenticado.',
    });
  }

  return next();
};
