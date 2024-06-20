"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routers_1 = __importDefault(require("../routers/routers"));
const app = (0, express_1.default)();
app.get('/', routers_1.default.app);
app.listen(3333, () => {
    console.log("Servidor rodando na porta 3333");
});
