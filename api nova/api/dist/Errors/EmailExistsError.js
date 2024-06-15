"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailExistsError = void 0;
const CustomError_1 = require("./CustomError");
class EmailExistsError extends CustomError_1.CustomError {
    constructor() {
        super(409, 'Este Email ja  Existe por favor defina outra Email');
    }
}
exports.EmailExistsError = EmailExistsError;
