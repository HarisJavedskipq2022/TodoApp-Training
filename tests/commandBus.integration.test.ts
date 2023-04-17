import 'reflect-metadata'
import { expect } from 'chai'
import sinon from 'sinon'
import { Request, Response } from 'express'
import { container } from '../src/infrastructure/DIContainer/inversify.config'
import { TodoControllerInstance } from '../src/http/controller/TodoController'
import { TodoService } from '../src/application/services/TodoService'
import { CreateTodoCommand } from '../src/application/CommandBus/TodoCommands'
import uuid from '../src/domain/utility/uuid'

describe('TodoController Integration Test', () => {
  afterEach(() => {
    sinon.restore()
  })

  it('should create a todo', async () => {
    const todoService = container.get<TodoService>('TodoService')
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

    const createStub = sinon.stub(todoService, 'create').resolves(mockRecord)

    await todoController.create(req, res)

    it('should create a todo', async () => {
      await todoController.create(req, res)

      expect(createStub.calledOnce).to.be.true
      const [calledWithCommand] = createStub.getCall(0).args
      expect(calledWithCommand).to.be.instanceOf(CreateTodoCommand)
      expect((calledWithCommand as unknown as CreateTodoCommand).todo).to.deep.equal(mockRecord)
      sinon.assert.calledWithMatch(res.json as sinon.SinonSpy, {
        record: mockRecord,
        msg: 'Successfully created todo',
      })
    })
  })
})
