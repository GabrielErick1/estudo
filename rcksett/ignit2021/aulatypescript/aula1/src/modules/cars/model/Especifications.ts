import { v4 as uuidv4 } from 'uuid';

class Especifications {
  id?: string;
  name: string | undefined;
  description: string | undefined;
  createdAt: Date | undefined;

  constructor() {
    if(!this.id){
         this.id = uuidv4();
        this.createdAt = new Date();
    }
  }
}

export { Especifications };