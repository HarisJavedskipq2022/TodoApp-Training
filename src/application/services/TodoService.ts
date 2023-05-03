import { Todo } from '../../domain/entity/TodoEntity'
import { inject, injectable } from 'inversify'
import { CommandBus } from '../CommandBus'
import { CreateTodoCommand, UpdateTodoCommand } from '../CommandBus/TodoCommands'
import { FindUniqueTodoCommand } from '../CommandBus/TodoCommands'
import { FindManyTodosCommand } from '../CommandBus/TodoCommands'
import { DeleteTodoCommand } from '../CommandBus/TodoCommands'

@injectable()
export class TodoService {
  constructor(@inject('CommandBus') private commandBus: CommandBus) {}

  async create(id: string, title: string, completed: boolean) {
    const newTodoData = { id, title, completed }
    const newTodo = Todo.todoFactory(newTodoData)

    if (newTodo) return this.commandBus.execute(new CreateTodoCommand(newTodo))

    throw new Error('Failed to create todo')
  }

  async getAll(limit: number = 10, offset: number = 0) {
    try {
      return this.commandBus.execute(new FindManyTodosCommand(limit, offset))
    } catch (e) {
      throw new Error('Failed to find all todo items')
    }
  }

  async getById(id: string) {
    try {
      return this.commandBus.execute(new FindUniqueTodoCommand(id))
    } catch (e) {
      throw new Error('Failed to read todo')
    }
  }

  async deleteById(id: string) {
    const record = await this.commandBus.execute(new FindUniqueTodoCommand(id))

    if (!record) {
      throw new Error('Record not found')
    }
    return this.commandBus.execute(new DeleteTodoCommand(id))
  }

  async updateById(id: string) {
    const record = await this.commandBus.execute(new FindUniqueTodoCommand(id))

    if (!record) {
      throw new Error('Record not found')
    } else {
      return this.commandBus.execute(new UpdateTodoCommand(id, !record.completed))
    }
  }
}
