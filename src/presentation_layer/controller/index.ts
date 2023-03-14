import {TodoService} from '../../services/TodoService';

const todoService = new TodoService();

export const readPagination = todoService.readPagination

export const createTodo = todoService.createTodos

export const readById = todoService.readById

export const signup = todoService.signup

export const login = todoService.login

export const deleteTodo = todoService.delete

export const deleteUser = todoService.deleteUsers

export const updateCompleted = todoService.updateTodo

export const updateTodo = todoService.update

export const readUsers = todoService.readUsers


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




