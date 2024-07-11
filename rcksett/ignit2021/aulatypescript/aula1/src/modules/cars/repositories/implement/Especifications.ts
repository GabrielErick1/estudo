import { Specifications as ModelEspecifications } from "../../entites/Especifications";
import { CreatEspecificationsDTO, inverseDependecyEspecifications } from "./../inverseDependecyEspecifications";
import {Repository} from "typeorm"
import { AppDataSource } from "../../../../database/data_source";


export class Especifications implements inverseDependecyEspecifications {
   private dataEspecificatios: Repository<ModelEspecifications>;

   constructor(){
    this.dataEspecificatios = AppDataSource.getRepository(ModelEspecifications);
   }
  async Create({ name, description }: CreatEspecificationsDTO): Promise<void> {
    const createEspecificatios = this.dataEspecificatios.create({ name, description })
    await this.dataEspecificatios.save(createEspecificatios)
  }
  async ViweEspecifications(): Promise<ModelEspecifications[]> {
    const ViweEspecifications = await this.dataEspecificatios.find();
    return ViweEspecifications;
  }
  async FindByName(name: string): Promise<ModelEspecifications> {
    const findEspecificatios = await this.dataEspecificatios.findOne({ where: { name } });
    return findEspecificatios;
  }
}