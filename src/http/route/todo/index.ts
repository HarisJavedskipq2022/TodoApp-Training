import express from 'express'
import { AuthMiddleware } from '../../middleware/Auth'
import { TodoControllerInstance } from '../../controller/TodoController'
import { container } from '../../../infrastructure/DIContainer/inversify.config'

const todoRouter = express.Router()

const todoController = container.get<TodoControllerInstance>(TodoControllerInstance)
const authMiddleware = container.get<AuthMiddleware>(AuthMiddleware)

todoRouter.post('/todos', authMiddleware.authorize, todoController.create)

todoRouter.get('/todos', authMiddleware.authorize, todoController.getAll)

todoRouter.get('/todos/:id', authMiddleware.authorize, todoController.getById)

todoRouter.put('/todos/:id', authMiddleware.authorize, todoController.updateById)

todoRouter.delete('/todos/:id', authMiddleware.authorize, todoController.deleteById)

todoRouter.post('/populate', authMiddleware.authorize, todoController.populateByFaker)

export default todoRouter
