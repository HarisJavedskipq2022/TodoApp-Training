import * as jwt from 'jsonwebtoken'

export class Jwt {
      static sign(payload: object, key: string, expiry: any): string {
            return jwt.sign(payload, key, expiry)
      }

      static verify(token: string, key: string) {
            return jwt.verify(token, key)
      }
}
