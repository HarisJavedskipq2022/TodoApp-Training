import { UserRepository } from '../../infrastructure/repositories/UserRepository'
import { Encryption } from '../../infrastructure/services/EncryptionService'
import { sign } from 'jsonwebtoken'
import config from '../../infrastructure/config/config'
import { injectable } from 'inversify'

@injectable()
export class AuthService {
      private userRepository: UserRepository

      constructor(userRepository: UserRepository) {
            this.userRepository = userRepository
      }

      async login(email: string, password: string) {
            const user = await this.userRepository.findUserByEmail(email)

            if (!user) {
                  throw new Error('User not found')
            }
            const validatePassword = await Encryption.comparePassword(password, user.password)

            if (!validatePassword) {
                  throw new Error('Invalid credentials')
            }

            const secretKey = config.jwtSecretKey
            const expiresIn = '1h'
            return sign({ id: user.id, email: user.email }, secretKey, { expiresIn })
      }
}
