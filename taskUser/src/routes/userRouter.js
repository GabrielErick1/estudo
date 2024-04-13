import { Router } from 'express';
import { useControlers } from '../controls/userControllers.js';
import { noteControlles } from '../controls/notesController.js';
import { tagsController } from '../controls/tagsController.js';
const usersRoutes = Router();
const { create, update } = new useControlers();
const { indexTags } = new tagsController();
const { createNotes, deleteNotes, showNotes } = new noteControlles();

/*const myMidelleware = (req, res, next) => {
  let { isAdmin } = req.body;
  if (isAdmin === true) {
    next();
  } else {
    throw new appErr('usuario sem premisao de adm');
  }
};*/
usersRoutes.post('/users', create);
usersRoutes.put('/users/:id', update);
usersRoutes.post('/notes/:id_usuario', createNotes);
usersRoutes.get('/shownotes', showNotes);
usersRoutes.delete('/notes/:id_note', deleteNotes);
usersRoutes.get('/tags/:id_usuario', indexTags);

export { usersRoutes };
