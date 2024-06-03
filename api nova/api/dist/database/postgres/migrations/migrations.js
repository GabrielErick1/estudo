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
function createDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = yield db_1.pool.connect();
            yield client.query('CREATE DATABASE Harvelao');
            console.log('Banco de dados criado com sucesso!');
            client.release();
        }
        catch (err) {
            if (err.code !== '42P04') {
                console.error('Erro ao criar o banco de dados:', err);
                throw err;
            }
            else {
                console.log('Banco de dados já existe.');
            }
        }
        finally {
            yield db_1.pool.end();
        }
    });
}
createDatabase();
