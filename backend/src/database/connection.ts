import postgres, { Sql } from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'

export const dbInfo = {
  host: process.env.DB_HOST ?? 'localhost',
  user: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASSWORD ?? '',
  port: parseInt(process.env.DB_PORT ?? '5432'),
  database: process.env.DB_NAME ?? 'goomer'
}

export async function getMigrationClient (): Promise<Sql> {
  const migrationClient = postgres({
    ...dbInfo,
    max: 1
  })

  return migrationClient
}

const client = postgres({ ...dbInfo })
export const db = drizzle(client)
