import { Request, Response } from 'express'

export interface IUserController {
  getAll(req: Request, res: Response): Promise<void>
  delete(req: Request, res: Response): Promise<void>
  signup(req: Request, res: Response): Promise<void>
  login(req: Request, res: Response): Promise<void>
  updatePassword(req: Request, res: Response): Promise<void>
}
