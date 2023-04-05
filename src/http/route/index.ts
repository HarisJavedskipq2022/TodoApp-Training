import express from 'express'
import Middleware from '../../http/middleware/ValidationError'
import { authMiddleware } from '../../http/middleware/Auth'
import TodoControllerInstance from '../controller/TodoController'
import UserControllerInstance from '../controller/UserController'
import { container } from '../../../inversify.config'
import TodoValidator from '../validator'

const router = express.Router()

const todoController = container.get<TodoControllerInstance>(TodoControllerInstance)
const userController = container.get<UserControllerInstance>(UserControllerInstance)

router.post(
      '/create',
      authMiddleware.authorize,
      TodoValidator.checkCreateTodo(),
      Middleware.handleValidationError,
      todoController.createTodos
)

router.post('/createbycommand', todoController.CreateTodoCommand)

router.post('/createfaker', todoController.createTodosFaker)

router.post('/signup', userController.signup)

router.post('/login', userController.login)

router.get(
      '/getusers',
      authMiddleware.authorize,
      TodoValidator.checkReadTodo(),
      Middleware.handleValidationError,
      userController.readUsers
)

router.get('/gettodos', authMiddleware.authorize, todoController.readTodos)

router.get('/findbycommand', todoController.findTodoCommand)

router.get(
      '/read/:id',
      authMiddleware.authorize,
      TodoValidator.checkIdParam(),
      Middleware.handleValidationError,
      todoController.readById
)

router.put(
      '/update/:id',
      authMiddleware.authorize,
      TodoValidator.checkIdParam(),
      Middleware.handleValidationError,
      todoController.update
)

router.delete(
      '/deletetodo/:id',
      authMiddleware.authorize,
      TodoValidator.checkIdParam(),
      Middleware.handleValidationError,
      todoController.deleteTodoById
)

router.delete('/deleteuser/:id', authMiddleware.authorize, userController.deleteUsers)

export default router