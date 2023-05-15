import { ICommandHandler } from './CommandInterface'
import {
  CreateTodoCommand,
  FindManyTodosCommand,
  FindUniqueTodoCommand,
  DeleteTodoCommand,
  UpdateTodoCommand
} from './TodoCommands'
import {
  CreateTodoCommandSchema,
  FindManyTodosCommandSchema,
  FindUniqueTodoCommandSchema,
  DeleteTodoCommandSchema,
  UpdateTodoCommandSchema
} from './TodoCommandSchemas'
import { ITodoRepository } from '../../domain/interfaces/TodoInterface'
import { inject, injectable } from 'inversify'

@injectable()
export class CreateTodoHandler implements ICommandHandler {
  constructor(@inject('TodoRepository') private todoRepository: ITodoRepository) {}

  async handle(command: CreateTodoCommand) {
    const validCommand = CreateTodoCommandSchema.parse(command)
    return this.todoRepository.create(validCommand.todo)
  }
}

@injectable()
export class FindManyTodosHandler implements ICommandHandler {
  constructor(@inject('TodoRepository') private todoRepository: ITodoRepository) {}

  async handle(command: FindManyTodosCommand) {
    const validCommand = FindManyTodosCommandSchema.parse(command)
    return this.todoRepository.getAll(validCommand.limit, validCommand.offset)
  }
}

@injectable()
export class FindUniqueTodoHandler implements ICommandHandler {
  constructor(@inject('TodoRepository') private todoRepository: ITodoRepository) {}

  async handle(command: FindUniqueTodoCommand) {
    const validCommand = FindUniqueTodoCommandSchema.parse(command)
    return this.todoRepository.getById(validCommand.id)
  }
}

@injectable()
export class DeleteTodoHandler implements ICommandHandler {
  constructor(@inject('TodoRepository') private todoRepository: ITodoRepository) {}

  async handle(command: DeleteTodoCommand) {
    const validCommand = DeleteTodoCommandSchema.parse(command)
    return this.todoRepository.delete(validCommand.id)
  }
}

@injectable()
export class UpdateTodoHandler implements ICommandHandler {
  constructor(@inject('TodoRepository') private todoRepository: ITodoRepository) {}

  async handle(command: UpdateTodoCommand) {
    const validCommand = UpdateTodoCommandSchema.parse(command)
    return this.todoRepository.update(validCommand.id, validCommand.completed)
  }
}
