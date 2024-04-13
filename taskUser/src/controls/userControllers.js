import { error } from 'console';
import sqlConection from '../database/sqlite/index.js';
import { appErr } from '../ultils/appError.js';
import bcript from 'bcryptjs';

class useControlers {
  /* show() {}*/
  async create(req, res) {
    const { name, email, password } = req.body;
    try {
      const database = await sqlConection();
      const verifiqemail = await database.get(
        'SELECT * FROM users WHERE email = (?)',
        [email],
      );

      if (verifiqemail) {
        throw new appErr('este email ja esta cadastrado');
      }

      const hashPassword = await bcript.hash(password, 8);

      await database.run(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashPassword],
      );
      res.status(201).json();
    } catch (err) {
      res.status(err.statusCode).json({ message: err.message });
    }
  }
  async update(req, res) {
    try {
      const { name, email, password, word_password, avatar } = req.body;
      const { id } = req.params;
      const database = await sqlConection();
      let user = await database.get('SELECT * FROM users WHERE id = (?)', [id]);
      if (!user) {
        throw new appErr('usuario nao encontrado');
      }
      const verifiqemail = await database.get(
        'SELECT * FROM users WHERE email = (?)',
        [email],
      );
      if (verifiqemail && verifiqemail.id !== user.id) {
        throw new appErr(
          'este email ja esta cadastrado, porfavor informe outro email!',
        );
      }

      user.name = name ?? user.name;
      user.email = email ?? user.email;
      user.avatar = avatar ?? user.avatar;
      if (password && !word_password) {
        throw new appErr('por favaor informe a senha antiga');
      }
      if (password && word_password) {
        const chek = await bcript.compare(word_password, user.password);
        if (!chek) {
          throw new appErr('a senha antiga nao confere');
        }
        const hashPassword = await bcript.hash(password, 8);
        user.password = hashPassword ?? user.password;
      }
      await database.run(
        `UPDATE users SET 
        name = ?,
        email = ?,
        password = ?,
        avatar = ?,
        update_at = DATETIME('now')
        WHERE id = ?`,
        [user.name, user.email, user.password, user.avatar, id],
      );
      return res.json();
    } catch (err) {
      res.status(err.statusCode).json({ message: err.message });
    }
  }

  /*delete() {}*/
}

export { useControlers };
