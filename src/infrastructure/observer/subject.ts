import { Observer } from './observer'

export abstract class Subject {
      private observers: Observer[] = []

      addObserver(observer: Observer) {
            this.observers.push(observer)
      }

      removeObserver(observer: Observer) {
            this.observers = this.observers.filter((obs) => obs !== observer)
      }

      notify(data: any) {
            this.observers.forEach((observer) => observer.update(data))
      }
}
