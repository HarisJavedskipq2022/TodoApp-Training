import { Request, Response } from 'express'
import { TodoService } from '../../../application/services/TodoService'
import { inject, injectable } from 'inversify'
import createTodos from '../../../infrastructure/utility'
import ITodoController from '../../../domain/interfaces/TodoControllerInterface'
import { Signale } from 'signale'

const customOptions = {
  disabled: false,
  interactive: false,
  scope: 'TodoController',
  types: {
    error: {
      badge: '!!',
      color: 'red',
      label: 'Error',
    },
  },
}

const signale = new Signale(customOptions)

@injectable()
export class TodoControllerInstance implements ITodoController {
  constructor(@inject('TodoService') private todoService: TodoService) {}

  create = async (req: Request, res: Response) => {
    const { id, title, completed } = req.body
    try {
      const record = await this.todoService.create(id, title, completed)
      return res.json({ record, msg: 'Successfully created todo' })
    } catch (error) {
      signale.error({ error })
      return res.json({
        msg: 'failed to create todo',
        status: 500,
        route: '/create',
      })
    }
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const limit = (req.query.limit as number | undefined) || 10
      const offset = req.query.offset as number | undefined

      const records = await this.todoService.getAll(limit, offset)
      return res.json({ records })
    } catch (error) {
      console.error({ error })
      return res.json({
        msg: 'failed to read todo',
        status: 500,
        route: '/read',
      })
    }
  }

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const record = await this.todoService.getById(id)
      return res.json({ record })
    } catch (error) {
      console.error({ error })
      return res.json({
        msg: 'failed to get todo by Id',
        status: 500,
        route: '/read/:id',
      })
    }
  }

  deleteById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const deletedRecord = await this.todoService.deleteById(id)
      return res.json({ record: deletedRecord })
    } catch (error) {
      console.error({ error })
      return res.status(500).json({
        msg: 'fail to read Todo',
        route: '/delete/:id',
      })
    }
  }

  updateById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const updatedRecord = await this.todoService.updateById(id)
      return res.json({ record: updatedRecord })
    } catch (error) {
      console.error({ error })
      return res.status(500).json({
        msg: 'todo not found',
        route: '/update/:id',
      })
    }
  }

  populateByFaker = async (req: Request, res: Response) => {
    try {
      await createTodos(10)
      res.status(200).send({ msg: 'Todos populated successfully!' })
    } catch (error) {
      console.error(error)
      res.status(500).send({ msg: 'Error populating todos.' })
    }
  }
}
