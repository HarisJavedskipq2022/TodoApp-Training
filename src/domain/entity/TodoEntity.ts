export class Todo {
  id: string;
  title: string;
  completed: boolean;

  private constructor(id: string, title: string, completed: boolean) {
    this.id = id;
    this.title = title;
    this.completed = completed;
  }

  static todoFactory(data: { id: string, title: string, completed: boolean, }): Todo {
    const { title, completed, id } = data
    return new Todo(id, title, completed)
  }
}







