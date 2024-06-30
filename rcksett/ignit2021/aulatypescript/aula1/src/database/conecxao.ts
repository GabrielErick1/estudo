import { DataSource } from "typeorm";
import 'dotenv/config';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.HOST,
    port: Number(process.env.PORT) || 5432,  
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    synchronize: false,
    logging: false,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/database/migrations/*.ts"]
});
