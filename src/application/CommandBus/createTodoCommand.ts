import { Todo } from '../../domain/entity/TodoEntity'
import { Command } from './command'
import { TodoRepository } from '../../infrastructure/repositories/TodoRepository'

export class CreateTodoCommand implements Command {
      constructor(private todo: Todo) {}

      async execute(repository: TodoRepository) {
            return repository.createTodoItem(this.todo)
      }

      async undo(repository: TodoRepository) {
            return repository.deleteTodo(this.todo.id)
      }

      async redo(repository: TodoRepository) {
            return repository.createTodoItem(this.todo)
      }
}
