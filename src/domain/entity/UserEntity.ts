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

    if (!email || email.length === 0) {
      throw new Error('The email must be a non-empty string.')
    }

    if (!password || password.length === 0) {
      throw new Error('The password must be a non-empty string.')
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      throw new Error('The email must be in a valid format.')
    }

    if (password.length < 8) {
      throw new Error('The password must be at least 6 characters long.')
    }

    if (data.id) {
      return new User(id, email, password)
    }
    return new User(uuid(), email, password)
  }
}
