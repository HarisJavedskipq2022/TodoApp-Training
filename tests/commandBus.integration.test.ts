import 'reflect-metadata'
import { expect } from 'chai'
import sinon from 'sinon'
import { Request, Response } from 'express'
import { container } from '../src/infrastructure/DIContainer/inversify.config'
import { TodoControllerInstance } from '../src/http/controller/TodoController'
import { TodoService } from '../src/application/services/TodoService'
import HttpResponse from '../src/application/utils/Response'
import { statusCode } from '../src/application/utils/Status'

describe('TodoController Integration Test', () => {
  afterEach(() => {
    sinon.restore()
  })

  it('should create a todo', async () => {
    const todoService = container.get<TodoService>('TodoService')
    const todoController = new TodoControllerInstance(todoService)

    const mockRecord = {
      id: '1',
      title: 'Test Todo',
      completed: false,
    }

    const req = {
      body: mockRecord,
    } as Request

    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
    } as unknown as Response

    const createStub = sinon
      .stub(todoService, 'create')
      .resolves(HttpResponse.create(statusCode.OK, { message: 'Successfully created todo', data: mockRecord }))

    await todoController.create(req, res)

    expect(createStub.calledOnce).to.be.true
    const [calledWithId, calledWithTitle, calledWithCompleted] = createStub.getCall(0).args
    expect(calledWithId).to.equal(mockRecord.id)
    expect(calledWithTitle).to.equal(mockRecord.title)
    expect(calledWithCompleted).to.equal(mockRecord.completed)

    const expectedResponse = HttpResponse.create(statusCode.OK, {
      message: 'Successfully created todo',
      data: mockRecord,
    })

    sinon.assert.calledOnceWithExactly(res.status as any, expectedResponse.statusCode)
    sinon.assert.calledOnceWithExactly(res.json as any, expectedResponse.body)
  })
})
