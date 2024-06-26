"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseDir = exports.newPool = exports.pool = void 0;
const pg_1 = require("pg");
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const databaseDir = path.resolve(__dirname, '..', '..', 'database.db');
exports.databaseDir = databaseDir;
fs.ensureDirSync(databaseDir);
const pool = new pg_1.Pool({
    user: 'root',
    host: 'localhost',
    password: '',
    port: 5432,
});
exports.pool = pool;
const newPool = new pg_1.Pool({
    user: 'root',
    host: 'localhost',
    database: 'Harvelao',
    password: '',
    port: 5432,
});
exports.newPool = newPool;
