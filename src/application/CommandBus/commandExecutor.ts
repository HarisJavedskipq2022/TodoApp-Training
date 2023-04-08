import { Command } from '../../domain/interfaces/CommandInterface'
import { TodoRepository } from '../../infrastructure/repositories/TodoRepository'

export class CommandExecutor {
      constructor(private todoRepository: TodoRepository) {}

      async execute(command: Command) {
            return command.execute(this.todoRepository)
      }
}
