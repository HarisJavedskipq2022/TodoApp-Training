import 'reflect-metadata'
import express from 'express'
import 'dotenv/config'
import router from './src/http/route'
import { Command } from 'commander'
import { connectionToDb } from './src/infrastructure/utils/connection'

import SlackNotify from 'slack-notify'
const MY_SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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'
const slack = SlackNotify(MY_SLACK_WEBHOOK_URL)

slack.send('Hello!')
      .then(() => {
            console.log('done!')
      })
      .catch((err) => {
            console.error(err)
      })

const program = new Command()

const app = express()

connectionToDb()

app.use(express.json())
const a = program.parse(process.argv)
const port = Number(a.args[0]) || process.env.PORT
app.use('/api/v1/todo/', router)
program.option('-p, --port <number>', 'port number')

app.listen(port, () => {
      console.log(`app is listening on port ${port}`)
})
