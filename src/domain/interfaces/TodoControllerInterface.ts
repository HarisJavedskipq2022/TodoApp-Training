import { Request, Response } from 'express'

interface ITodoController {
  create(req: Request, res: Response): Promise<void>
  getAll(req: Request, res: Response): Promise<void>
  getById(req: Request, res: Response): Promise<void>
  deleteById(req: Request, res: Response): Promise<void>
  updateById(req: Request, res: Response): Promise<void>
  populateByFaker(req: Request, res: Response): Promise<void>
}

export default ITodoController
