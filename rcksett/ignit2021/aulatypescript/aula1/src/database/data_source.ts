import { createConnection } from "typeorm";
import 'dotenv/config';

createConnection({
  type: "postgres",
  host: process.env.DB_HOST || "db",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "1234567",
  database: process.env.DB_NAME || "harvel",
  entities: ["./src/modules/**/entities/*.ts"],
  migrations: ["./src/database/migrations/*.ts"],
  cli: {
    migrationsDir: "./src/database/migrations"
  },
  synchronize: false,
  logging: false,
})
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
