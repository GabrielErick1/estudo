import { inverseDependecyEspecifications} from "../../repositories/inverseDependecyEspecifications"
import {Specifications} from "../../entites/Especifications"
import {inject, injectable} from "tsyringe"
@injectable()
export class EspecializationUsecase {
  constructor(
    @inject("Especifications")
    private Especializations: inverseDependecyEspecifications){}

  async execulte(): Promise<Specifications[]>{
    const especifications = await this.Especializations.ViweEspecifications()
    return especifications;
  }
}