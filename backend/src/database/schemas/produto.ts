import { decimal, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { diasSemana } from './common'

export const produtoTable = pgTable('produto', {
  id: serial('id').primaryKey(),
  foto: text('foto'),
  dataCriacao: timestamp('data_criacao', { withTimezone: true }).defaultNow(),
  preco: decimal('preco', { precision: 2 }),
  categoria: integer('categoria').references(() => categoriaTable.id)
})

export const produtoPromocaoHorarioTable = pgTable('produto_promocao_horario', {
  id: serial('id').primaryKey(),
  diaSemana: diasSemana('dia_semana'),
  de: text('de').notNull(),
  ate: text('ate').notNull()
})

export const categoriaTable = pgTable('categoria', {
  id: serial('id').primaryKey(),
  nome: text('nome').notNull()
})
