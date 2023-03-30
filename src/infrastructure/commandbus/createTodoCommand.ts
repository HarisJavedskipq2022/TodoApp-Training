import { Todo } from "../domain/entity/TodoEntity";
import { Command } from "./command";
import TodoRepository from "../repositories/TodoRepository";

export class CreateTodoCommand implements Command {
  constructor(private todo: Todo) {}

  public async execute(repository: TodoRepository): Promise<any> {
    return repository.createTodoItem(this.todo);
  }
}