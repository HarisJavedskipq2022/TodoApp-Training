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
    const { error, result } = await this.userService.getAll()
    if (error) {
      res.status(404).json({ msg: error })
    } else {
      res.json({ record: result })
    }
  }

  delete = async (req: Request, res: Response) => {
    const { id } = req.params
    const { error, result } = await this.userService.deleteById(id)
    if (error) {
      res.status(404).json({ msg: error })
    } else {
      res.json({ user: result })
    }
  }

  signup = async (req: Request, res: Response) => {
    const { id, email, password }: { id: string; email: string; password: string } = req.body
    const { error, result } = await this.userService.create(id, email, password)

    if (error) {
      res.status(400).json({ msg: error })
    } else {
      res.json({ newUser: result, msg: 'User successfully signed up' })
    }
  }

  login = async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body
    const token = await this.authService.login(email, password)
    if (!token) {
      res.status(401).json({ msg: 'Invalid credentials' })
      return
    }
    this.logger.info(`jwt-token:${token}`)
    res.json({ msg: 'successfully logged in' })
  }

  update = async (req: Request, res: Response) => {
    const { id, newPassword } = req.body
    const { error, result } = await this.userService.updatePassword(id, newPassword)
    if (error) {
      res.status(400).json({ msg: error })
    } else {
      res.status(200).json({ message: 'Password updated successfully' })
    }
  }
}
