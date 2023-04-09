import { PrismaClient } from '@prisma/client'
import { injectable } from 'inversify'
import { User } from '../../domain/entity/UserEntity'
import { IUserRepository } from '../../domain/interfaces/UserInterface'
import { Observer } from '../../domain/interfaces/ObserverInterface'
import { slackNotif } from '../utils/slackNotify'

const prisma = new PrismaClient()

@injectable()
export class UserRepository implements IUserRepository {
      private observers: Observer[] = []

      constructor() {}

      addObserver(observer: Observer): void {
            this.observers.push(observer)
      }

      removeObserver(observer: Observer): void {
            this.observers = this.observers.filter((obs) => obs !== observer)
      }

      notifyObservers(event: string, data: any): void {
            console.log(`Event: ${event}`, data)
            this.observers.forEach((observer) => observer.update(event, data))
            slackNotif(event, data)
      }

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
            this.notifyObservers('A User has signed up with an email ', [(await createdUser).email])
            return createdUser
      }
}
