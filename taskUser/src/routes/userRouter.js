import { Router } from 'express';
import { useControlers } from '../controls/userControllers.js';
import { noteControlles } from '../controls/notesController.js';
import { tagsController } from '../controls/tagsController.js';
const usersRoutes = Router();
const { create, update, show } = new useControlers();
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
usersRoutes.get('/showusers', show);
usersRoutes.put('/updateusers/:id', update);
usersRoutes.post('/notes/:id_usuario', createNotes);
usersRoutes.get('/shownotes', showNotes);
usersRoutes.delete('/deletenotes/:id_note', deleteNotes);
usersRoutes.get('/tags/:id_usuario', indexTags);

export { usersRoutes };
