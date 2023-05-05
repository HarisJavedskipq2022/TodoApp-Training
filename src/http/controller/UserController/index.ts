import { AuthService } from './../../../application/services/AuthService'
import { Request, Response } from 'express'
import { UserService } from '../../../application/services/UserService'
import { injectable, inject } from 'inversify'
import { IUserController } from '../../../domain/interfaces/UserControllerInterface'
import { Logger } from '../../../infrastructure/config/logger'

@injectable()
export class UserControllerInstance implements IUserController {
  private logger: Logger
  constructor(
    @inject('UserService') private userService: UserService,
    @inject('AuthService') private authService: AuthService
  ) {
    this.logger = new Logger('UserController')
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const record = await this.userService.getAll()
      return res.json({ record })
    } catch (error) {
      this.logger.error({ error })
      return res.status(500).json({
        msg: 'unable to read users',
        route: '/getusers',
      })
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const deletedUser = await this.userService.deleteById(id)
      return res.json({ user: deletedUser })
    } catch (error) {
      this.logger.error({ error })
      return res.json({
        msg: 'User not found',
      })
    }
  }

  signup = async (req: Request, res: Response) => {
    const { id, email, password }: { id: string; email: string; password: string } = req.body

    try {
      const newUser = await this.userService.create(id, email, password)

      return res.json({ newUser, msg: 'User successfully signed up' })
    } catch (error) {
      this.logger.error({ error })
      return res.status(400).json({ error: 'user already exists' })
    }
  }

  login = async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body

    try {
      const token = await this.authService.login(email, password)

      this.logger.info(`jwt-token:${token}`)

      res.json({ msg: 'successfully logged in' })
    } catch (error) {
      this.logger.error({ error })
      res.status(401).json({ error: 'invalid credentials' })
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      const { id, newPassword } = req.body

      await this.userService.updatePassword(id, newPassword)

      res.status(200).json({ message: 'Password updated successfully' })
    } catch (error) {
      this.logger.error({ error })
      res.status(500).json({ message: error })
    }
  }
}
