import { Request, Response, NextFunction } from 'express'
import config from '../../../../config'
import { Jwt } from '../../../infrastructure/services/jwt'

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
