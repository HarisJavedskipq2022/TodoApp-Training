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
require("reflect-metadata");
const chai_1 = require("chai");
const sinon_1 = __importDefault(require("sinon"));
const TodoUtility_1 = __importDefault(require("../src/services/TodoUtility"));
const TodoRepository_1 = require("../src/infrastructure/repositories/TodoRepository");
const TodoController_1 = __importDefault(require("../src/presentation_layer/controller/TodoController"));
const uuid_1 = __importDefault(require("../src/utils/uuid"));
describe("TodoController", () => {
    afterEach(() => {
        sinon_1.default.restore();
    });
    it("should create a todo and return success message", () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const todoRepositoryStub = sinon_1.default.createStubInstance(TodoRepository_1.TodoRepository);
        const todoService = new TodoUtility_1.default(todoRepositoryStub);
        const todoController = new TodoController_1.default(todoService);
        const mockRecord = {
            id: uuid_1.default.generate(),
            title: "Test Todo",
            completed: false,
            updated: new Date(),
            created: new Date(),
        };
        const req = {
            body: mockRecord,
        };
        const res = {
            json: sinon_1.default.spy(),
        };
        todoRepositoryStub.createTodoItem.resolves(mockRecord);
        // Act
        yield todoController.createTodos(req, res);
        // Assert
        (0, chai_1.expect)(todoRepositoryStub.createTodoItem.calledOnce).to.be.true;
        sinon_1.default.assert.calledWithMatch(res.json, {
            record: mockRecord,
            msg: "Successfully created todo",
        });
    }));
    it("should return all todos", () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const todoRepositoryStub = sinon_1.default.createStubInstance(TodoRepository_1.TodoRepository);
        const todoService = new TodoUtility_1.default(todoRepositoryStub);
        const todoController = new TodoController_1.default(todoService);
        const mockTodos = [
            {
                id: uuid_1.default.generate(),
                title: "Test Todo",
                completed: false,
                updated: new Date(),
                created: new Date(),
            },
        ];
        const req = {};
        let jsonResponse;
        const res = {
            json: function (response) {
                jsonResponse = response;
                return this;
            },
        };
        // Act
        todoRepositoryStub.findManyTodos.resolves(mockTodos);
        yield todoController.readTodos(req, res);
        // Assert
        (0, chai_1.expect)(todoRepositoryStub.findManyTodos.callCount).to.be.at.least(1);
        (0, chai_1.expect)(jsonResponse).to.deep.equal({ todos: mockTodos });
    }));
});
