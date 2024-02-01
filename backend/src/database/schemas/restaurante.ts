import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { diasSemana } from './common'

export const restauranteTable = pgTable('restaurante', {
  id: serial('id').primaryKey(),
  nome: text('nome').notNull(),
  foto: text('foto').notNull(),
  endereco: text('endereco').default(''),
  dataCriacao: timestamp('data_criacao', { withTimezone: true }).defaultNow()
})

export const restauranteHorarioTable = pgTable('restaurante_horario', {
  id: serial('id').primaryKey(),
  diaSemana: diasSemana('dia_semana').notNull(),
  de: text('de').notNull(),
  ate: text('ate').notNull()
})
