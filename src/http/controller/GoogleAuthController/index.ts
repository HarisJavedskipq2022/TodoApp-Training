import { Request, Response } from 'express'
import { GoogleAuthService } from '../../../application/services/GoogleAuthService'
import { injectable, inject } from 'inversify'

@injectable()
export class GoogleAuthController {
  constructor(@inject('GoogleAuthService') private googleAuthService: GoogleAuthService) {}

  redirectToGoogle = (req: Request, res: Response) => {
    const authUrl = this.googleAuthService.generateAuthUrl()
    res.redirect(authUrl)
  }

  handleGoogleCallback = async (req: Request, res: Response) => {
    const { code } = req.query
    try {
      const userInfo = await this.googleAuthService.getUserInfo(code as string)
      console.log(userInfo)
      res.send({ message: 'Google authentication successful!' })
    } catch (error) {
      console.error('Error retrieving access token', error)
      res.status(500).send('Error retrieving access token')
    }
  }
}
