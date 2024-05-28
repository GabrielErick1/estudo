import sqlConection from '../database/sqlite/index.js';
import { appErr } from '../ultils/appError.js';
import bcript from 'bcryptjs';
class useControlers {
  async create(req, res) {
    const { name, email, password } = req.body;
    try {
      const database = await sqlConection();
      const verifiqemail = await database.get(
        'SELECT * FROM users WHERE email = (?)',
        [email],
      );

      if (verifiqemail) {
        throw new appErr('Este email ja esta cadastrado', 409);
      }

      const hashPassword = await bcript.hash(password, 8);

      await database.run(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashPassword],
      );
      return res.status(201).json({ message: 'Login cadastrado com sucesso' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  async update(req, res) {
    try {
      const { name, email, password, word_password } = req.body;
      const id = req.user.id;
      const database = await sqlConection();
      let user = await database.get('SELECT * FROM users WHERE id = (?)', [id]);

      if (!email || !name) {
        throw new appErr('Por favor  informe um email e nome de usuario');
      }

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

      if (word_password && !password) {
        throw new appErr('Por favor, informe a senha antiga.');
      }
      if (password && word_password) {
        const checkPassword = await bcript.compare(password, user.password);
        if (!checkPassword) {
          throw new appErr('A senha antiga não confere.');
        }
        const hashedPassword = await bcript.hash(word_password, 8);
        user.password = hashedPassword ?? user.password;
      }
      await database.run(
        `UPDATE users SET 
         name = ?,
         email = ?,
         password = ?,
         update_at = DATETIME('now')
         WHERE id = ?`,
        [user.name, user.email, user.password, id],
      );

      return res.json({});
    } catch (err) {
      res.status(err.statusCode).json({ message: err.message });
    }
  }
}

export { useControlers };
