import * as jwt from 'jsonwebtoken'

export class Jwt {
      static async sign(payload: object, key: string, expiry: any) {
            return jwt.sign(payload, key, expiry)
      }

      static async verify(token: string, key: string) {
            return jwt.verify(token, key)
      }
}
