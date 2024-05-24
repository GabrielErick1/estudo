import { Router } from 'express';
import { useControlers } from '../controls/userControllers.js';
import { noteControlles } from '../controls/notesController.js';
import { tagsController } from '../controls/tagsController.js';
import { ensuerVerifAuth } from '../middler/ensuerAuth.js';
import { UserAvatarController } from '../controls/userAvatarcontroler.js';
import multer from 'multer';

import { MULTER } from '../configs/upload.js';
const upload = multer(MULTER);
const usersRoutes = Router();

const { create, update } = new useControlers();

const { updateAvatar } = new UserAvatarController();

const { indexTags } = new tagsController();

const { createNotes, deleteNotes, showNotes, indexNotes } =
  new noteControlles();

usersRoutes.post('/users', create);
usersRoutes.put('/updateusers', ensuerVerifAuth, update);
usersRoutes.post('/notes', ensuerVerifAuth, createNotes);
usersRoutes.get('/shownotes', ensuerVerifAuth, showNotes);
usersRoutes.delete('/deletenotes/:id', ensuerVerifAuth, deleteNotes);
usersRoutes.get('/tags', ensuerVerifAuth, indexTags);
usersRoutes.get('/notes/:id', ensuerVerifAuth, indexNotes);
usersRoutes.patch(
  '/avatar',
  ensuerVerifAuth,
  upload.single('avatar'),
  updateAvatar,
);
export { usersRoutes };
