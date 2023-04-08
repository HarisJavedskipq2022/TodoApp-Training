import { Todo } from '../entity/TodoEntity'
import { Observer } from './ObserverInterface'

export interface ITodoRepository {
      addObserver(observer: Observer): void
      removeObserver(observer: Observer): void
      notifyObservers(event: string, data: any): void
      create(todo: Todo): Promise<Todo>
      findMany(limit?: number, offset?: number): Promise<Todo[]>
      findUnique(id: string): Promise<Todo | null>
      delete(id: string): Promise<Todo>
      update(id: string, completed: boolean): Promise<Todo>
}
