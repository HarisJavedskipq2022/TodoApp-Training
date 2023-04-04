import { Todo } from '../entity/TodoEntity';

export interface ITodoRepository {
    createTodoItem(todo: Todo): Promise<Todo>;
    findManyTodos(limit?: number, offset?: number): Promise<Todo[]>;
    findUniqueTodo(id: string): Promise<Todo | null>;
    deleteTodo(id: string): Promise<Todo>;
    updateTodo(id: string, completed: boolean): Promise<Todo>;
  }
