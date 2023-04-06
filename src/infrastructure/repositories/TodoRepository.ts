import { ITodoRepository } from '../../domain/interfaces/TodoInterface'
import { PrismaClient } from '@prisma/client'
import { injectable } from 'inversify'
import { Todo } from '../../domain/entity/TodoEntity'
import { Observer } from '../observer/observer'
import { slackNotif } from '../utils/slackNotify'

const prisma = new PrismaClient()

@injectable()
export class TodoRepository implements ITodoRepository {
      private observers: Observer[] = []

      constructor() {}

      addObserver(observer: Observer): void {
            this.observers.push(observer)
      }

      removeObserver(observer: Observer): void {
            this.observers = this.observers.filter((obs) => obs !== observer)
      }

      notifyObservers(event: string, data: any): void {
            console.log(`Event: ${event}`, data)
            this.observers.forEach((observer) => observer.update(event, data))
            slackNotif(event, data)
      }

      async create(todo: Todo) {
            console.log('Creating a new Todo:', todo)
            const createdTodo = await prisma.todo.create({ data: { ...todo } })
            this.notifyObservers('A Todo has been created with ', [createdTodo.title])
            return createdTodo
      }

      async findMany(limit: number = 10, offset: number = 0) {
            return prisma.todo.findMany({ take: limit, skip: offset })
      }

      async findUnique(id: string) {
            return prisma.todo.findUnique({ where: { id } })
      }

      async delete(id: string) {
            const deletedTodo = prisma.todo.delete({ where: { id } })
            this.notifyObservers('A Todo has been deleted with ', [(await deletedTodo).title])
            return deletedTodo
      }

      async update(id: string, completed: boolean) {
            return prisma.todo.update({
                  where: { id },
                  data: { completed },
            })
      }
}
