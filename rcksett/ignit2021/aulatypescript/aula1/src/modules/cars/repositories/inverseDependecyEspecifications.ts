import {Specifications} from "../entites/Especifications"


interface  CreatEspecificationsDTO {
  name: string;
  description: string;
}
interface inverseDependecyEspecifications {
   Create({name, description}: CreatEspecificationsDTO): Promise<void>;
   ViweEspecifications(): Promise<Specifications[]>;
   FindByName(name: string): Promise<Specifications>;
}

export { CreatEspecificationsDTO, inverseDependecyEspecifications };