import { FastifyInstance } from 'fastify'

export default async function index (fastify: FastifyInstance): Promise<void> {
  fastify.get('/api', async (req, rep) => {
    return {
      mensagem: 'Servidor rodando'
    }
  })
}
