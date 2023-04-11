import * as jwt from 'jsonwebtoken'
import config from '../config'
import { injectable } from 'inversify'

export interface IJwt {
  sign(payload: object): string
  verify(token: string, key: string): any
}

@injectable()
export class Jwt implements Jwt {
  sign(payload: object) {
    return jwt.sign(payload, config.jwt.jwtSecretKey, { expiresIn: '10h' })
  }

  verify(token: string, key: string) {
    return jwt.verify(token, key)
  }
}
