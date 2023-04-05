import 'reflect-metadata'
import express from 'express'
import 'dotenv/config'
import router from './src/http/route'
import { Command } from 'commander'
import { connectionToDb } from './src/infrastructure/utils/connection'
import SlackNotify from 'slack-notify'

const slack = SlackNotify(process.env.SLACK_WEBHOOK_URL as string)

slack.send('Hello!')
      .then(() => {
            console.log('done!')
      })
      .catch((err) => {
            console.error(err)
      })

const app = express()
const program = new Command()

connectionToDb()

app.use(express.json())
app.use('/api/v1/todo/', router)

const a = program.parse(process.argv)
const port = Number(a.args[0]) || process.env.PORT

program.option('-p, --port <number>', 'port number')

app.listen(port, () => {
      console.log(`app is listening on port ${port}`)
})
