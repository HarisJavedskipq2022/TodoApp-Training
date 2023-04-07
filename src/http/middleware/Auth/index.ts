import { Request, Response, NextFunction } from 'express'
import config from '../../../../config'
import { verify } from '../../../infrastructure/services/jwt.verify'

export class authMiddleware {
      static authorize = (req: Request, res: Response, next: NextFunction) => {
            try {
                  const token: string | any = req.header('Authorization')

                  const decode = verify(token, config.jwtSecretKey)
                  req.body.user = decode

                  next()
            } catch (e) {
                  res.status(401).send({ msg: 'You need to login' })
            }
      }
}
