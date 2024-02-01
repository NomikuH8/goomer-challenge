import type { Config } from 'drizzle-kit'
import { dbInfo } from './src/database/connection'

export default {
  schema: './src/database/schemas/*',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: dbInfo
} satisfies Config
