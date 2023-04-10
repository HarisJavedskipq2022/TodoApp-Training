import uuid from '../utility/uuid'

export class User {
      id: string
      email: string
      password: string

      private constructor(email: string, password: string) {
            this.id = uuid()
            this.email = email
            this.password = password
      }

      static userFactory(data: { email: string; password: string }): User {
            const { email, password } = data
            return new User(email, password)
      }
}
