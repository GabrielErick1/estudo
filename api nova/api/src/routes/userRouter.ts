import { Router } from 'express';
import { PostUser } from '../controllers/UserController';
const {createUser} = new PostUser()
const userRouter: Router = Router();

userRouter.post('/user', createUser);

export { userRouter };
