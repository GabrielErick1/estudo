"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
function createTables() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = yield db_1.newPool.connect();
            // Crie o tipo ENUM para a coluna role
            yield client.query(`
      DO $$ BEGIN
      CREATE TYPE user_role AS ENUM ('admin', 'user', 'advertiser');
      EXCEPTION
      WHEN duplicate_object THEN null;
      END $$;
    `);
            // Crie a tabela de usuários
            yield client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        role user_role NOT NULL DEFAULT 'user'
      );
    `);
            console.log('Tabela de usuários criada com sucesso!');
            client.release();
        }
        catch (err) {
            console.error('Erro ao criar a tabela de usuários:', err);
            throw err;
        }
        finally {
            yield db_1.newPool.end();
        }
    });
}
createTables();
