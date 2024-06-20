"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createCurse_1 = __importDefault(require("../model/createCurse"));
class CreateRoutes {
    app(req, res) {
        createCurse_1.default.execute({
            name: "gabriel",
            description: "javascript",
            duration: 8,
            education: "eu mesmo"
        });
        return res.send();
    }
}
exports.default = new CreateRoutes();
