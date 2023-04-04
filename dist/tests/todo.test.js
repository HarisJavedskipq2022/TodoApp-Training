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
const TodoUtility_1 = __importDefault(require("../src/application/services/TodoUtility"));
const TodoRepository_1 = require("../src/infrastructure/repositories/TodoRepository");
const TodoController_1 = __importDefault(require("../src/http/controller/TodoController"));
const uuid_1 = __importDefault(require("../src/infrastructure/utils/uuid"));
describe("TodoController", () => {
    afterEach(() => {
        sinon_1.default.restore();
    });
    it("should create a todo", () => __awaiter(void 0, void 0, void 0, function* () {
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
        yield todoController.createTodos(req, res);
        (0, chai_1.expect)(todoRepositoryStub.createTodoItem.calledOnce).to.be.true;
        sinon_1.default.assert.calledWithMatch(res.json, {
            record: mockRecord,
            msg: "Successfully created todo",
        });
    }));
    it("should delete a todo", () => __awaiter(void 0, void 0, void 0, function* () {
        const todoRepositoryStub = sinon_1.default.createStubInstance(TodoRepository_1.TodoRepository);
        const todoService = new TodoUtility_1.default(todoRepositoryStub);
        const todoController = new TodoController_1.default(todoService);
        const mockTodoId = uuid_1.default.generate();
        const req = {
            params: {
                id: mockTodoId,
            },
        };
        const res = {
            json: sinon_1.default.spy(),
            status: sinon_1.default.stub().returnsThis(),
        };
        todoRepositoryStub.findUniqueTodo.resolves({
            id: mockTodoId,
            title: "Test Todo",
            completed: false,
            updated: new Date(),
            created: new Date(),
        });
        todoRepositoryStub.deleteTodo.resolves();
        yield todoController.deleteTodoById(req, res);
        (0, chai_1.expect)(todoRepositoryStub.findUniqueTodo.callCount).to.equal(1);
        (0, chai_1.expect)(todoRepositoryStub.findUniqueTodo.calledWith(mockTodoId)).to.be.true;
        (0, chai_1.expect)(todoRepositoryStub.deleteTodo.callCount).to.equal(1);
        (0, chai_1.expect)(todoRepositoryStub.deleteTodo.calledWith(mockTodoId)).to.be.true;
        sinon_1.default.assert.calledWith(todoRepositoryStub.findUniqueTodo, mockTodoId);
        sinon_1.default.assert.calledWith(todoRepositoryStub.deleteTodo, mockTodoId);
    }));
});
