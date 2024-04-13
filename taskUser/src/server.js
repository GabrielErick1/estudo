'express-async-error';
import migration from './database/sqlite/migrations/index.js';
import { appErr } from './ultils/appError.js';
import express from 'express';
import { usersRoutes } from './routes/index.js';
migration();
const app = express();
app.use(express.json());

app.use(usersRoutes);

// aqui faz a logica dos erros
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

const port = 3000;
app.listen(port, () => console.log('Servidor rodando na porta: ' + port));
