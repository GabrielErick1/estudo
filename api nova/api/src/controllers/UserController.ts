import { Request, Response } from 'express';
import { prisma } from '../configs/prisma/prisma'; 
import { EmailExistsError } from '../Errors/EmailExistsError'; 
import { InternalServerError } from '../Errors/InternalServerError'
import { handleErrorResponse } from '../utils/handleErrorResponse'; 
interface User {
  name: string;
  email: string;
  password: string;
}

class PostUser {
  async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body as User;

    try {
      const user = await prisma.users.create({
        data: {
          name,
          email,
          password,
        },
      });
      res.status(201).json(user);
    } catch (error: any) {
      if (error.code === 'P2002') {
        const emailExistsError = new EmailExistsError();
        handleErrorResponse(res, emailExistsError);
      } else {
        const internalServerError = new InternalServerError();
        handleErrorResponse(res, internalServerError);
      }
    }
  }
}

export {PostUser}