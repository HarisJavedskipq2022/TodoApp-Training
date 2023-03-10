import { Todo } from "../entity/todo";

export class TodoFactory {
  static create({
    id,
    title,
    completed,
  }: {
    id: number;
    title: string;
    completed: boolean;
  }): Todo {
    return new Todo(id, title, completed);
  }
}
