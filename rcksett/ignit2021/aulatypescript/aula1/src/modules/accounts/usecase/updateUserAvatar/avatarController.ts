import {container} from "tsyringe"
import {Request, Response} from "express"
import {avatarUsecase} from "./avatarUsecase"
export class AvatarController {
    async updateUserAvatar(req: Request, res: Response): Promise<Response> {
            const avatar_file = req.file?.filename;        
            const {id} = req.user
            const createAvatar = container.resolve(avatarUsecase);
            if(avatar_file){
              await createAvatar.execute({ user_id: id,  avatar_file });  
            }
            return res.status(201).send();
    }
}