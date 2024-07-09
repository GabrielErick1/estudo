import fs from 'fs';
import csvParse from 'csv-parse';
import { RepositoryInverse } from '../../repositories/InverseDependencyRepository';
import { inject, injectable } from 'tsyringe';

interface ImportCategory {
  name: string;
  description: string;
}

@injectable()
export class FileCategoryUseCase {
  constructor(
    @inject('categoriesRepositories')
    private categoriesRepository: RepositoryInverse
  ) {}

  loadCategories(file: Express.Multer.File): Promise<ImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: ImportCategory[] = [];
      const parseFile = csvParse.parse();

      stream.pipe(parseFile);

      parseFile.on('data', (line: string[]) => {
        const [name, description] = line;
        categories.push({ name, description });
      }).on('end', () => {
        fs.promises.unlink(file.path);
        resolve(categories);
      }).on('error', (error: Error) => {
        reject(error);
      });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async ({ name, description }) => {
      
        const existingCategory = await this.categoriesRepository.findByName(name);

        if (!existingCategory) {
          await this.categoriesRepository.Create({ name, description });
        }
     
    });

    
  }
}
