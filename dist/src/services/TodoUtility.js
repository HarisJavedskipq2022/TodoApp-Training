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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TodoEntity_1 = require("../infrastructure/domain/entity/TodoEntity");
const uuid_1 = __importDefault(require("../utils/uuid"));
require("dotenv/config");
const TodoRepository_1 = __importDefault(require("../infrastructure/repositories/TodoRepository"));
// import {inject, injectable} from "inversify";
const faker_1 = __importDefault(require("../utils/faker"));
const todoRepository = new TodoRepository_1.default();
class TodoService {
    constructor() {
    }
    createTodoFaker() {
        return __awaiter(this, void 0, void 0, function* () {
            const todos = [];
            for (let i = 0; i < 10; i++) {
                todos.push((0, faker_1.default)());
            }
            const createdTodos = yield Promise.all(todos.map((todoItem) => __awaiter(this, void 0, void 0, function* () {
                return yield todoRepository.createTodoItem({
                    title: todoItem.title,
                    completed: todoItem.completed,
                    id: todoItem.id
                });
            })));
            return createdTodos;
        });
    }
    createTodoItem(title, completed) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = uuid_1.default.generate();
            const newTodoData = { id, title, completed };
            const newTodo = TodoEntity_1.Todo.todoFactory(newTodoData);
            return todoRepository.createTodoItem(Object.assign({}, newTodo));
        });
    }
    findAllTodos(limit = 10, offset = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield todoRepository.findManyTodos(limit, offset);
            }
            catch (e) {
                throw new Error('Failed to find all todo items');
            }
        });
    }
    readById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield todoRepository.findUniqueTodo(id);
            }
            catch (e) {
                throw new Error('Failed to read todo');
            }
        });
    }
    deleteTodoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield todoRepository.findUniqueTodo(id);
            if (!record) {
                throw new Error('Record not found');
            }
            return todoRepository.deleteTodo(id);
        });
    }
    updateById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield todoRepository.findUniqueTodo(id);
            if (!record) {
                throw new Error('Record not found');
            }
            else {
                return yield todoRepository.updateTodo(id, !record.completed);
            }
        });
    }
}
exports.default = TodoService;
