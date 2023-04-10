import { Jwt } from './../../../infrastructure/services/JwtService'
import { Request, Response, NextFunction } from 'express'
import config from '../../../infrastructure/config/config'

export class authMiddleware {
      static authorize = (req: Request, res: Response, next: NextFunction) => {
            try {
                  const token: string | any = req.header('Authorization')

                  const decode = Jwt.verify(token, config.jwtSecretKey)
                  req.body.user = decode

                  next()
            } catch (e) {
                  res.status(401).send({ msg: 'You need to login' })
            }
      }
}
