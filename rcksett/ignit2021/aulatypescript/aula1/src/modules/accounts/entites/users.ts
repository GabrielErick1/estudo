import { v4 as uuidv4 } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"

@Entity("users")
export class AccountUser {

  @PrimaryColumn()
  id?: string;

  @Column()
  name!: string;

  @Column()
  password!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  username!: string;

  @Column()
  email!: string;
  
  @Column()
  avatar?: string;

  @Column()
  driver_licence?: string;

  @Column({ default: false })
  isAdmin!: boolean;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
