import express from "express";
import rotas from  "../routers/routers"

const app = express();
app.use(express.json());

app.use(rotas );



app.listen(3333, () => {
  console.log("Servidor rodando na porta 3333");
});
