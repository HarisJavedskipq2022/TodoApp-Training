// import "reflect-metadata"
// import { expect } from "chai";
// import sinon from "sinon";
// import { Request, Response } from "express";
// import TodoService from "../src/services/TodoUtility";
// import { TodoRepository } from "../src/infrastructure/repositories/TodoRepository";
// import TodoControllerInstance from "../src/presentation_layer/controller/TodoController";
// import uuid  from "../src/utils/uuid";


// describe("TodoController", () => {
//     afterEach(() => {
//       sinon.restore();
//     });
  
//     it("should create a todo and return success message", async () => {
//       // Arrange
//       const todoRepositoryStub = sinon.createStubInstance(TodoRepository);
  
//       const todoService = new TodoService(todoRepositoryStub as any);
  
//       const todoController = new TodoControllerInstance(todoService);
  
//       const mockRecord = {
//         id: uuid.generate(),
//         title: "Test Todo",
//         completed: false,
//         updated: new Date(),
//         created: new Date(),
//       };
  
//       const req = {
//         body: mockRecord,
//       } as Request;
  
//       const res = {
//         json: sinon.spy(),
//       } as unknown as Response;
  
//       todoRepositoryStub.createTodoItem.resolves(mockRecord);
  
//       // Act
//       await todoController.createTodos(req, res);
  
//       // Assert
//       expect(todoRepositoryStub.createTodoItem.calledOnce).to.be.true;
//       sinon.assert.calledWithMatch(res.json as sinon.SinonSpy, {
//         record: mockRecord,
//         msg: "Successfully created todo",
//       });
//     });
// });
