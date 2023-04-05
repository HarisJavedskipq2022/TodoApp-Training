import { IObserver } from './ObserverInterface'

export interface ISubject {
      addObserver(observer: IObserver): void
      removeObserver(observer: IObserver): void
      notifyObservers(id: string, title: string, completed: boolean): void
}
