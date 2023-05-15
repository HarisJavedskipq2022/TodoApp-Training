import uuid from '../utility/uuid'

export class Todo {
  id: string
  title: string
  completed: boolean

  private constructor(id: string, title: string, completed: boolean) {
    this.id = id
    this.title = title
    this.completed = completed
  }

  static todoFactory(data: { id: string; title: string; completed: boolean }): Todo {
    const { id, title, completed } = data

    if (!title) {
      throw new Error('Title is required')
    }

    if (typeof completed !== 'boolean') {
      throw new Error('Completed must be a boolean')
    }

    if (data.id && typeof data.id !== 'string') {
      throw new Error('ID must be a string')
    }

    if (data.id) {
      return new Todo(id, title, completed)
    }

    return new Todo(uuid(), title, completed)
  }
}
