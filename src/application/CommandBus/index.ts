import { Command } from '@tshio/command-bus'
import { Todo } from '../../domain/entity/TodoEntity'
import { injectable } from 'inversify'

@injectable()
class TodoCommands {
  static createTodo(payload: Todo): Command<Todo> {
    return {
      type: 'create-todo',
      payload,
    }
  }

  static getAllTodos(payload: { limit: number; offset: number }): Command<{ limit: number; offset: number }> {
    return {
      type: 'get-all-todos',
      payload,
    }
  }

  static getTodoById(payload: string): Command<string> {
    return {
      type: 'get-todo-by-id',
      payload,
    }
  }

  static deleteTodoById(payload: string): Command<string> {
    return {
      type: 'delete-todo-by-id',
      payload,
    }
  }

  static updateTodoById(payload: string): Command<string> {
    return {
      type: 'update-todo-by-id',
      payload,
    }
  }
}

export default TodoCommands
