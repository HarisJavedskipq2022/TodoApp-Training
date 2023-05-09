import 'reflect-metadata'
import { TodoRepository } from './../src/infrastructure/repositories/TodoRepository'
import { expect } from 'chai'
import sinon from 'sinon'
import { Request, Response } from 'express'
import { TodoService } from '../src/application/services/TodoService'
import { TodoControllerInstance } from '../src/http/controller/TodoController'
import { statusCode } from '../src/application/utils/Status'
import HttpResponse from '../src/application/utils/Response'

describe('TodoController', () => {
  afterEach(() => {
    sinon.restore()
  })

  it('should create a todo', async () => {
    const todoServiceStub = sinon.createStubInstance(TodoService)
    const todoController = new TodoControllerInstance(todoServiceStub as any)

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

    todoServiceStub.create.resolves(
      HttpResponse.create(statusCode.OK, { message: 'Successfully created todo', data: mockRecord })
    )

    await todoController.create(req, res)

    expect(todoServiceStub.create.calledOnce).to.be.true
    sinon.assert.calledOnceWithExactly(res.status as any, statusCode.OK)
    sinon.assert.calledOnceWithExactly(res.json as any, { message: 'Successfully created todo', data: mockRecord })
  })

  it('should delete a todo', async () => {
    const todoServiceStub = sinon.createStubInstance(TodoService)
    const todoController = new TodoControllerInstance(todoServiceStub as any)

    const mockTodoId = '1'

    const req = {
      params: {
        id: mockTodoId,
      },
    } as unknown as Request

    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
    } as unknown as Response

    todoServiceStub.deleteById.resolves(HttpResponse.create(statusCode.OK, { message: 'Successfully deleted todo' }))

    await todoController.deleteById(req, res)

    expect(todoServiceStub.deleteById.calledOnce).to.be.true
    sinon.assert.calledOnceWithExactly(res.status as any, statusCode.OK)
    sinon.assert.calledOnceWithExactly(res.json as any, { message: 'Successfully deleted todo' })
  })
})
