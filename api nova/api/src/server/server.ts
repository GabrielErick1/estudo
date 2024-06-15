import 'express-async-errors';
import express from 'express';
import { userRouter } from '../routes/userRouter';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

const app = express();
 
app.use(morgan('tiny'));
 
app.use(cors());
 
app.use(helmet());
 
app.use(express.json());
 
export class App{
    public server: express.Application;
  
    constructor(){
      this.server = express();
      this.middleware();
      this.router();
    }
  
    private middleware(){
      this.server.use(express.json());
    }
  
    private router(){
      this.server.use(userRouter);
    }
  }