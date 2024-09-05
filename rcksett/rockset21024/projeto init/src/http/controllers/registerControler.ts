import { FastifyReply, FastifyRequest } from 'fastify';
import { zod } from '@/lib/prisma';
import { RegisterUsecase } from '@/usecases/users/registerUseCase';
import { repositoryUser } from "@/repositories/implements/prismaUsersRepository";
import { AppError } from '@/utils/AppError';

export const Register = async (req: FastifyRequest, res: FastifyReply) => {
  const registerBodySchema = zod.object({
    name: zod.string().min(2).max(60),
    email: zod.string().email().min(8).max(100),
    password: zod.string().min(6).max(100),
  });
  
  const { email, name, password } = registerBodySchema.parse(req.body);

  try {
    const userRepo = new repositoryUser();
    const registerRepository = new RegisterUsecase(userRepo);
    
    await registerRepository.execute({ email, name, password }); 
    
    res.status(201).send({ message: "User registered successfully" });

  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).send({ message: err.message });
    } else {
      return res.status(500).send({ message: "Internal server error" });
    }
  }
};
