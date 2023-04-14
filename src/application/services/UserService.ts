import { User } from '../../domain/entity/UserEntity'
import { IEncryption } from '../../infrastructure/services/EncryptionService'
import { IUserRepository } from '../../domain/interfaces/UserInterface'
import { inject, injectable } from 'inversify'
import { Observer } from '../../domain/interfaces/ObserverInterface'
import { slackService } from '../../infrastructure/services/SlackNotificationService'

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
      return this.userRepository.findManyUsers()
    } catch (e) {
      throw new Error('Users not found')
    }
  }

  async deleteById(id: string) {
    const user = await this.userRepository.findUserbyId(id)
    if (!user) {
      throw new Error('User does not exist')
    }
    this.notifyObservers('A Todo has been deleted with id ', [user.id])
    return this.userRepository.deleteUser(id)
  }

  async create(id: string, email: string, password: string) {
    const createdUser = User.userFactory({ id, email, password })
    const finduser = await this.userRepository.findUserByEmail(createdUser.email)

    if (finduser) {
      throw new Error('User already exists')
    }

    const hashedPassword = await this.encryption.hashPassword(createdUser.password)

    return this.userRepository.createUser(createdUser, hashedPassword)
  }

  async updateUserPassword(id: string, newPassword: string) {
    const user = await this.userRepository.findUserbyId(id)

    if (!user) {
      throw new Error('User does not exist')
    }

    const hashedPassword = await this.encryption.hashPassword(newPassword)

    await this.userRepository.updateUserPassword(id, hashedPassword)

    this.notifyObservers('A user password has been updated with id ', [user.id])
  }
}
