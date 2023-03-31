
import { Todo } from "../domain/entity/TodoEntity";
import { Command } from "./command";
import TodoRepository from "../repositories/TodoRepository";

export class FindTodoCommand implements Command {
  constructor(private todo: Todo) { }

  public async execute(repository: TodoRepository) {
    return repository.findManyTodos();
  }
}