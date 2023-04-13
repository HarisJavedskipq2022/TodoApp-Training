import { Request, Response } from 'express'
import { GoogleAuthService } from '../../../infrastructure/services/GoogleAuthService'
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
      res.send({ message: 'Success', userInfo })
    } catch (error) {
      console.error('Error retrieving access token', error)
      res.status(500).send('Error retrieving access token')
    }
  }
}
