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

export const logError = (e: any, req: Request, res: Response, next: NextFunction) => {
  logger.error('An error occurred', { message: e.message, stack: e.stack })
  res.status(500).send('An error occurred')
}
