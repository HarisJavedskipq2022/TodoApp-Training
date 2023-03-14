"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readUsers = exports.updateTodo = exports.updateCompleted = exports.deleteUser = exports.deleteTodo = exports.login = exports.signup = exports.readById = exports.createTodo = exports.readPagination = void 0;
const TodoService_1 = require("../../services/TodoService");
const todoService = new TodoService_1.TodoService();
exports.readPagination = todoService.readPagination;
exports.createTodo = todoService.createTodos;
exports.readById = todoService.readById;
exports.signup = todoService.signup;
exports.login = todoService.login;
exports.deleteTodo = todoService.delete;
exports.deleteUser = todoService.deleteUsers;
exports.updateCompleted = todoService.updateTodo;
exports.updateTodo = todoService.update;
exports.readUsers = todoService.readUsers;
// export const createTodos = (req: Request, res: Response) => {
//   const todos = todoService.createTodos;
//   res.json(todos);
// };
// export const readPagination = (req: Request, res: Response) => {
//   const todos = todoService.readPagination;
// }
// export const readById = (req: Request, res: Response) => {
//   const todos = todoService.readById;
//   res.json(todos);
// }
// export const signup = (req: Request, res: Response) => {
//   const todos = todoService.signup;
//   res.json(todos);
// }
// export const login = (req: Request, res: Response) => {
//   const todos = todoService.login;
//   res.json(todos);
// }
// export const deleteTodo = (req: Request, res: Response) => {
//   const todos = todoService.delete;
//   res.json(todos)
// }
// export const updateTodo = (req: Request, res: Response) => {
//   const todos = todoService.updateTodo;
//   res.json(todos)
// }
// export const updateCompleted = (req: Request, res: Response) => {
//   const todos = todoService.update;
//   res.json(todos)
// }
// export const deleteUsers = (req: Request, res: Response) => {
//   const todos = todoService.deleteUsers;
//   res.json(todos)
// }
// export const readUsers = (req: Request, res: Response) => {
//   const todos = todoService.readUsers;
//   res.json(todos)
// }
