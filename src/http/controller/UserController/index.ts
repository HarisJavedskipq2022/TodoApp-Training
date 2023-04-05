import { Request, Response } from 'express'
import UserService from '../../../application/services/UserService'
import { injectable, inject } from 'inversify'

@injectable()
export class UserControllerInstance {
      constructor(@inject('UserService') private userService: UserService) {}

      read = async (req: Request, res: Response) => {
            try {
                  const record = await this.userService.readUsers()
                  return res.json(record)
            } catch (e) {
                  return res.status(500).json({
                        msg: 'unable to read users',
                        route: '/getusers',
                  })
            }
      }

      delete = async (req: Request, res: Response) => {
            try {
                  const { id } = req.params
                  const deletedUser = await this.userService.deleteUserById(id)
                  return res.json({ user: deletedUser })
            } catch (e) {
                  return res.json({
                        msg: 'User not found',
                  })
            }
      }

      signup = async (req: Request, res: Response) => {
            const { email, password }: { email: string; password: string } = req.body

            try {
                  const newUser = await this.userService.signUp(email, password)

                  return res.json({ newUser, msg: 'User successfully signed up' })
            } catch (error) {
                  return res.status(400).json({ error: 'user already exists' })
            }
      }

      login = async (req: Request, res: Response) => {
            const { email, password }: { email: string; password: string } = req.body

            try {
                  const token = await this.userService.loginUser(email, password)
                  res.json({ msg: 'successfully logged in' })
            } catch (e) {
                  res.status(401).json({ error: 'invalid credentials' })
            }
      }
}
