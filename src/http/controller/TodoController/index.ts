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
    // Get the limit and offset from the query parameters (if provided)
    const limit = parseInt(req.query.limit as string) || 10
    const offset = parseInt(req.query.offset as string) || 0

    // Call the getAll method of the TodoService
    const { error, result } = await this.todoService.getAll(limit, offset)

    if (error) {
      // If there was an error, send a 500 status code and the error message
      res.status(500).json({ message: error })
    } else {
      // If successful, send the paginated data
      res.status(200).json(result)
    }
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
