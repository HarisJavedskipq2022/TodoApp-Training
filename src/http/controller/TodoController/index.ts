import { Request, Response } from 'express'
import { TodoService } from '../../../application/services/TodoService'
import { inject, injectable } from 'inversify'

@injectable()
export class TodoControllerInstance {
  constructor(@inject('TodoService') private todoService: TodoService) {}

  create = async (req: Request, res: Response) => {
    const { id, title, completed }: { id: string; title: string; completed: boolean } = req.body
    try {
      const record = await this.todoService.create(id, title, completed)
      return res.json({ record, msg: 'Successfully created todo' })
    } catch (e) {
      return res.json({
        msg: 'failed to create todo',
        status: 500,
        route: '/create',
      })
    }
  }

  // CreateByCommand = async (req: Request, res: Response) => {
  //   try {
  //     const record = await this.todoService.createTodoItemCommand(req.body)
  //     return res.json({ record, msg: 'Successfully created todo' })
  //   } catch (e) {
  //     return res.json({
  //       msg: 'failed to create todo by command',
  //       status: 500,
  //       route: '/createbycommand',
  //     })
  //   }
  // }

  getAll = async (req: Request, res: Response) => {
    try {
      const limit = (req.query.limit as number | undefined) || 10
      const offset = req.query.offset as number | undefined

      const records = await this.todoService.getAll(limit, offset)
      return res.json({ records })
    } catch (e) {
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
    } catch (e) {
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
    } catch (e) {
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
    } catch (e) {
      return res.status(500).json({
        msg: 'todo not found',
        route: '/update/:id',
      })
    }
  }
}
