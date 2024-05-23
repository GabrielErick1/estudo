import knex from '../database/knex/index.js';
import { appErr } from '../ultils/appError.js';
class tagsController {
  async indexTags(req, res) {
    try {
      const id_usuario = req.user.id;
      const tagsuser = await knex('tags').where({ id_usuario }).groupBy('name');
      if (tagsuser.length === 0) {
        throw new appErr('tags nao encontrada');
      }
      return res.json(tagsuser);
    } catch (err) {
      res.status(err.statusCode).json({ message: err.message });
    }
  }
}

export { tagsController };
