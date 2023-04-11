import uuid from '../utility/uuid'

export class User {
  id: string
  email: string
  password: string

  private constructor(id: string, email: string, password: string) {
    this.id = id
    this.email = email
    this.password = password
  }

  static userFactory(data: { id: string; email: string; password: string }): User {
    const { id, email, password } = data
    if (data.id) {
      return new User(id, email, password)
    }
    return new User(uuid(), email, password)
  }
}
