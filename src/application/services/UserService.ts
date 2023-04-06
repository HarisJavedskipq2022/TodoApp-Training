import { User } from '../../domain/entity/UserEntity'
import uuid from '../../domain/utility/uuid'
import config from '../../../config'
import { Auth } from '../../infrastructure/services/bcrypt'
import { IUserRepository } from '../../domain/interfaces/UserInterface'
import { inject, injectable } from 'inversify'
import { Jwt } from '../../infrastructure/services/jwt'

@injectable()
class UserService {
      constructor(@inject('UserRepository') private userRepository: IUserRepository) {}

      async readUsers() {
            try {
                  return await this.userRepository.findManyUsers()
            } catch (e) {
                  throw new Error('Users not found')
            }
      }

      async deleteUserById(id: string) {
            const user = await this.userRepository.findUserbyId(id)
            if (!user) {
                  throw new Error('User does not exist')
            }
            return this.userRepository.deleteUser(id)
      }

      async signUp(email: string, password: string) {
            const id = uuid()
            const createdUser = User.userFactory({ id, email, password })
            const finduser = await this.userRepository.findUserByEmail(createdUser.email)

            if (finduser) {
                  throw new Error('User already exists')
            }

            const hashedPassword = await Auth.hashPassword(createdUser.password)

            return this.userRepository.createUser(createdUser, hashedPassword)
      }

      async loginUser(email: string, password: string): Promise<string> {
            const user = await this.userRepository.findUserByEmail(email)

            if (!user) {
                  throw new Error('User not found')
            }
            const validatePassword = await Auth.comparePassword(password, user.password)

            if (!validatePassword) {
                  throw new Error('Invalid credentials')
            }

            const secretKey = config.jwtSecretKey
            const expiresIn = '1h'
            return Jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn })
      }
}

export default UserService