import { ITodoRepository } from '../../domain/interfaces/TodoInterface'
import { PrismaClient } from '@prisma/client'
import { injectable } from 'inversify'
import { Todo } from '../../domain/entity/TodoEntity'
import { Observer } from '../../domain/interfaces/ObserverInterface'
import { slackNotif } from '../services/slackNotify'

const prisma = new PrismaClient()

@injectable()
export class TodoRepository implements ITodoRepository {
      constructor() {}

      async create(todo: Todo) {
            console.log('Creating a new Todo:', todo)
            const createdTodo = await prisma.todo.create({ data: { ...todo } })
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
            return deletedTodo
      }

      async update(id: string, completed: boolean) {
            return prisma.todo.update({
                  where: { id },
                  data: { completed },
            })
      }
}
