import { IUserRepository } from './../../domain/interfaces/UserInterface'
import { IEncryption } from '../../infrastructure/services/EncryptionService'
import { IJwt } from '../../infrastructure/services/JwtService'
import { injectable, inject } from 'inversify'

@injectable()
export class AuthService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('Jwt') private jwt: IJwt,
    @inject('Encryption') private encryption: IEncryption
  ) {}

  async login(email: string, password: string) {
    const user = await this.userRepository.findUserByEmail(email)

    if (!user) {
      throw new Error('User not found')
    }
    const validatePassword = await this.encryption.comparePassword(password, user.password)

    if (!validatePassword) {
      throw new Error('Invalid credentials')
    }

    return this.jwt.sign({ id: user.id, email: user.email })
  }
}
