import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "1234567",
  database: process.env.DB_NAME || "harvel",
  synchronize: true,
  logging: true,
  entities: ["src/database/entities/*.ts"],
  migrations: ["src/database/migrations/*.ts"]
});
export { AppDataSource };
