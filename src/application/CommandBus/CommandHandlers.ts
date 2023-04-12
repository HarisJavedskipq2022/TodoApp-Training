import { CommandHandler } from '@tshio/command-bus'
import { ITodoRepository } from '../../domain/interfaces/TodoInterface'
import { inject } from 'inversify'
import TodoCommands from '../CommandBus'

class CreateTodoHandler implements CommandHandler {
  public commandType: string = 'create-todo'

  constructor(@inject('TodoRepository') private todoRepository: ITodoRepository) {}

  async execute(command: ReturnType<typeof TodoCommands.createTodo>) {
    return this.todoRepository.create(command.payload)
  }
}

class GetAllTodosHandler implements CommandHandler {
  public commandType: string = 'get-all-todos'

  constructor(@inject('TodoRepository') private todoRepository: ITodoRepository) {}

  async execute(command: ReturnType<typeof TodoCommands.getAllTodos>) {
    const { limit, offset } = command.payload
    return this.todoRepository.findMany(limit, offset)
  }
}

class GetTodoByIdHandler implements CommandHandler {
  public commandType: string = 'get-todo-by-id'

  constructor(@inject('TodoRepository') private todoRepository: ITodoRepository) {}

  async execute(command: ReturnType<typeof TodoCommands.getTodoById>) {
    return this.todoRepository.findUnique(command.payload)
  }
}

class DeleteTodoByIdHandler implements CommandHandler {
  public commandType: string = 'delete-todo-by-id'

  constructor(@inject('TodoRepository') private todoRepository: ITodoRepository) {}

  async execute(command: ReturnType<typeof TodoCommands.deleteTodoById>) {
    return this.todoRepository.delete(command.payload)
  }
}

class UpdateTodoByIdHandler implements CommandHandler {
  public commandType: string = 'update-todo-by-id'

  constructor(@inject('TodoRepository') private todoRepository: ITodoRepository) {}

  async execute(command: ReturnType<typeof TodoCommands.updateTodoById>) {
    const record = await this.todoRepository.findUnique(command.payload)
    if (record) {
      return this.todoRepository.update(command.payload, !record.completed)
    }
    return null
  }
}

export default {
  CreateTodoHandler,
  GetAllTodosHandler,
  GetTodoByIdHandler,
  DeleteTodoByIdHandler,
  UpdateTodoByIdHandler,
}
