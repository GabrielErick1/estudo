import {hash} from 'bcrypt'
import {InterfaceAccount} from "@/repositories/prismaInterfaceUsers"
import { AppError } from '@/utils/AppError';
import { User } from '@prisma/client';
interface registerInterface {
    email: string;
    name: string;
    password: string;
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUsecase {
    constructor(private UserRepository:  InterfaceAccount){}
   async execute({email,name,password}: registerInterface) : Promise<RegisterUseCaseResponse> {
   
        const hashPassword = await hash(password, 5);

       const existEmail = await this.UserRepository.FindByEmail(email)
       if (existEmail) {
        throw new AppError("Email already exists", 409); 
      }
      const user =  await this.UserRepository.CreateAccount({email, name, password: hashPassword})
      return {user};
   }
}
