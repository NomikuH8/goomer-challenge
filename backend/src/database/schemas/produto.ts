import { decimal, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { diasSemana } from './common'
import { restauranteTable } from './restaurante'

export const produtoTable = pgTable('produto', {
  id: serial('id').primaryKey(),
  foto: text('foto'),
  dataCriacao: timestamp('data_criacao', { withTimezone: true }).defaultNow(),
  preco: decimal('preco', { precision: 2 }),
  restauranteId: integer('restaurante_id').references(() => restauranteTable.id)
  categoriaId: integer('categoria_id').references(() => categoriaTable.id)
})

export const produtoPromocaoHorarioTable = pgTable('produto_promocao_horario', {
  id: serial('id').primaryKey(),
  produtoId: integer('produto_id').references(() => produtoTable.id),
  diaSemana: diasSemana('dia_semana'),
  de: text('de').notNull(),
  ate: text('ate').notNull()
})

export const categoriaTable = pgTable('categoria', {
  id: serial('id').primaryKey(),
  nome: text('nome').notNull()
})
