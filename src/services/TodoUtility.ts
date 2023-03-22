import {Todo} from "../infrastructure/domain/entity/TodoEntity";
import {User} from "../infrastructure/domain/entity/UserEntity";
import uuid from "../utils/uuid";
import "dotenv/config";
import {Auth} from "./bcrypt";
import TodoRepository from "../infrastructure/repositories/TodoRepository";
import {inject, injectable} from "inversify";

@injectable()
class TodoService {
    constructor(@inject('TodoRepository') private todoRepository: TodoRepository) {
    }

    async createTodoItem(title: string, completed: boolean) {
        const id = uuid.generate();
        const newTodoData = {id, title, completed};
        const newTodo = Todo.todoFactory(newTodoData);
        return this.todoRepository.createTodoItem({...newTodo});
    }

    async findAllTodos(limit: number = 10, offset: number = 0) {
        try {
            return await this.todoRepository.findManyTodos(limit, offset);
        } catch (e) {
            throw new Error('Failed to find all todo items')
        }
    }

    async readById(id: string) {
        try {
            return await this.todoRepository.findUniqueTodo(id);
        } catch (e) {
            throw new Error('Failed to read todo');
        }
    }

    async readUsers() {
        try {
            return await this.todoRepository.findManyUsers();
        } catch (e) {
            throw new Error('Users not found');
        }
    }

    async deleteUserById(id: string) {
        const user = await this.todoRepository.findUserbyId(id);
        if (!user) {
            throw new Error('User does not exist');
        }
        return this.todoRepository.deleteUser(id);
    }

    async deleteTodoById(id: string) {
        const record = await this.todoRepository.findUniqueTodo(id);

        if (!record) {
            throw new Error('Record not found');
        }

        return this.todoRepository.deleteTodo(id);
    }

    async updateById(id: string) {
        const record = await this.todoRepository.findUniqueTodo(id);

        if (!record) {
            throw new Error('Record not found');
        } else {
            return await this.todoRepository.updateTodo(id, !record.completed);
        }
    }

    async signUp(email: string, password: string) {

        const id = uuid.generate();
        const newUserData = {id, email, password};
        const finduser = await this.todoRepository.findUserByEmail(newUserData.email);

        if (finduser) {
            throw new Error("User already exists");
        }

        const createdUser = User.userFactory(newUserData);

        const hashedPassword = await Auth.hashPassword(createdUser.password);

        return this.todoRepository.createUser(id, email, hashedPassword);
    }

    async loginUser(email: string, password: string): Promise<string> {
        const user = await this.todoRepository.findUserByEmail(email);

        if (!user) {
            throw new Error('User not found');
        }
        const validatePassword = await Auth.comparePassword(password, user.password);

        if (!validatePassword) {
            throw new Error('Invalid credentials');
        }

        const secretKey = process.env.JWT_SECRET_KEY as string;
        return Auth.sign({id: user.id, email: user.email}, secretKey);
    }
}

export default TodoService
;