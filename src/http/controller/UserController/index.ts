import { AuthService } from './../../../application/services/AuthService'
import { Request, Response } from 'express'
import { UserService } from '../../../application/services/UserService'
import { injectable, inject } from 'inversify'
import { IUserController } from '../../../domain/interfaces/UserControllerInterface'
import { Logger } from '../../../infrastructure/config/logger'
import HttpResponse from '../../../application/utils/Response'
import { statusCode } from '../../../application/utils/Status'

@injectable()
export class UserControllerInstance implements IUserController {
  private logger: Logger

  constructor(
    @inject('UserService') private userService: UserService,
    @inject('AuthService') private authService: AuthService
  ) {
    this.logger = new Logger('UserController')
  }

  signup = async (req: Request, res: Response) => {
    const { id, email, password }: { id: string; email: string; password: string } = req.body
    const httpResponse = await this.userService.create(id, email, password)
    HttpResponse.applyToExpressResponse(res, httpResponse)
  }

  login = async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body
    const token = await this.authService.login(email, password)
    if (!token) {
      const httpResponse = HttpResponse.create(statusCode.UNAUTHORIZED, { msg: 'Invalid credentials' })
      HttpResponse.applyToExpressResponse(res, httpResponse)
      return
    }
    this.logger.info(`jwt-token:${token}`)
    const httpResponse = HttpResponse.create(statusCode.OK, { msg: 'successfully logged in' })
    HttpResponse.applyToExpressResponse(res, httpResponse)
  }

  updatePassword = async (req: Request, res: Response) => {
    const { id, newPassword } = req.body
    const httpResponse = await this.userService.updatePassword(id, newPassword)
    HttpResponse.applyToExpressResponse(res, httpResponse)
  }

  delete = async (req: Request, res: Response) => {
    const { id } = req.params
    const httpResponse = await this.userService.deleteById(id)
    HttpResponse.applyToExpressResponse(res, httpResponse)
  }

  getAll = async (req: Request, res: Response) => {
    const httpResponse = await this.userService.getAll()
    HttpResponse.applyToExpressResponse(res, httpResponse)
  }
}
