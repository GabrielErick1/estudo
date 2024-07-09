import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

 console.log();
 
const AppDataSource = new DataSource({
  type: "postgres" || "db",
  host: "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "1234567",
  database: process.env.DB_NAME || "harvel",
  synchronize: true,
  entities: ["./src/modules/cars/entites/*.ts"],
  migrations: ["./src/database/migrations/*.ts"]
});
export { AppDataSource };
