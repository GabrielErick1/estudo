import { Especifications as ModelEspecifications } from "../model/Especifications";
import { CreatEspecificationsDTO, inverseDependecyEspecifications } from "./inverseDependecyEspecifications";

export class Especifications implements inverseDependecyEspecifications {
   private dataEspecificatios: ModelEspecifications[];

   constructor(){
    this.dataEspecificatios = [];
   }
  FindByName(name: string): ModelEspecifications {
    const dataEspecificatios = this.dataEspecificatios.find(e => e.name === name);
    return dataEspecificatios
  }

  Create({name, description  }: CreatEspecificationsDTO): void {
    const newEspecidications: ModelEspecifications = new ModelEspecifications();
    Object.assign(newEspecidications, {
      name,
      description
    });

    this.dataEspecificatios.push(newEspecidications);
  }
  ViweEspecifications(): ModelEspecifications[] {
    const data  = this.dataEspecificatios
    return data;
  }

}