import { CommandExecutor } from './../CommandBus/commandExecutor'
import { CreateTodoCommand } from './../CommandBus/createTodoCommand'
import { Todo } from '../../domain/entity/TodoEntity'
import { TodoRepository } from '../../infrastructure/repositories/TodoRepository'
import { ITodoRepository } from '../../domain/interfaces/TodoInterface'
import { inject, injectable } from 'inversify'

@injectable()
class TodoService {
  constructor(@inject('TodoRepository') private todoRepository: ITodoRepository) {}

  async create(id: string, title: string, completed: boolean) {
    const newTodoData = { id, title, completed }
    const newTodo = Todo.todoFactory(newTodoData)
    return this.todoRepository.create(newTodo)
  }

  async createTodoItemCommand(todo: Todo) {
    const command = new CreateTodoCommand(todo)
    const commandExecutor = new CommandExecutor(new TodoRepository())
    return commandExecutor.execute(command)
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

  async updateById(id: string) {
    const record = await this.todoRepository.findUnique(id)

    if (!record) {
      throw new Error('Record not found')
    } else {
      return await this.todoRepository.update(id, !record.completed)
    }
  }
}

export default TodoService
