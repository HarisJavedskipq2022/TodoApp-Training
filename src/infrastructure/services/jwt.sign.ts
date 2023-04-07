import * as jwt from 'jsonwebtoken'

export async function sign(payload: object, key: string, expiry: any) {
      return jwt.sign(payload, key, expiry)
}
