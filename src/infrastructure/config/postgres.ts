import dotenv from 'dotenv'
dotenv.config()

export interface Postgres {
  pgAdminEmail: string
  pgAdminPassword: string
  postgresPassword: string
  postgresUser: string
  postgresDatabaseName: string
}

export const postgres: Postgres = {
  pgAdminEmail: process.env.PG_ADMIN_EMAIL || '',
  pgAdminPassword: process.env.PG_ADMIN_PASSWORD || '',
  postgresPassword: process.env.POSTGRES_PASSWORD || '',
  postgresUser: process.env.POSTGRES_USER || '',
  postgresDatabaseName: process.env.POSTGRES_DB || '',
}
