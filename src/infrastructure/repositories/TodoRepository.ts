import { ITodoRepository } from '../../domain/interfaces/TodoInterface'
import { PrismaClient } from '@prisma/client'
import { injectable } from 'inversify'
import { Todo } from '../../domain/entity/TodoEntity'

const prisma = new PrismaClient()

@injectable()
export class TodoRepository implements ITodoRepository {
  constructor() {}

  async create(todo: Todo) {
    return await prisma.todo.create({ data: { ...todo } })
  }

  async getAll(limit: number = 10, offset: number = 0) {
    const items = await prisma.todo.findMany({
      take: limit,
      skip: offset,
      where: { deletedAt: null }
    })
    const totalItemCount = await prisma.todo.count({
      where: { deletedAt: null }
    })

    return { items, totalItemCount }
  }

  async getById(id: string) {
    return prisma.todo.findFirst({
      where: { id, deletedAt: null }
    })
  }

  async softDelete(id: string) {
    return await prisma.todo.update({
      where: { id },
      data: { deletedAt: new Date() }
    })
  }

  async undelete(id: string) {
    return await prisma.todo.update({
      where: { id },
      data: { deletedAt: null }
    })
  }

  async update(id: string, completed: boolean) {
    return prisma.todo.update({
      where: { id },
      data: { completed }
    })
  }
}
