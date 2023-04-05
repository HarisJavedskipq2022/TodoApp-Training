import { Request, Response, NextFunction } from 'express'
import 'dotenv/config'
import { Jwt } from '../../../application/services/jwt'

export class authMiddleware {
      static authorize = (req: Request, res: Response, next: NextFunction) => {
            try {
                  const token: string | any = req.header('Authorization')

                  const decode = Jwt.verify(token, process.env.JWT_SECRET_KEY as string)
                  req.body.user = decode

                  next()
            } catch (e) {
                  res.status(401).send({ msg: 'You need to login' })
            }
      }
}