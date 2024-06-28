import {Especifications} from "../model/Especifications"


interface  CreatEspecificationsDTO {
  name: string;
  description: string;
}
interface inverseDependecyEspecifications {
   Create({name, description}: CreatEspecificationsDTO): void
   ViweEspecifications(): Especifications[]
   FindByName(name: string): Especifications;
}

export { CreatEspecificationsDTO, inverseDependecyEspecifications };