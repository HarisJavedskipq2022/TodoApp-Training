import { CommandExecutor } from '../CommandBus/commandExecutor'
import { Todo } from '../../domain/entity/TodoEntity'
import uuid from '../../infrastructure/utils/uuid'
import 'dotenv/config'
import { TodoRepository } from '../../infrastructure/repositories/TodoRepository'
import { ITodoRepository } from '../../domain/interfaces/TodoInterface'
import { inject, injectable } from 'inversify'
import generateTodo from '../../infrastructure/utils/faker'
import { CreateTodoCommand } from '../CommandBus/createTodoCommand'
import { FindTodoCommand } from '../CommandBus/findTodoCommand'

@injectable()
class TodoService {
      constructor(@inject('TodoRepository') private todoRepository: ITodoRepository) {}

      async createTodoFaker() {
            const todos = []
            for (let i = 0; i < 15; i++) {
                  todos.push(generateTodo())
            }
            const createdTodos = await Promise.all(
                  todos.map(async (todoItem) => {
                        return await this.todoRepository.createTodoItem({
                              title: todoItem.title,
                              completed: todoItem.completed,
                              id: todoItem.id,
                        })
                  })
            )
            return createdTodos
      }

      async createTodoItem(title: string, completed: boolean) {
            const id = uuid.generate()
            const newTodoData = { id, title, completed }
            const newTodo = Todo.todoFactory(newTodoData)
            return this.todoRepository.createTodoItem({ ...newTodo })
      }

      async createTodoItemCommand(todo: Todo) {
            const command = new CreateTodoCommand(todo)
            const commandExecutor = new CommandExecutor(new TodoRepository())
            return commandExecutor.execute(command)
      }

      async findAllTodos(limit: number = 10, offset: number = 0) {
            try {
                  return await this.todoRepository.findManyTodos(limit, offset)
            } catch (e) {
                  throw new Error('Failed to find all todo items')
            }
      }

      async findTodosCommand(todo: Todo) {
            const command = new FindTodoCommand(todo)
            const commandExecutor = new CommandExecutor(new TodoRepository())
            return commandExecutor.execute(command)
      }

      async readById(id: string) {
            try {
                  return await this.todoRepository.findUniqueTodo(id)
            } catch (e) {
                  throw new Error('Failed to read todo')
            }
      }

      async deleteTodoById(id: string) {
            const record = await this.todoRepository.findUniqueTodo(id)

            if (!record) {
                  throw new Error('Record not found')
            }
            return this.todoRepository.deleteTodo(id)
      }

      async updateById(id: string) {
            const record = await this.todoRepository.findUniqueTodo(id)

            if (!record) {
                  throw new Error('Record not found')
            } else {
                  return await this.todoRepository.updateTodo(id, !record.completed)
            }
      }
}

export default TodoService
