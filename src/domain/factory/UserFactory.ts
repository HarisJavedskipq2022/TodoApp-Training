import { User } from "../entity/user";

export class UserFactory {
  static create({
    id,
    email,
    password
  }: {
    id: string;
    email: string;
    password: string;
  }): User {
    return new User(id, password, email);
  }
}
