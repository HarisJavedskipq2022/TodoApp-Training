import dotenv from 'dotenv'
dotenv.config()

export interface Database {
  databaseUrlLocal: string
  databseUrlDocker: string
}

export const database: Database = {
  databaseUrlLocal: process.env.DATABASE_URL_LOCAL || '',
  databseUrlDocker: process.env.DATABASE_URL_DOCKER || '',
}
