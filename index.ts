import { OAuth2Client } from 'google-auth-library'
import 'reflect-metadata'
import express from 'express'
import router from './src/http/route'
import { Command } from 'commander'
import { connectionToDb } from './src/infrastructure/database/connection'
import 'dotenv/config'
import config from './src/infrastructure/config'
import { Request, Response } from 'express'

const app = express()
const program = new Command()

connectionToDb()

app.use(express.json())
app.use('/api/v1/todo/', router)

const a = program.parse(process.argv)
const port = Number(a.args[0]) || config.ports.port

program.option('-p, --port <number>', 'port number')

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:8000/auth/google/callback'
)

app.get('/auth/google', (req: Request, res: Response) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['profile', 'email'],
  })
  res.redirect(authUrl)
})

app.get('/auth/google/callback', async (req: Request, res: Response) => {
  const { code } = req.query
  try {
    const { tokens } = await oauth2Client.getToken(code as string)
    oauth2Client.setCredentials(tokens)

    const userInfoResponse = await oauth2Client.request({
      url: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
    })

    console.log(userInfoResponse.data)

    res.send('Google authentication successful!')
  } catch (error) {
    console.error('Error retrieving access token', error)
    res.status(500).send('Error retrieving access token')
  }
})

app.listen(port, () => {
  console.log(`app is listening on port ${config.ports.port}`)
})
