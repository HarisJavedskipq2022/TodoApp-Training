import dotenv from 'dotenv'
dotenv.config()

export interface Jwt {
  jwtSecretKey: string
}

export const jwt: Jwt = {
  jwtSecretKey: process.env.JWT_SECRET_KEY || '',
}
