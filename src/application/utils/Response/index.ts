import { Response } from 'express'
import { statusCode as StatusCode } from '../Status'

interface Body {
  message?: string
  data?: any
}

class HttpResponse {
  statusCode: (typeof StatusCode)[keyof typeof StatusCode]
  body: Body

  constructor(statusCode: (typeof StatusCode)[keyof typeof StatusCode], body: Body) {
    this.statusCode = statusCode
    this.body = body
  }

  static create(responseCode: (typeof StatusCode)[keyof typeof StatusCode], body: any): HttpResponse {
    const responseBody: Body = [StatusCode.SERVER_ERROR, StatusCode.NOT_FOUND, StatusCode.UNAUTHORIZED].includes(
      responseCode
    )
      ? { message: body }
      : { data: body }

    return new HttpResponse(responseCode, responseBody)
  }

  static applyToExpressResponse(res: Response, httpResponse: HttpResponse): Response {
    return res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

export default HttpResponse
