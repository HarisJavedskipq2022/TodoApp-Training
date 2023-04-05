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
      todoController.create
)

router.post('/createbycommand', todoController.CreateByCommand)

router.post('/createfaker', todoController.create)

router.post('/signup', userController.signup)

router.post('/login', userController.login)

router.get(
      '/getusers',
      authMiddleware.authorize,
      TodoValidator.checkReadTodo(),
      Middleware.handleValidationError,
      userController.read
)

router.get('/gettodos', authMiddleware.authorize, todoController.read)

router.get('/findbycommand', todoController.findByCommand)

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
      todoController.deleteById
)

router.delete('/deleteuser/:id', authMiddleware.authorize, userController.delete)

export default router
