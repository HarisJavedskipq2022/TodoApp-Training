import { ICommandHandler } from './CommandInterface'
import {
  CreateTodoCommand,
  FindManyTodosCommand,
  FindUniqueTodoCommand,
  DeleteTodoCommand,
  UpdateTodoCommand,
  UndeleteTodoCommand
} from './TodoCommands'
import { ITodoRepository } from '../../domain/interfaces/TodoInterface'
import { inject, injectable } from 'inversify'

@injectable()
export class CreateTodoHandler implements ICommandHandler {
  constructor(@inject('TodoRepository') private todoRepository: ITodoRepository) {}

  async handle(command: CreateTodoCommand) {
    return this.todoRepository.create(command.todo)
  }
}

@injectable()
export class FindManyTodosHandler implements ICommandHandler {
  constructor(@inject('TodoRepository') private todoRepository: ITodoRepository) {}

  async handle(command: FindManyTodosCommand) {
    return this.todoRepository.getAll(command.limit, command.offset)
  }
}

@injectable()
export class FindUniqueTodoHandler implements ICommandHandler {
  constructor(@inject('TodoRepository') private todoRepository: ITodoRepository) {}

  async handle(command: FindUniqueTodoCommand) {
    return this.todoRepository.getById(command.id)
  }
}

@injectable()
export class DeleteTodoHandler implements ICommandHandler {
  constructor(@inject('TodoRepository') private todoRepository: ITodoRepository) {}

  async handle(command: DeleteTodoCommand) {
    return this.todoRepository.softDelete(command.id)
  }
}

@injectable()
export class UpdateTodoHandler implements ICommandHandler {
  constructor(@inject('TodoRepository') private todoRepository: ITodoRepository) {}

  async handle(command: UpdateTodoCommand) {
    return this.todoRepository.update(command.id, command.completed)
  }
}

@injectable()
export class UndeleteTodoHandler implements ICommandHandler {
  constructor(@inject('TodoRepository') private todoRepository: ITodoRepository) {}

  async handle(command: UndeleteTodoCommand) {
    return this.todoRepository.undelete(command.id)
  }
}
