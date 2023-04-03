import "reflect-metadata"
import { expect } from "chai";
import sinon from "sinon";
import { Request, Response } from "express";
import TodoService from "../src/services/TodoUtility";
import { TodoRepository } from "../src/infrastructure/repositories/TodoRepository";
import TodoControllerInstance from "../src/presentation_layer/controller/TodoController";
import uuid  from "../src/utils/uuid";


describe("TodoController", () => {
    afterEach(() => {
      sinon.restore();
    });

    it("should create a todo and return success message", async () => {

        const todoRepositoryStub = sinon.createStubInstance(TodoRepository);
    
        const todoService = new TodoService(todoRepositoryStub as any);
    
        const todoController = new TodoControllerInstance(todoService);
    
        const mockRecord = {
          id: uuid.generate(),
          title: "Test Todo",
          completed: false,
          updated: new Date(),
          created: new Date(),
        };
    
        const req = {
          body: mockRecord,
        } as Request;
    
        const res = {
          json: sinon.spy(),
        } as unknown as Response;
    
        todoRepositoryStub.createTodoItem.resolves(mockRecord);
    
        await todoController.createTodos(req, res);

        expect(todoRepositoryStub.createTodoItem.calledOnce).to.be.true;
        sinon.assert.calledWithMatch(res.json as sinon.SinonSpy, {
          record: mockRecord,
          msg: "Successfully created todo",
        });
      });

      it("should delete a todo", async () => {
        
        const todoRepositoryStub = sinon.createStubInstance(TodoRepository);
    
        const todoService = new TodoService(todoRepositoryStub as any);
    
        const todoController = new TodoControllerInstance(todoService);
    
        const mockTodoId = uuid.generate();
    
        const req = {
            params: {
                id: mockTodoId,
            },
        } as unknown as Request;
    
        const res = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis(),
        } as unknown as Response;
    
        todoRepositoryStub.findUniqueTodo.resolves({
            id: mockTodoId,
            title: "Test Todo",
            completed: false,
            updated: new Date(),
            created: new Date(),
        });

        todoRepositoryStub.deleteTodo.resolves();
    
        await todoController.deleteTodoById(req, res);

        console.log('findUniqueTodo called with:', todoRepositoryStub.findUniqueTodo.getCall(0).args);
        console.log('deleteTodo called with:', todoRepositoryStub.deleteTodo.getCall(0).args);
    
        expect(todoRepositoryStub.findUniqueTodo.callCount).to.equal(1);
        expect(todoRepositoryStub.findUniqueTodo.calledWith(mockTodoId)).to.be.true;
        expect(todoRepositoryStub.deleteTodo.callCount).to.equal(1);
        expect(todoRepositoryStub.deleteTodo.calledWith(mockTodoId)).to.be.true;
        sinon.assert.calledWith(todoRepositoryStub.findUniqueTodo, mockTodoId);
        sinon.assert.calledWith(todoRepositoryStub.deleteTodo, mockTodoId);
        
    });
})