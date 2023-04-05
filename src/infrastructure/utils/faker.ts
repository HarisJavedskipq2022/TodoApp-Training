import { faker } from '@faker-js/faker'

export default function generateTodo() {
      return {
            id: faker.datatype.uuid(),
            title: faker.animal.cat(),
            completed: faker.datatype.boolean(),
      }
}
