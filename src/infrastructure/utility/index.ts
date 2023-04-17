import { faker } from '@faker-js/faker'
import { Todo } from '../../domain/entity/TodoEntity'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function createTodos(numTodos: number) {
  for (let i = 0; i < numTodos; i++) {
    const todo: Todo = {
      id: faker.datatype.uuid(),
      title: faker.vehicle.vehicle(),
      completed: faker.datatype.boolean(),
    }
    await prisma.todo.create({ data: todo })
  }
}
