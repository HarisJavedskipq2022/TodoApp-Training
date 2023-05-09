import { Response } from 'express'
import { statusCode } from '../Status'

interface Body {
  message?: string
  data?: any
}

class HttpResponse {
  statusCode: statusCode
  body: Body

  constructor(statusCode: statusCode, body: Body) {
    this.statusCode = statusCode
    this.body = body
  }

  static create(responseCode: statusCode, body: any): HttpResponse {
    const responseBody: Body = [
      statusCode.SERVER_ERROR,
      statusCode.NOT_FOUND,
      statusCode.UNAUTHORIZED,
      statusCode.ERROR,
      statusCode.ALREADY_TAKEN,
    ].includes(responseCode)
      ? { message: body }
      : { data: body }

    return new HttpResponse(responseCode, responseBody)
  }

  static applyToExpressResponse(res: Response, httpResponse: HttpResponse): Response {
    return res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

export default HttpResponse
