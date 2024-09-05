import { prisma } from "@/lib/prisma";
import { InterfaceAccount } from "../prismaInterfaceUsers";
import { Prisma } from "@prisma/client";
  
export class repositoryUser implements InterfaceAccount{
async FindByEmail(email: string) {
    const existEmail = await prisma.user.findUnique({
        where: {
            email
        }
    })
   return existEmail
}

async CreateAccount(data: Prisma.UserCreateInput){
      const user =  await prisma.user.create({
            data
        })
        return user;
    }
}
    

