import { Container } from 'inversify/lib/container/container'
import { TodoRepository } from './src/infrastructure/repositories/TodoRepository'
import { UserRepository } from './src/infrastructure/repositories/UserRepository'
import TodoService from './src/application/services/TodoService'
import UserService from './src/application/services/UserService'

export const container = new Container({
      autoBindInjectable: true,
      defaultScope: 'Singleton',
})

container.bind<TodoService>('TodoService').to(TodoService)
container.bind<TodoRepository>('TodoRepository').to(TodoRepository)
container.bind<UserRepository>('UserRepository').to(UserRepository)
container.bind<UserService>('UserService').to(UserService)
