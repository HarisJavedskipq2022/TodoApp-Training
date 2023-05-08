import { Request, Response } from 'express'
import { TodoService } from '../../../application/services/TodoService'
import { inject, injectable } from 'inversify'
import createTodos from '../../../infrastructure/utility'
import ITodoController from '../../../domain/interfaces/TodoControllerInterface'
import { Logger } from '../../../infrastructure/config/logger'

@injectable()
export class TodoControllerInstance implements ITodoController {
  private logger: Logger
  constructor(@inject('TodoService') private todoService: TodoService) {
    this.logger = new Logger('TodoController')
  }

  create = async (req: Request, res: Response) => {
    const { id, title, completed } = req.body
    const record = await this.todoService.create(id, title, completed)

    if (!record) {
      res.status(400).json({ msg: 'Todo not created' })
    }
    return res.json({ record, msg: 'Successfully created todo' })
  }

  getAll = async (req: Request, res: Response) => {
    const limit = (req.query.limit as number | undefined) || 25
    const offset = req.query.offset as number | undefined

    const records = await this.todoService.getAll(limit, offset)

    if (!records) {
      res.status(404).json({ msg: 'No todos found' })
    }
    return res.json({ records })
  }

  getById = async (req: Request, res: Response) => {
    const { id } = req.params
    const record = await this.todoService.getById(id)

    if (!record) {
      res.status(404).json({ msg: 'Todo not found' })
    }
    return res.json({ record })
  }

  deleteById = async (req: Request, res: Response) => {
    const { id } = req.params
    const deletedRecord = await this.todoService.deleteById(id)

    if (!deletedRecord) {
      res.status(404).json({ msg: 'Todo not found' })
    }
    return res.json({ record: deletedRecord })
  }

  updateById = async (req: Request, res: Response) => {
    const { id } = req.params
    const updatedRecord = await this.todoService.updateById(id)

    if (!updatedRecord) {
      res.status(404).json({ msg: 'Todo not found' })
    }
    return res.json({ record: updatedRecord })
  }

  populateByFaker = async (req: Request, res: Response) => {
    await createTodos(10)
    res.status(200).send({ msg: 'Todos populated successfully!' })
  }
}
