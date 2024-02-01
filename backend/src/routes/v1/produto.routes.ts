import { FastifyInstance } from 'fastify'

export default async function restaurantes (fastify: FastifyInstance): Promise<void> {
  // Listar todos os produtos de um restaurante
  fastify.get('/api/v1/restaurante/:restauranteId/produto', (req, rep) => {
  })

  // Criar um produto de um restaurante
  fastify.post('/api/v1/restaurante/:restauranteId/produto', (req, rep) => {
  })

  // Alterar um produto de um restaurante
  fastify.put('/api/v1/restaurante/:restauranteId/produto/:produtoId', (req, rep) => {
  })

  // Excluir um produto de um restaurante
  fastify.delete('/api/v1/restaurante/:restauranteId/produto/:produtoId', (req, rep) => {
  })
}
