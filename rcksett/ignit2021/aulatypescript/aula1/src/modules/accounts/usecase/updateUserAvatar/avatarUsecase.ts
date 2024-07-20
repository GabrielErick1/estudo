import { InterfaceAccount } from "../../repositories/IusersInterface";
import { inject, injectable } from "tsyringe";
import {deleteFile} from "../../../../utils/file"
interface IRequest {
  user_id: string;
  avatar_file: string;
}
@injectable()
export class avatarUsecase {
    constructor(
      @inject("Accounts")
      private accountAvatar: InterfaceAccount){}
   async execute({user_id, avatar_file}: IRequest): Promise<void>{
  
    const user = await this.accountAvatar.FindById(user_id)
    await deleteFile(`./tmp/avatar/${user.avatar}`)
    user.avatar = avatar_file
   await this.accountAvatar.CreateAccount(user)
  }
}