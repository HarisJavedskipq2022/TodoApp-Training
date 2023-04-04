import { TodoRepository } from '../../infrastructure/repositories/TodoRepository';

export interface Command {
  execute(repository: TodoRepository): Promise<any>;
}