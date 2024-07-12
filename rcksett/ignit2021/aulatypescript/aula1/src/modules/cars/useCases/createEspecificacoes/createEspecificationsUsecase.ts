import {Especifications} from "../../repositories/implement/Especifications"
import {inject, injectable} from "tsyringe"
interface Especification {
  name: string;
  description: string;
}
@injectable()
class createEspecificationsService {
   
  constructor(
    @inject("Especifications")
    private especificationsService: Especifications){}
  async execulte({name, description}: Especification ): Promise<void> {
   const existeSpecifications = await this.especificationsService.FindByName(name)
    if(existeSpecifications){
      throw new Error("Especifications ja existem")
    }
    this.especificationsService.Create({name, description})
  }
}

export {createEspecificationsService}