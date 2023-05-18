import { Request, Response } from 'express'
import { TodoService } from '../../../application/services/TodoService'
import { inject, injectable } from 'inversify'
import createTodos from '../../../infrastructure/utility'
import ITodoController from '../../../domain/interfaces/TodoControllerInterface'
import HttpResponse from '../../../application/utils/Response'
import { statusCode } from '../../../application/utils/Status'

@injectable()
export class TodoControllerInstance implements ITodoController {
  constructor(@inject('TodoService') private todoService: TodoService) {}

  create = async (req: Request, res: Response) => {
    const httpResponse = await this.todoService.create(
      req.body.id,
      req.body.title,
      req.body.completed
    )
    HttpResponse.applyToExpressResponse(res, httpResponse)
  }

  getAll = async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 20
    const offset = parseInt(req.query.offset as string) || 0
    const httpResponse = await this.todoService.getAll(limit, offset)
    HttpResponse.applyToExpressResponse(res, httpResponse)
  }

  getById = async (req: Request, res: Response) => {
    const httpResponse = await this.todoService.getById(req.params.id)
    HttpResponse.applyToExpressResponse(res, httpResponse)
  }

  deleteById = async (req: Request, res: Response) => {
    const httpResponse = await this.todoService.deleteById(req.params.id)
    HttpResponse.applyToExpressResponse(res, httpResponse)
  }

  undeleteById = async (req: Request, res: Response) => {
    const httpResponse = await this.todoService.undeleteById(req.params.id)
    HttpResponse.applyToExpressResponse(res, httpResponse)
  }

  updateById = async (req: Request, res: Response) => {
    const httpResponse = await this.todoService.updateById(req.params.id)
    HttpResponse.applyToExpressResponse(res, httpResponse)
  }

  populateByFaker = async (req: Request, res: Response) => {
    const todos = await createTodos(10)
    const httpResponse = HttpResponse.create(statusCode.OK, {
      message: 'Todos populated successfully!',
      todos
    })
    HttpResponse.applyToExpressResponse(res, httpResponse)
  }
}

export default TodoControllerInstance
