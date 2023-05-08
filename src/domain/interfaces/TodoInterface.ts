import { Todo } from '../entity/TodoEntity'

export interface ITodoRepository {
  create(todo: Todo): Promise<Todo>
  getAll(limit?: number, offset?: number): Promise<{ items: Todo[]; totalItemCount: number }>
  getById(id: string): Promise<Todo | null>
  delete(id: string): Promise<Todo>
  update(id: string, completed: boolean): Promise<Todo>
}
