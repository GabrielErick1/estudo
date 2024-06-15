import { CustomError } from './CustomError';

class EmailExistsError extends CustomError {
  constructor() {
    super(409, 'Este Email ja  Existe por favor defina outra Email');
  }
}

export { EmailExistsError };
