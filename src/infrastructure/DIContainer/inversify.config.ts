import { Container } from 'inversify/lib/container/container'
import { TodoRepository } from '../repositories/TodoRepository'
import { UserRepository } from '../repositories/UserRepository'
import TodoService from '../../application/services/TodoService'
import UserService from '../../application/services/UserService'
import { CommandExecutor } from '../../application/CommandBus/commandExecutor'
import { AuthService } from '../../application/services/AuthService'
import { Jwt } from '../services/JwtService'
import { Encryption } from '../services/EncryptionService'
import { AuthMiddleware } from '../../http/middleware/Auth'

export const container = new Container({
  autoBindInjectable: true,
  defaultScope: 'Singleton',
})

container.bind<TodoService>('TodoService').to(TodoService)
container.bind<TodoRepository>('TodoRepository').to(TodoRepository)
container.bind<UserRepository>('UserRepository').to(UserRepository)
container.bind<UserService>('UserService').to(UserService)
container.bind<CommandExecutor>('CommandExecutor').to(CommandExecutor)
container.bind<AuthService>('AuthService').to(AuthService)
container.bind<Jwt>('Jwt').to(Jwt)
container.bind<Encryption>('Encryption').to(Encryption)
container.bind<AuthMiddleware>('AuthMiddleware').to(AuthMiddleware)
