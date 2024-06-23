import {Especifications} from "../repositories/Especifications"
interface Especification {
  name: string;
  description: string;
}

class createEspecificationsService {
   private especificationsService: Especifications;
  constructor(Especifications: Especifications){
    this.especificationsService = Especifications;
  }
  execulte({name, description}: Especification ) {
    const verifyEspecifications = this.especificationsService.FindByName(name)
    if(verifyEspecifications){
      throw new Error("ja exixte esse nome")
    }
    this.especificationsService.Create({name, description})
  }
}

export {createEspecificationsService}