import { inverseDependecyEspecifications} from "../../repositories/inverseDependecyEspecifications"
import {Specifications} from "../../entites/Especifications"
export class EspecializationUsecase {
  constructor(private Especializations: inverseDependecyEspecifications){}

  async execulte(): Promise<Specifications[]>{
    const especifications = await this.Especializations.ViweEspecifications()
    return especifications;
  }
}