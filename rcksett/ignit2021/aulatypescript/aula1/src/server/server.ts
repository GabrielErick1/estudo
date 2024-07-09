import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../swagger.json';
import 'dotenv/config';
import { AppDataSource } from '../database/data_source';
import rotas from '../routers/routers';
import "../shared/container/index"


const startServer = async () => {
  const app = express();

  try {
    await AppDataSource.initialize();
    app.use(express.json());
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
    app.use(rotas);

    const PORT = process.env.PORT || 3333;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    process.exit(1);
  }
};

startServer();
