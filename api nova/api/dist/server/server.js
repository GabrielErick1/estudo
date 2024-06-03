"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const routes_1 = require("../routes");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('tiny'));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
class App {
    constructor() {
        this.server = (0, express_1.default)();
        this.middleware();
        this.router();
    }
    middleware() {
        this.server.use(express_1.default.json());
    }
    router() {
        this.server.use(routes_1.router);
    }
}
exports.App = App;
