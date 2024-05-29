'express-async-error';
import migration from './database/sqlite/migrations/index.js';
import 'dotenv/config';
import { appErr } from './ultils/appError.js';
import express from 'express';
import cors from 'cors';
import { usersRoutes, routersession } from './routes/index.js';
import { UPLOAD_FOLDER } from './configs/upload.js';
migration();
const app = express();
app.use(cors());
app.use(express.json());

app.use(usersRoutes, routersession);
app.use('/files', express.static(UPLOAD_FOLDER));
app.use((error, req, res, next) => {
  if (error instanceof appErr) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }
  return res.status(500).json({
    status: 'error',
    message: 'internal server error',
  });
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Servidor rodando na porta: ' + port));
