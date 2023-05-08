import config from '../config'
import { injectable } from 'inversify'
import passport = require('passport')
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { User } from '../../domain/entity/UserEntity'
import * as jwt from 'jsonwebtoken'

export interface IJwt {
  sign(payload: object): string
  verify(token: string, key: string): any
}

@injectable()
export class Jwt implements IJwt {
  constructor() {
    const opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwt.jwtSecretKey,
    }

    passport.use(
      new JwtStrategy(opts, (jwtPayload, done) => {
        if (jwtPayload) {
          return done(null, jwtPayload)
        }
        return done(null, false)
      })
    )
  }

  sign(payload: object) {
    return jwt.sign(payload, config.jwt.jwtSecretKey, { expiresIn: '10h' })
  }

  verify(token: string, key: string): any {
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, (err: any, user: User) => {
        if (err) {
          reject(err)
        } else {
          resolve(user)
        }
      })({ headers: { authorization: `Bearer ${token}` } })
    })
  }
}
