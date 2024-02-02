import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

export const dbInfo = {
  host: process.env.DB_HOST ?? 'localhost',
  user: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASSWORD ?? '',
  port: parseInt(process.env.DB_PORT ?? '5432'),
  database: process.env.DB_NAME ?? 'goomer'
}

const migrationClient = postgres({
  ...dbInfo,
  max: 1
})

export const dbMigrate = drizzle(migrationClient)
