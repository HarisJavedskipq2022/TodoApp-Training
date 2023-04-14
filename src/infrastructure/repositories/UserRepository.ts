import { PrismaClient } from '@prisma/client'
import { injectable } from 'inversify'
import { User } from '../../domain/entity/UserEntity'
import { IUserRepository } from '../../domain/interfaces/UserInterface'

const prisma = new PrismaClient()

@injectable()
export class UserRepository implements IUserRepository {
  constructor() {}

  async delete(id: string) {
    return prisma.user.delete({ where: { id } })
  }

  async getByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } })
  }

  async getById(id: string) {
    return prisma.user.findUnique({ where: { id } })
  }

  async getAll() {
    return prisma.user.findMany()
  }

  async create(user: User, password: string) {
    const createdUser = prisma.user.create({ data: { ...user, password } })
    return createdUser
  }

  async updatePassword(id: string, hashedPassword: string) {
    return prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    })
  }
}
