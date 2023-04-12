import { Todo } from '../../domain/entity/TodoEntity'
import { ITodoRepository } from '../../domain/interfaces/TodoInterface'
import { inject, injectable } from 'inversify'
import { CommandBus } from '../CommandBus'
import { CreateTodoCommand } from '../CommandBus/TodoCommands'
import { FindUniqueTodoCommand } from '../CommandBus/TodoCommands'
import { FindManyTodosCommand } from '../CommandBus/TodoCommands'
import { DeleteTodoCommand } from '../CommandBus/TodoCommands'

@injectable()
export class TodoService {
  constructor(
    @inject('TodoRepository') private todoRepository: ITodoRepository,
    @inject('CommandBus') private commandBus: CommandBus
  ) {}

  async create(id: string, title: string, completed: boolean) {
    const newTodoData = { id, title, completed }
    const newTodo = Todo.todoFactory(newTodoData)
    return this.todoRepository.create(newTodo)
  }

  async createbyCommand(id: string, title: string, completed: boolean) {
    const newTodoData = { id, title, completed }
    const newTodo = Todo.todoFactory(newTodoData)
    return this.commandBus.execute(new CreateTodoCommand(newTodo))
  }

  async getAll(limit: number = 10, offset: number = 0) {
    try {
      return await this.todoRepository.findMany(limit, offset)
    } catch (e) {
      throw new Error('Failed to find all todo items')
    }
  }

  async getById(id: string) {
    try {
      return await this.todoRepository.findUnique(id)
    } catch (e) {
      throw new Error('Failed to read todo')
    }
  }

  async deleteById(id: string) {
    const record = await this.todoRepository.findUnique(id)

    if (!record) {
      throw new Error('Record not found')
    }
    return this.todoRepository.delete(id)
  }

  async deleteByCommand(id: string) {
    const record = await this.commandBus.execute(new FindUniqueTodoCommand(id))

    if (!record) {
      throw new Error('Record not found')
    }
    return this.commandBus.execute(new DeleteTodoCommand(id))
  }

  async updateById(id: string) {
    const record = await this.todoRepository.findUnique(id)

    if (!record) {
      throw new Error('Record not found')
    } else {
      return await this.todoRepository.update(id, !record.completed)
    }
  }
}
