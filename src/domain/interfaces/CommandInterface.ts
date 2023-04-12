import { ITodoRepository } from './TodoInterface'

export interface Command {
  execute(repository: ITodoRepository): Promise<any>
}
