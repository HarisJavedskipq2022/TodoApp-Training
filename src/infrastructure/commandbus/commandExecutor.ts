import { Command } from "./command";
import TodoRepository from "../repositories/TodoRepository";


export class CommandExecutor {
    constructor(private todoRepository: TodoRepository) {}
  
    async execute(command: Command) {
      return command.execute(this.todoRepository);
    }
  }