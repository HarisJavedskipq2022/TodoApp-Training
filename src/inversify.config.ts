import {Container} from "inversify";
import TodoRepository from "./infrastructure/repositories/TodoRepository";
import 'reflect-metadata';
import TodoService from "./services/TodoUtility";

export const container = new Container();

container.bind<TodoRepository>('TodoRepository').to(TodoRepository)
container.bind<TodoService>('TodoService').to(TodoService)