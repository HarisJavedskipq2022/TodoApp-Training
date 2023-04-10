import { Todo } from '../entity/TodoEntity'
import { Observer } from './ObserverInterface'

export interface ITodoRepository {
      create(todo: Todo): Promise<Todo>
      findMany(limit?: number, offset?: number): Promise<Todo[]>
      findUnique(id: string): Promise<Todo | null>
      delete(id: string): Promise<Todo>
      update(id: string, completed: boolean): Promise<Todo>
}
