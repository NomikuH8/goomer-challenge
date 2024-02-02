import { sql } from 'drizzle-orm'
import { restauranteHorarioTable, restauranteTable } from '../database/schemas/restaurante'
import { RowList } from 'postgres'
import { db } from '../database/connection'

type RestauranteType = typeof restauranteTable.$inferSelect
type RestauranteInsertType = typeof restauranteTable.$inferInsert
type HorarioType = typeof restauranteHorarioTable.$inferSelect
type HorarioInsertType = typeof restauranteHorarioTable.$inferInsert

export class RestauranteModel {
  async getAll (): Promise<RowList<RestauranteType[]>> {
    const select = sql`SELECT * FROM ${restauranteTable}`

    const restaurantes = await db.execute<RestauranteType>(select)
    return restaurantes
  }

  async getAllHorario (): Promise<RowList<HorarioType[]>> {
    const select = sql`SELECT * FROM ${restauranteHorarioTable}`

    const horarios = await db.execute<HorarioType>(select)
    return horarios
  }

  async getOne (restauranteId: number): Promise<RowList<RestauranteType[]>> {
    const select = sql`
      SELECT *
      FROM ${restauranteTable}
      WHERE ${restauranteTable.id} = ${restauranteId}
    `

    const restaurante = await db.execute<RestauranteType>(select)
    return restaurante
  }

  async getOneHorario (restauranteId: number): Promise<RowList<HorarioType[]>> {
    const select = sql`
      SELECT *
      FROM ${restauranteHorarioTable}
      WHERE ${restauranteHorarioTable.restauranteId} = ${restauranteId}
    `

    const horarios = await db.execute<HorarioType>(select)
    return horarios
  }

  async insertRestaurante (restaurante: RestauranteInsertType): Promise<RowList<RestauranteType[]>> {
    const insert = sql`
      INSERT INTO ${restauranteTable} (
        ${restauranteTable.nome},
        ${restauranteTable.foto},
        ${restauranteTable.endereco}
      ) VALUES (
        ${restaurante.nome},
        ${restaurante.foto},
        ${restaurante.endereco}
      ) RETURNING *
    `

    const newRestaurante = await db.execute<RestauranteType>(insert)
    return newRestaurante
  }

  async insertMultipleRestauranteHorarios (restauranteId: number, horarios: HorarioInsertType[]): Promise<RowList<HorarioType[]>> {
    const insert = sql`
      INSERT INTO ${restauranteHorarioTable} (
        ${restauranteHorarioTable.restauranteId},
        ${restauranteHorarioTable.diaSemana},
        ${restauranteHorarioTable.de},
        ${restauranteHorarioTable.ate}
      ) VALUES
    `

    for (const horario of horarios) {
      insert.append(sql` (${restauranteId}, ${horario.diaSemana}, ${horario.de}, ${horario.ate})`)

      const index = horarios.findIndex((val) => val.diaSemana === horario.diaSemana)
      if (index < horarios.length - 1) {
        insert.append(sql`,`)
      }
    }

    insert.append(sql` RETURNING *`)

    const newHorarios = await db.execute<HorarioType>(insert)
    return newHorarios
  }

  async updateRestaurante (restauranteId: number, restaurante: RestauranteInsertType): Promise<RowList<RestauranteType[]>> {
    const update = sql`
      UPDATE ${restauranteTable}
      SET
        ${restauranteTable.nome} = ${restaurante.nome},
        ${restauranteTable.foto} = ${restaurante.foto},
        ${restauranteTable.endereco} = ${restaurante.endereco}
      WHERE ${restauranteTable.id} = ${restauranteId}
      RETURNING *
    `

    const updatedRestaurante = await db.execute<RestauranteType>(update)
    return updatedRestaurante
  }

  async updateRestauranteHorario (restauranteId: number, horarioId: number, horario: HorarioInsertType): Promise<RowList<HorarioType[]>> {
    const update = sql`
      UPDATE ${restauranteHorarioTable}
      SET
        ${restauranteHorarioTable.de} = ${horario.de},
        ${restauranteHorarioTable.ate} = ${horario.ate}
      WHERE ${restauranteHorarioTable.restauranteId} = ${restauranteId}
            AND ${restauranteHorarioTable.id} = ${horarioId}
      RETURNING *
    `

    const updatedHorario = await db.execute<HorarioType>(update)
    return updatedHorario
  }

  async deleteRestaurante (restauranteId: number): Promise<void> {
    const deleteQuery = sql`
      DELETE FROM ${restauranteTable}
      WHERE ${restauranteTable.id} = ${restauranteId}
    `

    await db.execute(deleteQuery)
  }

  async deleteMultipleRestauranteHorarios (restauranteId: number): Promise<void> {
    const deleteQuery = sql`
      DELETE FROM ${restauranteHorarioTable}
      WHERE ${restauranteHorarioTable.restauranteId} = ${restauranteId}
    `

    await db.execute(deleteQuery)
  }
}
