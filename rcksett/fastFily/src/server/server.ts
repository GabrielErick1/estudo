import fastfily from "fastify";
import { knex } from "../conectDatabse";

const app = fastfily();

app.get("/", async () => {
  const test = await knex('sqlite_schema').select('*')
  return test;
});

app.listen({
  port: 3333,
}).then(()=>{
  console.log("online na porta 3333");
})