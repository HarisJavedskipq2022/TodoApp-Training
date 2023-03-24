"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class TodoRepository {
    constructor() {
    }
    createTodoItem(todo) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.todo.create({ data: Object.assign({}, todo) });
        });
    }
    findManyTodos(limit = 10, offset = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.todo.findMany({ take: limit, skip: offset });
        });
    }
    findUniqueTodo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.todo.findUnique({ where: { id } });
        });
    }
    deleteTodo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.todo.delete({ where: { id } });
        });
    }
    updateTodo(id, completed) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.todo.update({
                where: { id },
                data: { completed },
            });
        });
    }
}
exports.default = TodoRepository;
