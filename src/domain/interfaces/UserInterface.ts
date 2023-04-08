import { User } from '../entity/UserEntity'
import { Observer } from './ObserverInterface'

export interface IUserRepository {
      addObserver(observer: Observer): void
      removeObserver(observer: Observer): void
      notifyObservers(event: string, data: any): void
      deleteUser(id: string): Promise<User>
      findUserByEmail(email: string): Promise<User | null>
      findUserbyId(id: string): Promise<User | null>
      findManyUsers(): Promise<User[]>
      createUser(user: User, password: string): Promise<User>
}
