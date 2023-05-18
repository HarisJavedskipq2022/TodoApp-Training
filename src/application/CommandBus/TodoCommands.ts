import { ICommand } from './CommandInterface'
import { Todo } from '../../domain/entity/TodoEntity'
import { TodoSchema, FindManySchema, StringIdSchema, UpdateTodoSchema } from './TodoCommandSchemas'

export class CreateTodoCommand implements ICommand {
  constructor(public todo: Todo) {
    TodoSchema.parse(todo)
  }
}

export class FindManyTodosCommand implements ICommand {
  constructor(public limit: number, public offset: number) {
    FindManySchema.parse({ limit, offset })
  }
}

export class FindUniqueTodoCommand implements ICommand {
  constructor(public id: string) {
    StringIdSchema.parse({ id })
  }
}

export class DeleteTodoCommand implements ICommand {
  constructor(public id: string) {
    StringIdSchema.parse({ id })
  }
}

export class UpdateTodoCommand implements ICommand {
  constructor(public id: string, public completed: boolean) {
    UpdateTodoSchema.parse({ id, completed })
  }
}
