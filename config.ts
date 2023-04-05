import dotenv from 'dotenv'
dotenv.config()

interface Config {
      port: number
      dockerPort: number
      databaseUrlLocal: string
      databseUrlDocker: string
      commander: string
      clientId: string
      clientSecret: string
      callbackUrl: string
      pgAdminEmail: string
      pgAdminPassword: string
      postgresPassword: string
      postgresUser: string
      postgresDatabaseName: string
      slackWebHookUrl: string
      jwtSecretKey: string
}

const config: Config = {
      port: Number(process.env.PORT) || 10,
      dockerPort: Number(process.env.PORT) || 10,
      databaseUrlLocal: process.env.DATABASE_URL_LOCAL || '',
      databseUrlDocker: process.env.DATABASE_URL_DOCKER || '',
      commander: process.env.COMMANDER || '',
      clientId: process.env.CLIENT_ID || '',
      clientSecret: process.env.CLIENT_SECRET || '',
      callbackUrl: process.env.CALLBACK_URL || '',
      pgAdminEmail: process.env.PG_ADMIN_EMAIL || '',
      pgAdminPassword: process.env.PG_ADMIN_PASSWORD || '',
      postgresPassword: process.env.POSTGRES_PASSWORD || '',
      postgresUser: process.env.POSTGRES_USER || '',
      postgresDatabaseName: process.env.POSTGRES_DB || '',
      slackWebHookUrl: process.env.SLACK_WEBHOOK_URL || '',
      jwtSecretKey: process.env.JWT_SECRET_KEY || '',
}

export default config
