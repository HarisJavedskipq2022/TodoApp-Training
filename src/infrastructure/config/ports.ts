import dotenv from 'dotenv'
dotenv.config()

export interface Ports {
  port: number
  dockerPort: number
}

export const ports: Ports = {
  port: Number(process.env.PORT) || 10,
  dockerPort: Number(process.env.PORT) || 10,
}
