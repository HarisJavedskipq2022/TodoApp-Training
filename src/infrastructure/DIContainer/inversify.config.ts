import { Container } from 'inversify/lib/container/container'
import { TodoRepository } from '../repositories/TodoRepository'
import { UserRepository } from '../repositories/UserRepository'
import { TodoService } from '../../application/services/TodoService'
import { UserService } from '../../application/services/UserService'
import { AuthService } from '../../application/services/AuthService'
import { Jwt } from '../services/JwtService'
import { Encryption } from '../services/EncryptionService'
import { AuthMiddleware } from '../../http/middleware/Auth'
import { GoogleAuthService } from '../services/GoogleAuthService'
import { CommandBus } from '../../application/CommandBus'
import { ICommandHandler } from '../../application/CommandBus/CommandInterface'
import {
  CreateTodoHandler,
  FindManyTodosHandler,
  FindUniqueTodoHandler,
  DeleteTodoHandler,
  UpdateTodoHandler,
} from '../../application/CommandBus/TodoHandlers'

export const container = new Container({
  autoBindInjectable: true,
  defaultScope: 'Singleton',
})

container.bind<TodoService>('TodoService').to(TodoService)
container.bind<TodoRepository>('TodoRepository').to(TodoRepository)
container.bind<UserRepository>('UserRepository').to(UserRepository)
container.bind<UserService>('UserService').to(UserService)
container.bind<AuthService>('AuthService').to(AuthService)
container.bind<Jwt>('Jwt').to(Jwt)
container.bind<Encryption>('Encryption').to(Encryption)
container.bind<AuthMiddleware>('AuthMiddleware').to(AuthMiddleware)
container.bind<GoogleAuthService>('GoogleAuthService').to(GoogleAuthService)
container.bind<CommandBus>('CommandBus').to(CommandBus)
container.bind<ICommandHandler>('CommandHandler').to(CreateTodoHandler)
container.bind<ICommandHandler>('CommandHandler').to(FindManyTodosHandler)
container.bind<ICommandHandler>('CommandHandler').to(FindUniqueTodoHandler)
container.bind<ICommandHandler>('CommandHandler').to(DeleteTodoHandler)
container.bind<ICommandHandler>('CommandHandler').to(UpdateTodoHandler)
