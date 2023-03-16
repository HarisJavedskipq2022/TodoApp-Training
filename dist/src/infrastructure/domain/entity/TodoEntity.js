"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
class Todo {
    constructor(id, title, completed) {
        this.id = id;
        this.title = title;
        this.completed = completed;
    }
    static todoFactory(data) {
        const { title, completed, id } = data;
        return new Todo(id, title, completed);
    }
}
exports.Todo = Todo;
