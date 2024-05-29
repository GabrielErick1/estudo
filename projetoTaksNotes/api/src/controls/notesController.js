import knex from '../database/knex/index.js';
import { appErr } from '../ultils/appError.js';

class noteControlles {
  async createNotes(req, res) {
    try {
      const { title, description, tags, links } = req.body;
      const id_usuario = req.user.id;
      const [id_notes] = await knex('notes').insert({
        title,
        description,
        id_usuario,
      });

      const linksInsert = links.map((link) => {
        return {
          id_notes,
          url: link,
        };
      });
      const linkinsert = linksInsert[0];
      await knex('links').insert(linkinsert);

      const insertTags = tags.map((name) => {
        return {
          name,
          id_notes,
          id_usuario,
        };
      });
      const tagss = insertTags[0];
      await knex('tags').insert(tagss);
      res.status(201).json({ message: 'nota craida com sucesso' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async indexNotes(req, res) {
    try {
      const { id } = req.params;
      const notes = await knex('notes').where({ id }).first();
      const tags = await knex('tags')
        .where({ id_notes: notes.id })
        .orderBy('name');

      const links = await knex('links')
        .where({ id_notes: notes.id })
        .orderBy('created_at');
      if (!notes) {
        throw new appErr('este usuario ainda nao cadastrou uma nota');
      }
      res.json({ ...notes, tags, links });
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  }

  async deleteNotes(req, res) {
    try {
      const { id } = req.params;
      const notesDeletada = await knex('notes').where({ id }).delete();

      if (notesDeletada === 0) {
        throw new appErr('Nota não encontrada');
      }
      res.json({ message: 'nota excluida com sucesso' });
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  }

  async showNotes(req, res) {
    try {
      const { title, tags } = req.query;
      const id_usuario = req.user.id;
      let notes;
      if (tags) {
        const filtertags = tags.split(',').map((tag) => tag.trim());

        notes = await knex('tags')
          .select(['notes.*'])
          .where('notes.id_usuario', id_usuario)
          .whereIn('tags.name', filtertags)
          .innerJoin('notes', 'notes.id', 'tags.id_notes')
          .groupBy('notes.id')
          .orderBy('notes.title');
      } else {
        notes = await knex('notes')
          .where({ id_usuario })
          .whereLike('title', `%${title}%`)
          .orderBy('title');
      }

      const notesTags = await knex('tags').where({ id_usuario });

      const notesWhite = notes.map((note) => {
        const tagsuser = notesTags.filter(
          (tag) => tag.id_notes === notes[0].id,
        );
        return {
          ...note,
          tags: tagsuser,
        };
      });
      if (!notes) {
        throw new appErr('este usuario ainda nao cadastrou uma nota');
      }
      res.json({ notesWhite });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

export { noteControlles };
