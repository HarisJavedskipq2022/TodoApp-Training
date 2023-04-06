import { ITodoRepository } from '../../domain/interfaces/TodoInterface'
import { PrismaClient } from '@prisma/client'
import { injectable } from 'inversify'
import { Todo } from '../../domain/entity/TodoEntity'
import { Observer } from '../observer/observer'

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
            console.log('Notifying observers...')
            this.observers.forEach((observer) => observer.update(event, data))
      }

      async create(todo: Todo) {
            console.log('Creating a new Todo:', todo)
            const createdTodo = await prisma.todo.create({ data: { ...todo } })
            this.notifyObservers('create', createdTodo)
            return createdTodo
      }

      async findMany(limit: number = 10, offset: number = 0) {
            return prisma.todo.findMany({ take: limit, skip: offset })
      }

      async findUnique(id: string) {
            return prisma.todo.findUnique({ where: { id } })
      }

      async delete(id: string) {
            return prisma.todo.delete({ where: { id } })
      }

      async update(id: string, completed: boolean) {
            return prisma.todo.update({
                  where: { id },
                  data: { completed },
            })
      }
}
