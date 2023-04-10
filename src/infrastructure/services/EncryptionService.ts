import * as bcrypt from 'bcrypt'

export class Encryption {
      static async comparePassword(password: string, hashedPassword: string) {
            return bcrypt.compare(password, hashedPassword)
      }

      static async hashPassword(password: string) {
            const saltRounds = 10
            const salt = await bcrypt.genSalt(saltRounds)
            return bcrypt.hash(password, salt)
      }
}
