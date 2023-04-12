import { Command } from '@tshio/command-bus'
import { Todo } from '../../domain/entity/TodoEntity'

class CreateTodoCommand implements Command<Todo> {
  public type: string = 'create-todo'
  public payload: Todo

  constructor(payload: Todo) {
    this.payload = payload
  }
}

class GetAllTodosCommand implements Command<{ limit: number; offset: number }> {
  public type: string = 'get-all-todos'
  public payload: { limit: number; offset: number }

  constructor(payload: { limit: number; offset: number }) {
    this.payload = payload
  }
}

class GetTodoByIdCommand implements Command<string> {
  public type: string = 'get-todo-by-id'
  public payload: string

  constructor(payload: string) {
    this.payload = payload
  }
}

class DeleteTodoByIdCommand implements Command<string> {
  public type: string = 'delete-todo-by-id'
  public payload: string

  constructor(payload: string) {
    this.payload = payload
  }
}

class UpdateTodoByIdCommand implements Command<string> {
  public type: string = 'update-todo-by-id'
  public payload: string

  constructor(payload: string) {
    this.payload = payload
  }
}
