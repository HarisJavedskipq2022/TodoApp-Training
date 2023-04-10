import 'reflect-metadata'
import { expect } from 'chai'
import sinon from 'sinon'
import { Request, Response } from 'express'
import TodoService from '../src/application/services/TodoService'
import { TodoRepository } from '../src/infrastructure/repositories/TodoRepository'
import { TodoControllerInstance } from '../src/http/controller/TodoController'
import uuid from '../src/domain/utility/uuid'

describe('TodoController', () => {
      afterEach(() => {
            sinon.restore()
      })

      it('should create a todo', async () => {
            const todoRepositoryStub = sinon.createStubInstance(TodoRepository)
            const todoService = new TodoService(todoRepositoryStub as any)
            const todoController = new TodoControllerInstance(todoService)

            const mockRecord = {
                  id: uuid(),
                  title: 'Test Todo',
                  completed: false,
                  updated: new Date(),
                  created: new Date(),
            }

            const req = {
                  body: mockRecord,
            } as Request

            const res = {
                  json: sinon.spy(),
            } as unknown as Response

            todoRepositoryStub.create.resolves(mockRecord)

            await todoController.create(req, res)

            expect(todoRepositoryStub.create.calledOnce).to.be.true
            sinon.assert.calledWithMatch(res.json as sinon.SinonSpy, {
                  record: mockRecord,
                  msg: 'Successfully created todo',
            })
      })

      it('should delete a todo', async () => {
            const todoRepositoryStub = sinon.createStubInstance(TodoRepository)
            const todoService = new TodoService(todoRepositoryStub as any)
            const todoController = new TodoControllerInstance(todoService)
            const mockTodoId = uuid()

            const req = {
                  params: {
                        id: mockTodoId,
                  },
            } as unknown as Request

            const res = {
                  json: sinon.spy(),
                  status: sinon.stub().returnsThis(),
            } as unknown as Response

            todoRepositoryStub.findUnique.resolves({
                  id: mockTodoId,
                  title: 'Test Todo',
                  completed: false,
                  updated: new Date(),
                  created: new Date(),
            })

            todoRepositoryStub.delete.resolves()

            await todoController.deleteById(req, res)

            expect(todoRepositoryStub.findUnique.callCount).to.equal(1)
            expect(todoRepositoryStub.findUnique.calledWith(mockTodoId)).to.be.true
            expect(todoRepositoryStub.delete.callCount).to.equal(1)
            expect(todoRepositoryStub.delete.calledWith(mockTodoId)).to.be.true
            sinon.assert.calledWith(todoRepositoryStub.findUnique, mockTodoId)
            sinon.assert.calledWith(todoRepositoryStub.delete, mockTodoId)
      })
})
