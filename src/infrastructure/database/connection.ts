import { PrismaClient } from '@prisma/client'
import signale from 'signale'

const prisma = new PrismaClient()

export async function connectionToDb() {
  prisma
    .$connect()
    .then(() => {
      signale.info('Connected to database')
    })
    .catch((err) => {
      signale.info(err, 'connection failed')
    })
    .then(() => {
      prisma.$disconnect()
    })
}
