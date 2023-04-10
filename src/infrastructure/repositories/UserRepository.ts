import { PrismaClient } from '@prisma/client'
import { injectable } from 'inversify'
import { User } from '../../domain/entity/UserEntity'
import { IUserRepository } from '../../domain/interfaces/UserInterface'
import { Observer } from '../../domain/interfaces/ObserverInterface'
import { slackNotif } from '../services/slackNotify'

const prisma = new PrismaClient()

@injectable()
export class UserRepository implements IUserRepository {
      constructor() {}

      async deleteUser(id: string) {
            return prisma.user.delete({ where: { id } })
      }

      async findUserByEmail(email: string) {
            return prisma.user.findUnique({ where: { email } })
      }

      async findUserbyId(id: string) {
            return prisma.user.findUnique({ where: { id } })
      }

      async findManyUsers() {
            return prisma.user.findMany()
      }

      async createUser(user: User, password: string) {
            const createdUser = prisma.user.create({ data: { ...user, password } })
            return createdUser
      }
}
