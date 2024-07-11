import { v4 as uuidv4 } from 'uuid';
import {Column, CreateDateColumn, Entity, PrimaryColumn} from "typeorm"
@Entity("users")
export class usres {

  @PrimaryColumn()
  id?: string;

  @Column()
  name!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  username!: string;
  
  @Column()
  password!: string;

  @Column()
  email!: string

  @Column()
  driverLicense!: string

  @Column()
  isAdmin?: boolean;

  constructor(){
    if(!this.id){
      this.id = uuidv4();
    }
  }
}