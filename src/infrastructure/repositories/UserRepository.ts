import { PrismaClient } from "@prisma/client";
import { User } from "../domain/entity/UserEntity";

const prisma = new PrismaClient();

class UserRepository {

    constructor() { }


    async deleteUser(id: string) {
        return prisma.user.delete({ where: { id } })
    }


    async findUserByEmail(email: string) {
        return prisma.user.findUnique({ where: { email } })
    }

    async findUserbyId(id: string) {
        return prisma.user.findUnique({ where: { id } })
    }

    async findManyUsers() {
        return prisma.user.findMany()
    }

    async createUser(user: User, password: string) {
        return prisma.user.create({ data: { ...user, password } })
    }
}

export default UserRepository;