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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commandExecutor_1 = require("./../infrastructure/commandbus/commandExecutor");
const TodoEntity_1 = require("../infrastructure/domain/entity/TodoEntity");
const uuid_1 = __importDefault(require("../utils/uuid"));
require("dotenv/config");
const TodoRepository_1 = __importDefault(require("../infrastructure/repositories/TodoRepository"));
const inversify_1 = require("inversify");
const faker_1 = __importDefault(require("../utils/faker"));
const createTodoCommand_1 = require("../infrastructure/commandbus/createTodoCommand");
const findTodoCommand_1 = require("./../infrastructure/commandbus/findTodoCommand");
let TodoService = class TodoService {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    createTodoFaker() {
        return __awaiter(this, void 0, void 0, function* () {
            const todos = [];
            for (let i = 0; i < 15; i++) {
                todos.push((0, faker_1.default)());
            }
            const createdTodos = yield Promise.all(todos.map((todoItem) => __awaiter(this, void 0, void 0, function* () {
                return yield this.todoRepository.createTodoItem({
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
            return this.todoRepository.createTodoItem(Object.assign({}, newTodo));
        });
    }
    createTodoItemCommand(todo) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = new createTodoCommand_1.CreateTodoCommand(todo);
            const commandExecutor = new commandExecutor_1.CommandExecutor(new TodoRepository_1.default());
            return commandExecutor.execute(command);
        });
    }
    findAllTodos(limit = 10, offset = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.todoRepository.findManyTodos(limit, offset);
            }
            catch (e) {
                throw new Error('Failed to find all todo items');
            }
        });
    }
    findTodosCommand(todo) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = new findTodoCommand_1.FindTodoCommand(todo);
            const commandExecutor = new commandExecutor_1.CommandExecutor(new TodoRepository_1.default());
            return commandExecutor.execute(command);
        });
    }
    readById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.todoRepository.findUniqueTodo(id);
            }
            catch (e) {
                throw new Error('Failed to read todo');
            }
        });
    }
    deleteTodoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield this.todoRepository.findUniqueTodo(id);
            if (!record) {
                throw new Error('Record not found');
            }
            return this.todoRepository.deleteTodo(id);
        });
    }
    updateById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield this.todoRepository.findUniqueTodo(id);
            if (!record) {
                throw new Error('Record not found');
            }
            else {
                return yield this.todoRepository.updateTodo(id, !record.completed);
            }
        });
    }
};
TodoService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('TodoRepository')),
    __metadata("design:paramtypes", [TodoRepository_1.default])
], TodoService);
exports.default = TodoService;
