import { resolve } from 'path'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { dbMigrate } from '../database/connectionMigration'

async function main (): Promise<void> {
  const db = dbMigrate
  await migrate(db, { migrationsFolder: resolve(__dirname, '..', '..', 'migrations') })
}

main()
  .then(() => {
    console.log('Migrations rodadas com sucesso')
  })
  .catch((err) => {
    console.error('Algum erro ocorreu rodando as migrations')
    console.error(err)
  })
