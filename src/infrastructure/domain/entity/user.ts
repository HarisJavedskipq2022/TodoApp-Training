export class User {
  constructor(
    public id: string,
    public password: string,
    public email: string
  ) {
      this.id = id,
      this.password = password,
      this.email = email
  }
}