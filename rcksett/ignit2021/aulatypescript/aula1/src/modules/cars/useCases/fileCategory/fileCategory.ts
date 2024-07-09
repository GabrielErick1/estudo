import { Request, Response } from 'express';
import { FileCategoryUseCase } from './CategoryUsecaase';
import { container } from 'tsyringe';

class fileCategory {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { file } = req;
      if (!file) {
        return res.status(400).json({ message: 'Arquivo não encontrado' });
      }

      const fileCategoryService = container.resolve(FileCategoryUseCase);
      await fileCategoryService.execute(file);
      return res.status(201).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }
}

export { fileCategory };
