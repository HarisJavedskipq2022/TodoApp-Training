import * as bcrypt from 'bcrypt'
import { injectable } from 'inversify'

export interface IEncryption {
  comparePassword(password: string, hashedPassword: string): Promise<boolean>
  hashPassword(password: string): Promise<string>
}

@injectable()
export class Encryption implements IEncryption {
  comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword)
  }

  async hashPassword(password: string) {
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    return bcrypt.hash(password, salt)
  }
}
