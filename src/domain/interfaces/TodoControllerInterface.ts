import { Request, Response } from 'express'

interface ITodoController {
  create(req: Request, res: Response): Promise<Response>
  getAll(req: Request, res: Response): Promise<void>
  getById(req: Request, res: Response): Promise<Response>
  deleteById(req: Request, res: Response): Promise<Response>
  updateById(req: Request, res: Response): Promise<Response>
  populateByFaker(req: Request, res: Response): Promise<void>
}

export default ITodoController
