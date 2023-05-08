import express from 'express'
import Middleware from '../../middleware/ValidationError'
import { AuthMiddleware } from '../../middleware/Auth'
import { UserControllerInstance } from '../../controller/UserController'
import { container } from '../../../infrastructure/DIContainer/inversify.config'
import { GoogleAuthController } from '../../controller/GoogleAuthController'
import TodoValidator from '../../validator'

const userRouter = express.Router()

const userController = container.get<UserControllerInstance>(UserControllerInstance)
const authMiddleware = container.get<AuthMiddleware>(AuthMiddleware)
const googleAuthController = container.get<GoogleAuthController>(GoogleAuthController)

userRouter.get(
  '/users',
  authMiddleware.authorize,
  TodoValidator.checkReadTodo(),
  Middleware.handleValidationError,
  userController.getAll
)

userRouter.post('/signup', TodoValidator.checkUser(), Middleware.handleValidationError, userController.signup)

userRouter.post('/login', userController.login)

userRouter.delete('/users/:id', authMiddleware.authorize, userController.delete)

userRouter.get('/auth/google', googleAuthController.redirectToGoogle)

userRouter.get('/auth/google/callback', googleAuthController.handleGoogleCallback)

userRouter.put('/users', authMiddleware.authorize, userController.update)

export default userRouter
