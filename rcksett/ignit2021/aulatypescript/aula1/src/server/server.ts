import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../swagger.json';
import 'dotenv/config';
import { AppDataSource } from '../database/data_source';
import { SpecializationRouters, routeAutenticate, CategoryRoutes } from '../routers';
import "../shared/container/index"
import { AppError } from '../errors/appError';
import 'express-async-errors';

const startServer = async () => {
  const app = express();

  try {
    await AppDataSource.initialize();
    app.use(express.json());

    // Configurações do Swagger
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

    // Configuração das rotas
    app.use(SpecializationRouters);
    app.use(routeAutenticate);
    app.use(CategoryRoutes);
    app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction)=>{
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: `Internal Server Error ${err.message}` });
      }
    })

    const PORT = process.env.PORT || 3333;
    app.listen(PORT);
  } catch (error) {
    process.exit(1);
  }
};

startServer();
