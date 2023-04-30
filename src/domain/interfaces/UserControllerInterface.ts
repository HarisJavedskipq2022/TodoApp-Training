import { Request, Response } from 'express'

export interface IUserController {
  getAll(req: Request, res: Response): Promise<Response>
  delete(req: Request, res: Response): Promise<Response>
  signup(req: Request, res: Response): Promise<Response>
  login(req: Request, res: Response): Promise<void>
  update(req: Request, res: Response): Promise<void>
}
