import { User } from "../infrastructure/domain/entity/UserEntity";
import uuid from "../utils/uuid";
import "dotenv/config";
import { Auth } from "./bcrypt";
import UserRepository from "../infrastructure/repositories/UserRepository";
import {inject, injectable} from "inversify";

// const userRepository = new UserRepository();

@injectable()
class UserService {
    constructor(@inject('UserRepository') private userRepository: UserRepository) {
    }

    async readUsers() {
        try {
            return await this.userRepository.findManyUsers();
        } catch (e) {
            throw new Error('Users not found');
        }
    }

    async deleteUserById(id: string) {
        const user = await this.userRepository.findUserbyId(id);
        if (!user) {
            throw new Error('User does not exist');
        }
        return this.userRepository.deleteUser(id);
    }

    async signUp(email: string, password: string) {

        const id = uuid.generate();
        const newUserData = { id, email, password };
        const finduser = await this.userRepository.findUserByEmail(newUserData.email);

        if (finduser) {
            throw new Error("User already exists");
        }

        const createdUser = User.userFactory(newUserData);

        const hashedPassword = await Auth.hashPassword(createdUser.password);

        return this.userRepository.createUser(createdUser, hashedPassword);
    }

    async loginUser(email: string, password: string): Promise<string> {
        const user = await this.userRepository.findUserByEmail(email);

        if (!user) {
            throw new Error('User not found');
        }
        const validatePassword = await Auth.comparePassword(password, user.password);

        if (!validatePassword) {
            throw new Error('Invalid credentials');
        }

        const secretKey = process.env.JWT_SECRET_KEY as string;
        return Auth.sign({ id: user.id, email: user.email }, secretKey);
    }
}

export default UserService;