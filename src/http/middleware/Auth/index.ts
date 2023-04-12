import { Request, Response, NextFunction } from 'express'
import config from '../../../infrastructure/config'
import { inject, injectable } from 'inversify'
import { IJwt } from '../../../infrastructure/services/JwtService'

@injectable()
export class AuthMiddleware {
  constructor(@inject('Jwt') private jwt: IJwt) {}

  authorize = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header('Authorization')

      // console.log('token -------------------> ', token)
      // console.log('test ------------> ', this)

      const decode = this.jwt.verify(token as string, config.jwt.jwtSecretKey as string)
      req.body.user = decode

      next()
    } catch (e) {
      console.log({ e })
      res.status(401).send({ msg: 'You need to login' })
    }
  }
}
