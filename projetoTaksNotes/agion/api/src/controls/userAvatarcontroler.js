import knex from '../database/knex/index.js';
import { appErr } from '../ultils/appError.js';
import { Diskstorage } from '../providers/Diskstorage.js';
const { deleteFile, saveFile } = new Diskstorage();
export class UserAvatarController {
  async createAvatar(req, res) {}

  async updateAvatar(req, res) {
    try {
      const id_usuario = req.user.id;
      const avatarFilename = req.file.filename;
      const user = await knex('users').where({ id: id_usuario }).first();

      if (!user) {
        throw new appErr('Usuario nao encontrado', 400);
      }
      if (user.avatar) {
        await deleteFile(user.avatar);
      }
      const filename = await saveFile(avatarFilename);
      user.avatar = filename;
      await knex('users').update(user).where({ id: id_usuario });
      return res.json({ user });
    } catch (err) {
      res.json({ message: err.message });
    }
  }
}
