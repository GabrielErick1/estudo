import { v4 as uuidv4 } from 'uuid';

import {Column, CreateDateColumn, Entity, PrimaryColumn} from "typeorm"

@Entity("categories")
class Category {
  @PrimaryColumn()
  id?: string;
  @Column()
  name!: string;
  @Column()
  description!: string;
  @CreateDateColumn()
  createdAt!: Date;

  constructor() {
    if(!this.id){
         this.id = uuidv4();
        this.createdAt = new Date();
    }
  }
}

export { Category };
