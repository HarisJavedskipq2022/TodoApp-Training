import { PrismaClient } from '@prisma/client'
import logger from '../config/logger'

const prisma = new PrismaClient()

export async function connectionToDb() {
  prisma
    .$connect()
    .then(() => {
      logger.info('Connected to database')
    })
    .catch((err) => {
      logger.info(err, 'connection failed')
    })
    .then(() => {
      prisma.$disconnect()
    })
}
