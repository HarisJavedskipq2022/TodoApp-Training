import { User } from '../entity/UserEntity'

export interface IUserRepository {
  delete(id: string): Promise<User>
  getByEmail(email: string): Promise<User | null>
  getById(id: string): Promise<User | null>
  getAll(): Promise<User[]>
  create(user: User, password: string): Promise<User>
  updatePassword(id: string, hashedPassword: string): Promise<User>
}
