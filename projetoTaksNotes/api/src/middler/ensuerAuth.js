import jwt from 'jsonwebtoken';
import { secret } from '../configs/auth.js';
import { appErr } from '../ultils/appError.js';
export const ensuerVerifAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new appErr('Token não encontrado', 401);
  }
  const token = authorization.split(' ')[authorization.split(' ').length - 1];
  try {
    const { sub: user_id } = jwt.verify(token, secret);
    req.user = { id: Number(user_id) };
    return next();
  } catch (errr) {
    return res.status(appErr.status).json({ message: errr.message });
  }
};
