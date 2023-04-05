import 'reflect-metadata'
import express from 'express'
import config from './config'
import router from './src/http/route'
import { Command } from 'commander'
import { connectionToDb } from './src/infrastructure/utils/connection'
import SlackNotify from 'slack-notify'

// const slack = SlackNotify(config.slackWebHookUrl)

// slack.send('Hello!')
//       .then(() => {
//             console.log('done!')
//       })
//       .catch((err) => {
//             console.error(err)
//       })

const app = express()
const program = new Command()

connectionToDb()

app.use(express.json())
app.use('/api/v1/todo/', router)

const a = program.parse(process.argv)
const port = Number(a.args[0]) || config.port

program.option('-p, --port <number>', 'port number')

app.listen(port, () => {
      console.log(`app is listening on port ${config.port}`)
})
