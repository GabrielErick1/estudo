import { expect, describe, it } from "vitest";
import { RegisterUsecase } from "../users/registerUseCase";
import {InMemoryUsersRepository} from "@/repositories/in-memory/CreateUserInMemory"
import { compare } from "bcrypt";
import { AppError } from "@/utils/AppError";

describe('registrar caso de uso', () => {
  it('a senha do usuário deve ser hash assim', async () => {
    const userRepository = new InMemoryUsersRepository();
    const useCaseRegister = new RegisterUsecase(userRepository)
    const user = await useCaseRegister.execute({
      email: 'teste@tddddfeste.com',
      name: 'tesdffte',
      password: 'teste123' 
    });

    
    const passwordCorretoHash = await compare(
      'teste123',
      user.user.password 
    );

    expect(passwordCorretoHash).toBe(true);
  });
});

describe('registrar caso de uso', () => {
    it('o email nao podera se repeti', async () => {
      const userRepository = new InMemoryUsersRepository();
      const useCaseRegister = new RegisterUsecase(userRepository)
      
      const  email = 'teste@tddddfeste.com';
      const user = await useCaseRegister.execute({
        email: 'teste@tddddfeste.com',
        name: 'tesdffte',
        password: 'teste123' 
      });
  
      
  
    await expect(() => useCaseRegister.execute({
        email: 'teste@tddddfeste.com',
        name: 'tesdffte',
        password: 'teste123' 
      })).rejects.toBeInstanceOf(AppError)
    });
  });




  describe('registrar caso de uso', () => {
    it('o usuario  devera se cadastar', async () => {
      const userRepository = new InMemoryUsersRepository();
      const useCaseRegister = new RegisterUsecase(userRepository)
      
   
      const {user} = await useCaseRegister.execute({
        email: 'teste@tddddfeste.com',
        name: 'tesdffte',
        password: 'teste123' 
      });
      
      expect(user.id).toEqual(expect.any(String))
    });
  });
