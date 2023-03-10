"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoFactory = void 0;
const todo_1 = require("../entity/todo");
class TodoFactory {
    static create({ id, title, completed, }) {
        return new todo_1.Todo(id, title, completed);
    }
}
exports.TodoFactory = TodoFactory;
