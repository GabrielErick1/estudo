import express from "express";
import {v4} from 'uuid'
import {Category} from "../model/category"
import create from "../routers/routers"
const app = express();
app.use(express.json());


const categories:Category[] = [];

app.post('/curse', create.createCurse);

app.get('/curse', (req, res) => {
  return res.json({categories});
});


app.listen(3333, () => {
  console.log("Servidor rodando na porta 3333");
});
