import express from 'express'
import Middleware from '../../http/middleware/ValidationError'
import { AuthMiddleware } from '../../http/middleware/Auth'
import { TodoControllerInstance } from '../controller/TodoController'
import { UserControllerInstance } from '../controller/UserController'
import { container } from '../../infrastructure/DIContainer/inversify.config'
import TodoValidator from '../validator'
import { GoogleAuthController } from '../controller/GoogleAuthController'

const router = express.Router()

const todoController = container.get<TodoControllerInstance>(TodoControllerInstance)
const userController = container.get<UserControllerInstance>(UserControllerInstance)
const authMiddleware = container.get<AuthMiddleware>(AuthMiddleware)
const googleAuthController = container.get<GoogleAuthController>(GoogleAuthController)

router.post(
  '/create',
  authMiddleware.authorize,
  TodoValidator.checkCreateTodo(),
  Middleware.handleValidationError,
  todoController.create
)

router.post('/signup', TodoValidator.checkUser(), Middleware.handleValidationError, userController.signup)

router.post('/login', userController.login)

router.get(
  '/getusers',
  authMiddleware.authorize,
  TodoValidator.checkReadTodo(),
  Middleware.handleValidationError,
  userController.read
)

router.get('/gettodos', authMiddleware.authorize, todoController.getAll)

router.get(
  '/read/:id',
  authMiddleware.authorize,
  TodoValidator.checkIdParam(),
  Middleware.handleValidationError,
  todoController.getById
)

router.put(
  '/update/:id',
  authMiddleware.authorize,
  TodoValidator.checkIdParam(),
  Middleware.handleValidationError,
  todoController.updateById
)

router.delete(
  '/deletetodo/:id',
  authMiddleware.authorize,
  TodoValidator.checkIdParam(),
  Middleware.handleValidationError,
  todoController.deleteById
)

router.delete('/deleteuser/:id', authMiddleware.authorize, userController.delete)

router.get('/auth/google', googleAuthController.redirectToGoogle)

router.get('/auth/google/callback', googleAuthController.handleGoogleCallback)

router.post('/updateuser', userController.update)

export default router
