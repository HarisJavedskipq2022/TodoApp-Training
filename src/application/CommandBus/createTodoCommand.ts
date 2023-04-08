import { injectable } from 'inversify'
import { Todo } from '../../domain/entity/TodoEntity'
import { Command } from '../../domain/interfaces/CommandInterface'
import { TodoRepository } from '../../infrastructure/repositories/TodoRepository'

@injectable()
export class CreateTodoCommand implements Command {
      constructor(private todo: Todo) {}

      async execute(repository: TodoRepository) {
            return repository.create(this.todo)
      }
}
