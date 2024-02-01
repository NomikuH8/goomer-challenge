import { FastifyInstance } from 'fastify'

export default async function restaurantes (fastify: FastifyInstance): Promise<void> {
  // Listar todos os restaurantes
  fastify.get('/api/v1/restaurante', (req, rep) => {
  })

  // Listar um restaurante
  fastify.get('/api/v1/restaurante/:restauranteId', (req, rep) => {
  })

  // Cadastrar novo restaurante
  fastify.post('/api/v1/restaurante', (req, rep) => {
  })

  // Alterar dados de um restaurante
  fastify.put('/api/v1/restaurante/:restauranteId', (req, rep) => {
  })

  // Excluir um restaurante
  fastify.delete('/api/v1/restaurante/:restauranteId', (req, rep) => {
  })
}
