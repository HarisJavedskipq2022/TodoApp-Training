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

    // Validate the id
    if (!id || id.length === 0) {
      throw new Error('The id must be a non-empty string.')
    }

    // Validate the title
    if (!title || title.length === 0) {
      throw new Error('The title must be a non-empty string.')
    }

    // Validate the completed flag
    if (typeof completed !== 'boolean') {
      throw new Error('The completed flag must be a boolean.')
    }

    if (data.id) {
      return new Todo(id, title, completed)
    }
    return new Todo(uuid(), title, completed)
  }
}
