import {PrismaClient} from "@prisma/client";
import {Todo} from "../infrastructure/domain/entity/TodoEntity";
import {User} from "../infrastructure/domain/entity/UserEntity";
import uuid from "../utils/uuid";
import "dotenv/config";
import {Auth} from "./bcrypt";


const prisma = new PrismaClient();

class TodoUtility {
    async createTodoItem(title: string, completed: boolean) {
        const id = uuid.generate();
        const newTodoData = {id, title, completed};
        const newTodo = Todo.todoFactory(newTodoData);
        return prisma.todo.create({data: {...newTodo}});
    }

    async findAllTodos(limit: number = 10, offset: number = 0) {
        return prisma.todo.findMany({take: limit, skip: offset});
    }

    async readById(id: string) {
        try {
            return await prisma.todo.findUnique({where: {id: id}});
        } catch (e) {
            throw new Error('Failed to read todo');
        }
    }

    async readUsers() {
        try {
            return await prisma.user.findMany({});
        } catch (e) {
            throw new Error('Users not found');
        }
    }

    async deleteUserById(id: string) {
        const user = await prisma.user.findUnique({where: {id: id}});
        if (!user) {
            throw new Error('User does not exist');
        }
        return prisma.user.delete({where: {id: id}});
    }

    async deleteTodoById(id: string) {
        const record = await prisma.todo.findUnique({where: {id}});

        if (!record) {
            throw new Error('Record not found');
        }

        return prisma.todo.delete({where: {id: id}});
    }

    async updateById(id: string) {
        const record = await prisma.todo.findUnique({where: {id}});

        if (!record) {
            throw new Error('Record not found');
        } else {
            return prisma.todo.update({
                where: {id: id},
                data: {completed: !record.completed},
            });
        }
    }

    async signUp(email: string, password: string) {

        const id = uuid.generate();
        const newUserData = {id, email, password};
        const finduser = await prisma.user.findUnique({
            where: {
                email: newUserData.email
            }
        });

        if (finduser) {
            throw new Error("User already exists");
        }

        const createdUser = User.userFactory(newUserData);

        const hashedPassword = await Auth.hashPassword(createdUser.password);


        return prisma.user.create({
            data: {
                email: createdUser.email,
                password: hashedPassword,
                id
            },
        });
    }

    async loginUser(email: string, password: string): Promise<string> {
        const user = await prisma.user.findUnique({where: {email}});

        if (!user) {
            throw new Error('User not found');
        }

        console.log({password})

        const validatePassword = await Auth.comparePassword(password, user.password);

        console.log({validatePassword})

        if (!validatePassword) {
            throw new Error('Invalid credentials');
        }

        const secretKey = process.env.JWT_SECRET_KEY as string;
        return Auth.sign({id: user.id, email: user.email}, secretKey);
    }

}

export default new TodoUtility;