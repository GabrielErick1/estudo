import fs from 'fs';
import csvParse from 'csv-parse';
import {RepositoryInverse}  from "../../repositories/InverseDependencyRepository"

interface  importCategori {
  name: string;
  description: string;
}

export class FileCategoryUseCase {
   constructor(private categoriesRepository: RepositoryInverse){}

   loadCategories(file: Express.Multer.File): Promise<importCategori[]> {
     return new Promise((resolve, reject) => {
       const stream = fs.createReadStream(file.path);
       const categories: importCategori[] = [];
       const parseFile = csvParse.parse();
       stream.pipe(parseFile);
       
       parseFile.on('data', (line: string[]) => {
         const [name, description] = line;
         categories.push({ name, description });
       }).on('end', () => {
        resolve(categories);
      }).on('error', (error: Error) => {
        reject(error);
      });
     })
   }
  async execute(file: Express.Multer.File): Promise<void> {
   const responseCategorie = await this.loadCategories(file)
    responseCategorie.map(({name, description}) => {
      const existingCategories = this.categoriesRepository.findByName(name)
      if(!existingCategories){
        this.categoriesRepository.Create({name, description});
      }
    })
   };
}
