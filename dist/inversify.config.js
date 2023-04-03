"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const container_1 = require("inversify/lib/container/container");
const TodoRepository_1 = require("./src/infrastructure/repositories/TodoRepository");
const UserRepository_1 = require("./src/infrastructure/repositories/UserRepository");
const TodoUtility_1 = __importDefault(require("./src/services/TodoUtility"));
const UserUtility_1 = __importDefault(require("./src/services/UserUtility"));
exports.container = new container_1.Container({
    autoBindInjectable: true,
    defaultScope: "Singleton"
});
exports.container.bind('TodoService').to(TodoUtility_1.default);
exports.container.bind('TodoRepository').to(TodoRepository_1.TodoRepository);
exports.container.bind('UserRepository').to(UserRepository_1.UserRepository);
exports.container.bind('UserService').to(UserUtility_1.default);
