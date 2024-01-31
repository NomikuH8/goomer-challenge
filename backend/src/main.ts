import { configDotenv } from 'dotenv'
import getServer from './functions/getServer'

configDotenv()

async function main (): Promise<void> {
  const app = await getServer()

  await app.listen({
    host: '0.0.0.0',
    port: parseInt(process.env.PORT ?? '8400')
  })
}

main()
  .then(() => {
    console.log('Servidor rodando em ' + process.env.PORT)
  })
  .catch((err) => {
    console.error(err)
  })
