import { User } from '../entity/UserEntity'

export interface IUserRepository {
  deleteUser(id: string): Promise<User>
  findUserByEmail(email: string): Promise<User | null>
  findUserbyId(id: string): Promise<User | null>
  findManyUsers(): Promise<User[]>
  createUser(user: User, password: string): Promise<User>
  updateUserPassword(id: string, hashedPassword: string): Promise<User>
}
