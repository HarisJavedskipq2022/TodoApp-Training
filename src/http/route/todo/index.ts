import express from 'express'
import Middleware from '../../middleware/ValidationError'
import { AuthMiddleware } from '../../middleware/Auth'
import { TodoControllerInstance } from '../../controller/TodoController'
import { UserControllerInstance } from '../../controller/UserController'
import { container } from '../../../infrastructure/DIContainer/inversify.config'
import TodoValidator from '../../validator'

const todoRouter = express.Router()

const todoController = container.get<TodoControllerInstance>(TodoControllerInstance)
const authMiddleware = container.get<AuthMiddleware>(AuthMiddleware)

todoRouter.post(
  '/todos',
  authMiddleware.authorize,
  TodoValidator.checkCreateTodo(),
  Middleware.handleValidationError,
  todoController.create
)

todoRouter.get('/todos', authMiddleware.authorize, todoController.getAll)

todoRouter.get(
  '/todos/:id',
  authMiddleware.authorize,
  TodoValidator.checkIdParam(),
  Middleware.handleValidationError,
  todoController.getById
)

todoRouter.put(
  '/todos/:id',
  authMiddleware.authorize,
  TodoValidator.checkIdParam(),
  Middleware.handleValidationError,
  todoController.updateById
)

todoRouter.delete(
  '/todos/:id',
  authMiddleware.authorize,
  TodoValidator.checkIdParam(),
  Middleware.handleValidationError,
  todoController.deleteById
)

todoRouter.post('/populate', authMiddleware.authorize, todoController.populateByFaker)

export default todoRouter
