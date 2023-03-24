import { PrismaClient } from "@prisma/client";
import { Todo } from "../domain/entity/TodoEntity";

const prisma = new PrismaClient();

class TodoRepository {

    constructor() {
    }

    async createTodoItem(todo: Todo) {
        return prisma.todo.create({ data: { ...todo } });
    }

    async findManyTodos(limit: number = 10, offset: number = 0) {
        return prisma.todo.findMany({ take: limit, skip: offset });
    }

    async findUniqueTodo(id: string) {
        return prisma.todo.findUnique({ where: { id } });
    }

    async deleteTodo(id: string) {
        return prisma.todo.delete({ where: { id } })
    }

    async updateTodo(id: string, completed: boolean) {
        return prisma.todo.update({
            where: { id },
            data: { completed },
        });
    }

}

export default TodoRepository;


