import { Response } from 'express';
import { CustomError } from '../Errors/CustomError';

export function handleErrorResponse(res: Response, error: CustomError) {
  res.status(error.statusCode).json({ error: error.message });
}
