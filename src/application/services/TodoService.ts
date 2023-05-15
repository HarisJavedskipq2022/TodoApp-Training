import { Todo } from '../../domain/entity/TodoEntity'
import { inject, injectable } from 'inversify'
import { CommandBus } from '../CommandBus'
import {
  CreateTodoCommand,
  UpdateTodoCommand,
  FindUniqueTodoCommand,
  FindManyTodosCommand,
  DeleteTodoCommand,
} from '../CommandBus/TodoCommands'
import PaginationData from '../utils/Pagination'
import PaginationOptions from '../utils/PaginationOptions'
import HttpResponse from '../utils/Response'
import { statusCode } from '../utils/Status'

@injectable()
export class TodoService {
  constructor(@inject('CommandBus') private commandBus: CommandBus) {}

  async create(id: string, title: string, completed: boolean) {
    const newTodoData = { id, title, completed }

    try {
      const newTodo = Todo.todoFactory(newTodoData)

      if (!newTodo) return HttpResponse.create(statusCode.ERROR, 'Failed to create todo')

      const result = await this.commandBus.execute(new CreateTodoCommand(newTodo))
      return HttpResponse.create(statusCode.CREATED, result)
    } catch (e) {
      console.error({ e })
      return HttpResponse.create(statusCode.SERVER_ERROR, 'Failed to create todo')
    }
  }

  async getAll(limit: number = 10, offset: number = 0) {
    try {
      const result = await this.commandBus.execute(new FindManyTodosCommand(limit, offset))

      if (!result || !Array.isArray(result.items))
        return HttpResponse.create(statusCode.NOT_FOUND, 'Failed to find all todo items')

      const currentPage = Math.floor(offset / limit) + 1
      const paginationOptions = new PaginationOptions(currentPage, limit)
      const paginationData = new PaginationData(paginationOptions, result.totalItemCount)
      result.items.forEach((item: Todo) => paginationData.addItem(item))
      const paginatedData = paginationData.getPaginatedData()
      return HttpResponse.create(statusCode.OK, paginatedData)
    } catch (e) {
      console.error({ e })
      return HttpResponse.create(statusCode.SERVER_ERROR, 'Failed to find all todo items')
    }
  }

  async getById(id: string) {
    try {
      const result = await this.commandBus.execute(new FindUniqueTodoCommand(id))
      return HttpResponse.create(statusCode.OK, result)
    } catch (e) {
      console.error({ e })
      return HttpResponse.create(statusCode.NOT_FOUND, 'Failed to find todo by ID')
    }
  }

  async deleteById(id: string) {
    try {
      const record = await this.commandBus.execute(new FindUniqueTodoCommand(id))
      if (!record) return HttpResponse.create(statusCode.NOT_FOUND, 'Record not found')
      const result = await this.commandBus.execute(new DeleteTodoCommand(id))
      return HttpResponse.create(statusCode.OK, result)
    } catch (e) {
      console.error({ e })
      return HttpResponse.create(statusCode.SERVER_ERROR, 'Failed to delete todo by ID')
    }
  }

  async updateById(id: string) {
    try {
      const record = await this.commandBus.execute(new FindUniqueTodoCommand(id))
      if (!record) return HttpResponse.create(statusCode.NOT_FOUND, 'Record not found')
      const result = await this.commandBus.execute(new UpdateTodoCommand(id, !record.completed))
      return HttpResponse.create(statusCode.OK, result)
    } catch (e) {
      console.error({ e })
      return HttpResponse.create(statusCode.SERVER_ERROR, 'Failed to update todo by ID')
    }
  }
}
