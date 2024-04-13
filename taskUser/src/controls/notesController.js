import knex from '../database/knex/index.js';
import { appErr } from '../ultils/appError.js';

class noteControlles {
  async createNotes(req, res) {
    try {
      const { title, description, tags, links } = req.body;
      const { id_usuario } = req.params;

      const id_notes = await knex('notes').insert({
        title,
        description,
        id_usuario,
      });
      let id_note = id_notes[0];
      const linksInsert = links.map((link) => {
        return {
          id_note,
          url: link,
        };
      });

      await knex('links').insert(linksInsert);

      const insertTags = tags.map((name) => {
        return {
          name,
          id_note,
          id_usuario,
        };
      });
      await knex('tags').insert(insertTags);
      res.json();
    } catch (err) {
      res.status(err.statusCode).json({ message: err.message });
    }
  }

  async indexNotes(req, res) {
    try {
      const { id_usuario } = req.params;
      const notes = await knex('notes').where({ id_usuario }).first();
      const tags = await knex('tags')
        .where({ id_note: notes.id })
        .orderBy('name');
      const links = await knex('links')
        .where({ id_note: notes.id })
        .orderBy('created_at');

      if (!notes) {
        throw new appErr('este usuario ainda nao cadastrou uma nota');
      }
      res.json({ ...notes, tags, links });
    } catch (err) {
      res.status(err.statusCodes).json({ erro: err.message });
    }
  }
  async deleteNotes(req, res) {
    try {
      const { id_note } = req.params;
      const notesDeletada = await knex('notes').where({ id: id_note }).delete();
      console.log(notesDeletada);
      if (notesDeletada === 0) {
        throw new appErr('Nota não encontrada');
      }
      res.json();
    } catch (err) {
      res.status(err.statusCode).json({ erro: err.message });
    }
  }
  async showNotes(req, res) {
    try {
      const { id_usuario, title, tags } = req.query;
      let notes;
      if (tags) {
        const filtertags = tags.split(',').map((tag) => tag.trim());
        notes = await knex('tags')
          .select([
            'notes.id',
            'notes.title',
            'notes.id_usuario',
            'notes.description',
          ])
          .where('notes.id_usuario', id_usuario)
          .whereLike('notes.title', `%${title}%`)
          .whereIn('name', filtertags)
          .innerJoin('notes', 'notes.id', 'tags.id_note')
          .orderBy('notes.title');
      } else {
        notes = await knex('notes')
          .where({ id_usuario })
          .whereLike('title', `%${title}%`)
          .orderBy('title');
      }
      const notesTags = await knex('tags').where({ id_usuario });
      const notesWhite = notes.map((note) => {
        const tagsuser = notesTags.filter((tag) => tag.id_note === note.id);
        return {
          ...note,
          tags: tagsuser,
        };
      });
      if (!notes) {
        throw new appErr('este usuario ainda nao cadastrou uma nota');
      }
      res.json(notesWhite);
    } catch (err) {
      res.status(err.statusCode).json({ message: err.message });
    }
  }
}

export { noteControlles };
