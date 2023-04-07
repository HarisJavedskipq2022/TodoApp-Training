import * as bcrypt from 'bcrypt'

export async function hashPassword(password: string) {
      const saltRounds = 10
      const salt = await bcrypt.genSalt(saltRounds)
      return bcrypt.hash(password, salt)
}
