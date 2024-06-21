import express from "express";
import {v4} from 'uuid'
import {curse} from "../model/createCurse"
const app = express();


app.use(express.json());


const categories:curse[] = [];

app.post('/curse', (req, res) => {

});

app.get('/curse', (req, res) => {
  return res.json({categories});
});


app.listen(3333, () => {
  console.log("Servidor rodando na porta 3333");
});
