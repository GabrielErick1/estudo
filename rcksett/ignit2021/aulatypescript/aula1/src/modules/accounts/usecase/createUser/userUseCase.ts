import {InterfaceAccount, DataAccount}  from "../../repositories/IusersInterface"

class AccountUsercase   {

  constructor(private DataAccountService: InterfaceAccount){}
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
      const userALL = await this.DataAccountService.CreateAccount({email,name,username,password,driver_licence})
    }catch(err: unknown){
      if (typeof err === 'string') {
        throw new Error(err);
      } else {
        throw err;
      }
    }
  }
}