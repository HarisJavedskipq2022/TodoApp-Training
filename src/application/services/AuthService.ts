import { IUserRepository } from './../../domain/interfaces/UserInterface'
import { IEncryption } from '../../infrastructure/services/EncryptionService'
import { IJwt } from '../../infrastructure/services/JwtService'
import { injectable, inject } from 'inversify'
import signale from 'signale'

@injectable()
export class AuthService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('Jwt') private jwt: IJwt,
    @inject('Encryption') private encryption: IEncryption
  ) {}

  async login(email: string, password: string) {
    let user
    try {
      user = await this.userRepository.getByEmail(email)
    } catch (e) {
      signale.error('Error during user retrieval:', e)
      return null
    }

    if (!user) {
      signale.error('User not found')
      return null
    }

    let validatePassword
    try {
      validatePassword = await this.encryption.comparePassword(password, user.password)
    } catch (e) {
      signale.error('Error during password validation:', e)
      return null
    }

    if (!validatePassword) {
      signale.error(Error, 'Invalid credentials')
      return null
    }

    let token
    try {
      token = this.jwt.sign({ id: user.id, email: user.email })
    } catch (e) {
      signale.error('Error during token generation:', e)
      return null
    }

    return token
  }
}
