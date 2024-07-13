import {InterfaceAccount}  from "../../repositories/IusersInterface"
import {inject, injectable} from "tsyringe"

interface DataAccount {
  name: string;
  username: string;
  password: string;
  email: string;
  driver_licence?: string;
}



@injectable()
 class AccountUsercase   {
 
  constructor(
    @inject("Accounts")
    private DataAccountService: InterfaceAccount){}
  async execulte({email,name,username,password,driver_licence}: DataAccount): Promise<void>{
    try {
      const existUserName = await this.DataAccountService.FindByUsername(username)
      if(existUserName){
        throw new Error("Username já existe")
      }
      const existEmail = await this.DataAccountService.FindByEmail(email)
      if(existEmail){
        throw new Error("Email já existe")
      }
      console.log('use case', {email,name,username,password,driver_licence});
      
      await this.DataAccountService.CreateAccount({email,name,username,password,driver_licence})
    }catch(err: unknown){
      if (typeof err === 'string') {
        throw new Error(err);
      } else {
        throw err;
      }
    }
  }
}

export {AccountUsercase }