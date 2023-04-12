// application/CommandBus/TodoCommands.ts
import { ICommand } from './CommandInterface'
import { Todo } from '../../domain/entity/TodoEntity'

export class CreateTodoCommand implements ICommand {
  constructor(public todo: Todo) {}
}

export class FindManyTodosCommand implements ICommand {
  constructor(public limit: number, public offset: number) {}
}

export class FindUniqueTodoCommand implements ICommand {
  constructor(public id: string) {}
}

export class DeleteTodoCommand implements ICommand {
  constructor(public id: string) {}
}

export class UpdateTodoCommand implements ICommand {
  constructor(public id: string, public completed: boolean) {}
}
