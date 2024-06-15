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
exports.PostUser = void 0;
const prisma_1 = require("../configs/prisma/prisma");
const EmailExistsError_1 = require("../Errors/EmailExistsError");
const InternalServerError_1 = require("../Errors/InternalServerError");
const handleErrorResponse_1 = require("../utils/handleErrorResponse");
class PostUser {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            try {
                const user = yield prisma_1.prisma.users.create({
                    data: {
                        name,
                        email,
                        password,
                    },
                });
                res.status(201).json(user);
            }
            catch (error) {
                if (error.code === 'P2002') {
                    const emailExistsError = new EmailExistsError_1.EmailExistsError();
                    (0, handleErrorResponse_1.handleErrorResponse)(res, emailExistsError);
                }
                else {
                    const internalServerError = new InternalServerError_1.InternalServerError();
                    (0, handleErrorResponse_1.handleErrorResponse)(res, internalServerError);
                }
            }
        });
    }
}
exports.PostUser = PostUser;
