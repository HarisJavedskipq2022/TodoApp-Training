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

@injectable()
export class TodoService {
  constructor(@inject('CommandBus') private commandBus: CommandBus) {}

  async create(id: string, title: string, completed: boolean) {
    const newTodoData = { id, title, completed }
    const newTodo = Todo.todoFactory(newTodoData)

    if (newTodo) {
      try {
        const result = await this.commandBus.execute(new CreateTodoCommand(newTodo))
        return { error: null, result }
      } catch (e) {
        console.error('Failed to create todo:', e)
        return { error: 'Failed to create todo', result: null }
      }
    }

    console.error('Failed to create todo')
    return { error: 'Failed to create todo', result: null }
  }

  async getAll(limit: number = 10, offset: number = 0) {
    try {
      const result = await this.commandBus.execute(new FindManyTodosCommand(limit, offset))
      return { error: null, result }
    } catch (e) {
      console.error('Failed to find all todo items:', e)
      return { error: 'Failed to find all todo items', result: null }
    }
  }

  async getById(id: string) {
    try {
      const result = await this.commandBus.execute(new FindUniqueTodoCommand(id))
      return { error: null, result }
    } catch (e) {
      console.error('Failed to find todo by ID:', e)
      return { error: 'Failed to find todo by ID', result: null }
    }
  }

  async deleteById(id: string) {
    try {
      const record = await this.commandBus.execute(new FindUniqueTodoCommand(id))

      if (!record) {
        console.error('Record not found')
        return { error: 'Record not found', result: null }
      }

      const result = await this.commandBus.execute(new DeleteTodoCommand(id))
      return { error: null, result }
    } catch (e) {
      console.error('Failed to delete todo by ID:', e)
      return { error: 'Failed to delete todo by ID', result: null }
    }
  }

  async updateById(id: string) {
    try {
      const record = await this.commandBus.execute(new FindUniqueTodoCommand(id))

      if (!record) {
        console.error('Record not found')
        return { error: 'Record not found', result: null }
      }

      const result = await this.commandBus.execute(new UpdateTodoCommand(id, !record.completed))
      return { error: null, result }
    } catch (e) {
      console.error('Failed to update todo by ID:', e)
      return { error: 'Failed to update todo by ID', result: null }
    }
  }
}
