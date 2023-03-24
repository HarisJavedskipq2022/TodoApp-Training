import { Todo } from "../infrastructure/domain/entity/TodoEntity";
import uuid from "../utils/uuid";
import "dotenv/config";
import TodoRepository from "../infrastructure/repositories/TodoRepository";
// import {inject, injectable} from "inversify";
import generateTodo from "../utils/faker";

const todoRepository = new TodoRepository();
class TodoService {
    constructor() {
    }

    async createTodoFaker() {
        const todos = [];
        for (let i = 0; i < 10; i++) {
          todos.push(generateTodo());
        }
        const createdTodos = await Promise.all(
          todos.map(async (todoItem) => {
            return await todoRepository.createTodoItem({
              title: todoItem.title,
              completed: todoItem.completed,
              id: todoItem.id
            });
          })
        );
        return createdTodos;
      }
    
    
    async createTodoItem(title: string, completed: boolean) {
        const id = uuid.generate();
        const newTodoData = { id, title, completed };
        const newTodo = Todo.todoFactory(newTodoData);
        return todoRepository.createTodoItem({ ...newTodo });
    }

    async findAllTodos(limit: number = 10, offset: number = 0) {
        try {
            return await todoRepository.findManyTodos(limit, offset);
        } catch (e) {
            throw new Error('Failed to find all todo items')
        }
    }

    async readById(id: string) {
        try {
            return await todoRepository.findUniqueTodo(id);
        } catch (e) {
            throw new Error('Failed to read todo');
        }
    }

    async deleteTodoById(id: string) {
        const record = await todoRepository.findUniqueTodo(id);

        if (!record) {
            throw new Error('Record not found');
        }

        return todoRepository.deleteTodo(id);
    }

    async updateById(id: string) {
        const record = await todoRepository.findUniqueTodo(id);

        if (!record) {
            throw new Error('Record not found');
        } else {
            return await todoRepository.updateTodo(id, !record.completed);
        }
    }

    
}

export default TodoService
    ;