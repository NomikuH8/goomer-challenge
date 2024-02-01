import { resolve } from 'path'
import { getMigrationClient } from '../database/connection'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'

async function main (): Promise<void> {
  const client = await getMigrationClient()
  const db = drizzle(client)
  await migrate(db, { migrationsFolder: resolve(__dirname, '..', '..', 'migrations') })
  await client.end()
}

main()
  .then(() => {
    console.log('Migrations rodadas com sucesso')
  })
  .catch((err) => {
    console.error('Algum erro ocorreu rodando as migrations')
    console.error(err)
  })
