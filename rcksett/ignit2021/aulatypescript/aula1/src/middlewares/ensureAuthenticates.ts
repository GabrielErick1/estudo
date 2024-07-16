import { NextFunction, Request, Response } from "express";
import {verify} from "jsonwebtoken"
import {Account} from "../modules/accounts/repositories/implements/AccontUsers"
import { AppError } from "../errors/appError";
interface Ipayload {
    sub: string;
  }
export const ensureAuthenticates   = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if(!authHeader){
        throw new AppError('Invalid authorization header', 401)
    }
    
    const [, token] = authHeader.split(" ")
    try{
        const {sub: userId} = verify(token, "647431b5ca55b04fdf3c2fce31ef1915")  as Ipayload;
        const userRepository = new Account()
        const user = await userRepository.FindById(userId)
        if(!user){
            throw new AppError('User does not exist', 400)
        }
        next();
    }
    catch{
        throw new AppError('Invalid token', 401)
    }
}