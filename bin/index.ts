import 'reflect-metadata'
import express from 'express'
import todoRouter from '../src/http/route/todo'
import userRouter from '../src/http/route/user'
import { Command } from 'commander'
import { connectionToDb } from '../src/infrastructure/database/connection'
import 'dotenv/config'
import config from '../src/infrastructure/config'
import cors from 'cors'
import signale from 'signale'
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const app = express()
app.use(cors())
const program = new Command()

connectionToDb()

async function resetDeletedAt() {
  await prisma.todo.updateMany({
    data: { deletedAt: null }
  })
}

resetDeletedAt().catch((e) => console.error(e))

app.use(express.json())
app.use('/api/v1', todoRouter)
app.use('/api/v1', userRouter)

const a = program.parse(process.argv)
const port = Number(a.args[0]) || config.ports.port

program.option('-p, --port <number>', 'port number')

app.listen(port, () => {
  signale.info(`app is listening on port ${port}`)
})
