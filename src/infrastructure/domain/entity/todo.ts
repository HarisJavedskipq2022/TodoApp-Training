export class Todo {
  constructor(
    public id: string,
    public title: string,
    public completed: boolean
  ) {
    this.id = id;
    this.title = title;
    this.completed = completed;
  }
}
