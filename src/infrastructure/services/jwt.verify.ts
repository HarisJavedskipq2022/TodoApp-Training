import * as jwt from 'jsonwebtoken'

export async function verify(token: string, key: string) {
      return jwt.verify(token, key)
}
