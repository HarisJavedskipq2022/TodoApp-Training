import { User } from '../../domain/entity/UserEntity'
import { IEncryption } from '../../infrastructure/services/EncryptionService'
import { IUserRepository } from '../../domain/interfaces/UserInterface'
import { inject, injectable } from 'inversify'
import { Observer } from '../../domain/interfaces/ObserverInterface'
import { slackService } from '../../infrastructure/services/SlackNotificationService'
import { statusCode } from '../utils/Status'
import HttpResponse from '../utils/Response'
import { responseMessage } from '../utils/Status'

@injectable()
export class UserService {
  private observers: Observer[] = []
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('Encryption') private encryption: IEncryption
  ) {}

  addObserver(observer: Observer): void {
    this.observers.push(observer)
  }

  removeObserver(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer)
  }

  notifyObservers(event: string, data: any): void {
    console.log(`Event: ${event}`, data)
    this.observers.forEach((observer) => observer.update(event, data))
    slackService(event, data)
  }

  async getAll() {
    try {
      const result = await this.userRepository.getAll()
      return HttpResponse.create(statusCode.OK, result)
    } catch (e) {
      console.error({ e })
      return HttpResponse.create(statusCode.NOT_FOUND, { message: responseMessage.NOT_FOUND[1] })
    }
  }

  async deleteById(id: string) {
    try {
      const user = await this.userRepository.getById(id)
      if (!user) {
        return HttpResponse.create(statusCode.NOT_FOUND, { message: responseMessage.NOT_FOUND[0] })
      }
      this.notifyObservers('A Todo has been deleted with id ', [user.id])
      const result = await this.userRepository.delete(id)
      return HttpResponse.create(statusCode.OK, { message: responseMessage.Success[1], result })
    } catch (e) {
      console.error({ e })
      return HttpResponse.create(statusCode.SERVER_ERROR, { message: responseMessage.SERVER_ERROR })
    }
  }

  async create(id: string, email: string, password: string) {
    try {
      const createdUser = User.userFactory({ id, email, password })
      const finduser = await this.userRepository.getByEmail(createdUser.email)

      if (finduser) {
        return HttpResponse.create(statusCode.ALREADY_TAKEN, { message: responseMessage.ALREADY_TAKEN })
      }

      const hashedPassword = await this.encryption.hashPassword(createdUser.password)
      const result = await this.userRepository.create(createdUser, hashedPassword)
      return HttpResponse.create(statusCode.CREATED, { message: responseMessage.Success[0], result })
    } catch (e) {
      console.error({ e })
      return HttpResponse.create(statusCode.SERVER_ERROR, { message: responseMessage.SERVER_ERROR })
    }
  }

  async updatePassword(id: string, newPassword: string) {
    try {
      const user = await this.userRepository.getById(id)

      if (!user) {
        return HttpResponse.create(statusCode.NOT_FOUND, { message: responseMessage.NOT_FOUND[0] })
      }

      const hashedPassword = await this.encryption.hashPassword(newPassword)
      await this.userRepository.updatePassword(id, hashedPassword)
      this.notifyObservers('A user password has been updated with id ', [user.id])
      return HttpResponse.create(statusCode.OK, { message: responseMessage.Success[2] })
    } catch (e) {
      console.error({ e })
      return HttpResponse.create(statusCode.SERVER_ERROR, { message: responseMessage.SERVER_ERROR })
    }
  }
}
