"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.TodoRepository = void 0;
const client_1 = require("@prisma/client");
const inversify_1 = require("inversify");
const prisma = new client_1.PrismaClient();
let TodoRepository = class TodoRepository {
    constructor() { }
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
};
TodoRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], TodoRepository);
exports.TodoRepository = TodoRepository;
