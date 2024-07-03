import knex from '../database/knex/index.js';
import bcript from 'bcryptjs';
import { appErr } from '../ultils/appError.js';
import { expiresIn, secret } from '../configs/auth.js';
import jwt from 'jsonwebtoken';

class sessionControler {
  async createSession(req, res) {
    const { email, password } = req.body;
    try {
      const user = await knex('users').where({ email }).first();
      if (!user) {
        throw new appErr('Email ou senhas incorretos');
      }
      const chek = await bcript.compare(password, user.password);
      if (!chek) {
        throw new appErr('Email ou senhas incorretos');
      }
      const token = jwt.sign({ id: user.id }, secret, {
        subject: String(user.id),
        expiresIn,
      });

      return res.json({ user, token });
    } catch (err) {
      res.status(err.statusCode).json({ message: err.message });
    }
  }
}

export { sessionControler };
