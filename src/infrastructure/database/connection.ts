import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function connectionToDb() {
  prisma
    .$connect()
    .then(() => {
      console.info('Connected to database')
    })
    .catch((err) => {
      console.info(err, 'connection failed')
    })
    .then(() => {
      prisma.$disconnect()
    })
}
