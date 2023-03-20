import {PrismaClient} from '@prisma/client';
import {Todo} from "../domain/entity/TodoEntity";

class TodoRepository {

    constructor(private readonly prisma: PrismaClient) {
    }

    async createTodoItem(todo: Todo) {
        return this.prisma.todo.create({data: {...todo}});
    }

    async findManyTodos(limit: number = 10, offset: number = 0) {
        return this.prisma.todo.findMany({take: limit, skip: offset});
    }

    async findUniqueTodo(id: string) {
        return this.prisma.todo.findUnique({where: {id}});
    }

    async deleteTodo(id: string) {
        return this.prisma.todo.delete({where: {id: id}})
    }

    async updateTodo(id: string, completed: boolean) {
        return this.prisma.todo.update({
            where: {id},
            data: {completed},
        });
    }

    async findUniqueUser(email: string) {
        return this.prisma.user.findUnique({where: {email}})
    }

    async findManyUsers() {
        return this.prisma.user.findMany()
    }
}

export default TodoRepository;



