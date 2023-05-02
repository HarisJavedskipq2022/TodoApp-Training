import { Request, Response } from 'express'

export interface IGoogleAuthController {
  redirectToGoogle(req: Request, res: Response): void
  handleGoogleCallback(req: Request, res: Response): Promise<void>
}
