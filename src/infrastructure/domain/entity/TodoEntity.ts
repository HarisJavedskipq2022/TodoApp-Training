export class Todo {
    id: number;
    title: string;
    completed: boolean;
  
    constructor(id: number, title: string, completed: boolean) {
      this.id = id;
      this.title = title;
      this.completed = completed;
    }
    
    static todoFactory (data: {id: number, title: string, completed: boolean, }): Todo {
        const {title, completed, id} = data
        return new Todo(id, title, completed)
    }

}







