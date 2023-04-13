import { OAuth2Client } from 'google-auth-library'
import { injectable } from 'inversify'
import 'dotenv/config'

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.CALLBACK_URL
)

@injectable()
export class GoogleAuthService {
  constructor() {}

  generateAuthUrl() {
    return oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['profile', 'email'],
    })
  }

  async getUserInfo(code: string): Promise<any> {
    const { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)

    const userInfoResponse = await oauth2Client.request({
      url: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
    })

    return userInfoResponse.data
  }
}
