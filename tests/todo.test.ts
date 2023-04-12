import 'reflect-metadata'
import { TodoRepository } from './../src/infrastructure/repositories/TodoRepository'
import { expect } from 'chai'
import sinon from 'sinon'
import { Request, Response } from 'express'
import { TodoService } from '../src/application/services/TodoService'
import { TodoControllerInstance } from '../src/http/controller/TodoController'
import { CommandBus } from '../src/application/CommandBus'
import { DeleteTodoCommand, FindUniqueTodoCommand } from '../src/application/CommandBus/TodoCommands'
import uuid from '../src/domain/utility/uuid'

describe('TodoController', () => {
  afterEach(() => {
    sinon.restore()
  })

  it('should create a todo', async () => {
    const commandBusStub = sinon.createStubInstance(CommandBus)
    const todoService = new TodoService(commandBusStub as any)
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

    commandBusStub.execute.resolves(mockRecord)

    await todoController.create(req, res)

    expect(commandBusStub.execute.calledOnce).to.be.true
    sinon.assert.calledWithMatch(res.json as sinon.SinonSpy, {
      record: mockRecord,
      msg: 'Successfully created todo',
    })
  })

  it('should delete a todo', async () => {
    const commandBusStub = sinon.createStubInstance(CommandBus)
    const todoService = new TodoService(commandBusStub as any)
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

    const mockTodo = {
      id: mockTodoId,
      title: 'Test Todo',
      completed: false,
      updated: new Date(),
      created: new Date(),
    }

    commandBusStub.execute.withArgs(sinon.match.instanceOf(FindUniqueTodoCommand)).resolves(mockTodo)

    commandBusStub.execute.withArgs(sinon.match.instanceOf(DeleteTodoCommand)).resolves()

    await todoController.deleteById(req, res)

    expect(commandBusStub.execute.callCount).to.equal(2)
    sinon.assert.calledWithMatch(commandBusStub.execute, sinon.match.instanceOf(FindUniqueTodoCommand))
    sinon.assert.calledWithMatch(commandBusStub.execute, sinon.match.instanceOf(DeleteTodoCommand))
  })
})
