import TodoRepository from "../repositories/TodoRepository";

export interface Command {
  execute(repository: TodoRepository): Promise<any>;
}