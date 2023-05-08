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
      const result = await this.userRepository.getAll()
      return { error: null, result }
    } catch (e) {
      return { error: 'Users not found', result: null }
    }
  }

  async deleteById(id: string) {
    try {
      const user = await this.userRepository.getById(id)
      if (!user) {
        return { error: 'User does not exist', result: null }
      }
      this.notifyObservers('A Todo has been deleted with id ', [user.id])
      const result = await this.userRepository.delete(id)
      return { error: null, result }
    } catch (e) {
      return { error: 'Error deleting user', result: null }
    }
  }

  async create(id: string, email: string, password: string) {
    try {
      const createdUser = User.userFactory({ id, email, password })
      const finduser = await this.userRepository.getByEmail(createdUser.email)

      if (finduser) {
        return { error: 'User already exists', result: null }
      }

      const hashedPassword = await this.encryption.hashPassword(createdUser.password)
      const result = await this.userRepository.create(createdUser, hashedPassword)
      return { error: null, result }
    } catch (e) {
      return { error: 'Error creating user', result: null }
    }
  }

  async updatePassword(id: string, newPassword: string) {
    try {
      const user = await this.userRepository.getById(id)

      if (!user) {
        return { error: 'User does not exist', result: null }
      }

      const hashedPassword = await this.encryption.hashPassword(newPassword)
      await this.userRepository.updatePassword(id, hashedPassword)
      this.notifyObservers('A user password has been updated with id ', [user.id])
      return { error: null, result: true }
    } catch (e) {
      return { error: 'Error updating password', result: null }
    }
  }
}
