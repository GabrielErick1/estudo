"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const { createUser } = new UserController_1.PostUser();
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.post('/user', createUser);
