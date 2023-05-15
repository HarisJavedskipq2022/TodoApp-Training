import dotenv from 'dotenv'
dotenv.config()

export interface Google {
  googleClientId: string
  googleClientSecret: string
  googleCallbackURL: string
}

export const google: Google = {
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  googleCallbackURL: process.env.CALLBACK_URL || ''
}
