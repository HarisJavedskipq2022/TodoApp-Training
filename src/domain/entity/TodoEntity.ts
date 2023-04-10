import uuid from '../utility/uuid'

export class Todo {
      id: string
      title: string
      completed: boolean

      private constructor(title: string, completed: boolean) {
            this.id = uuid()
            this.title = title
            this.completed = completed
      }

      static todoFactory(data: { title: string; completed: boolean }): Todo {
            const { title, completed } = data
            return new Todo(title, completed)
      }
}
