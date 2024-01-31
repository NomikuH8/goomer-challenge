import { fastifyAutoload } from '@fastify/autoload'
import { fastifyCors } from '@fastify/cors'
import { FastifyInstance, fastify } from 'fastify'
import { resolve } from 'path'

export default async function getServer (): Promise<FastifyInstance> {
  const app = fastify({
    logger: false
  })

  await app.register(fastifyAutoload, {
    dir: resolve(__dirname, '..', 'routes'),
    dirNameRoutePrefix: false
  })

  await app.register(fastifyCors, {
    origin: '*'
  })

  return await app
}
