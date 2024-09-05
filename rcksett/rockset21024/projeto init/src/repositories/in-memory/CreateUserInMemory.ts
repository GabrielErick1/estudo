import { User, Prisma } from '@prisma/client'
import { InterfaceAccount } from '../prismaInterfaceUsers'

export class InMemoryUsersRepository implements InterfaceAccount {
  public items: User[] = []

  async FindByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async CreateAccount(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password: data.password,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }
}