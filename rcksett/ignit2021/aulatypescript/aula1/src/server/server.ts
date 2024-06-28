import express from "express";
import rotas from  "../routers/routers"
import swaggerUi from "swagger-ui-express"
import swaggerFile from "../swagger.json"
import "../database/index"
const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))


app.use(rotas );

app.listen(3333, () => {
  console.log("Servidor rodando na porta 3333");
});
