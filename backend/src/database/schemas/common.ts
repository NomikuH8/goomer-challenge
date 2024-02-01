import { pgEnum } from 'drizzle-orm/pg-core'

export const diasSemana = pgEnum('dias_semana', [
  'domingo',
  'segunda',
  'terca',
  'quarta',
  'quinta',
  'sexta',
  'sabado'
])
