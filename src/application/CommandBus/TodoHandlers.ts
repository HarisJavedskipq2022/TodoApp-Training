import { ICommandHandler } from './CommandInterface'
import {
  CreateTodoCommand,
  FindManyTodosCommand,
  FindUniqueTodoCommand,
  DeleteTodoCommand,
  UpdateTodoCommand,
} from './TodoCommands'
import { ITodoRepository } from '../../domain/interfaces/TodoInterface'
import { inject, injectable } from 'inversify'

@injectable()
export class CreateTodoHandler implements ICommandHandler {
  constructor(@inject('TodoRepository') private todoRepository: ITodoRepository) {}

  async handle(command: CreateTodoCommand): Promise<any> {
    return this.todoRepository.create(command.todo)
  }
}

@injectable()
export class FindManyTodosHandler implements ICommandHandler {
  constructor(@inject('TodoRepository') private todoRepository: ITodoRepository) {}

  async handle(command: FindManyTodosCommand): Promise<any> {
    return this.todoRepository.getAll(command.limit, command.offset)
  }
}

@injectable()
export class FindUniqueTodoHandler implements ICommandHandler {
  constructor(@inject('TodoRepository') private todoRepository: ITodoRepository) {}

  async handle(command: FindUniqueTodoCommand): Promise<any> {
    return this.todoRepository.getById(command.id)
  }
}

@injectable()
export class DeleteTodoHandler implements ICommandHandler {
  constructor(@inject('TodoRepository') private todoRepository: ITodoRepository) {}

  async handle(command: DeleteTodoCommand): Promise<any> {
    return this.todoRepository.delete(command.id)
  }
}

@injectable()
export class UpdateTodoHandler implements ICommandHandler {
  constructor(@inject('TodoRepository') private todoRepository: ITodoRepository) {}

  async handle(command: UpdateTodoCommand): Promise<any> {
    return this.todoRepository.update(command.id, command.completed)
  }
}
