import { injectable } from 'inversify'
import { Command } from '../../domain/interfaces/CommandInterface'
import { TodoRepository } from '../../infrastructure/repositories/TodoRepository'

@injectable()
export class CommandExecutor {
      constructor(private todoRepository: TodoRepository) {}

      async execute(command: Command) {
            return command.execute(this.todoRepository)
      }
}
