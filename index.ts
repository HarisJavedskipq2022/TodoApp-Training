import 'reflect-metadata'
import express from 'express'
import router from './src/http/route'
import { Command } from 'commander'
import { connectionToDb } from './src/infrastructure/database/connection'
import 'dotenv/config'
import config from './src/infrastructure/config'

const app = express()
const program = new Command()

connectionToDb()

app.use(express.json())
app.use('/api/v1/todo/', router)

const a = program.parse(process.argv)
const port = Number(a.args[0]) || config.ports.port

program.option('-p, --port <number>', 'port number')

app.listen(port, () => {
  console.log(`app is listening on port ${config.ports.port}`)
})
