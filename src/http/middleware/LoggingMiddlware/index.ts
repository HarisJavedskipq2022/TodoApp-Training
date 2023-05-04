import { Request, Response, NextFunction } from 'express'
import logger from '../../../infrastructure/config/logger'

export const logResponse = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now()

  res.on('finish', () => {
    const duration = Date.now() - start
    logger.info(`HTTP ${req.method} ${req.url} ${res.statusCode} ${duration}ms`)
  })

  next()
}

export const logError = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err, { req })
  res.status(500).send('An error occurred')
}
