import { CustomError } from './CustomError';

class InternalServerError extends CustomError {
  constructor() {
    super(500, 'Internal server error');
  }
}

export { InternalServerError };
