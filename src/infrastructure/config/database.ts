import dotenv from 'dotenv'
dotenv.config()

export interface Database {
  databaseUrlLocal: string
  databaseUrlDocker: string
}

export const database: Database = {
  databaseUrlLocal: process.env.DATABASE_URL_LOCAL || '',
  databaseUrlDocker: process.env.DATABASE_URL_DOCKER || '',
}
