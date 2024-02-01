import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { sql } from 'drizzle-orm'
import { restauranteHorarioTable, restauranteTable } from '../database/schemas/restaurante'
import { RowList } from 'postgres'

export class RestauranteModel {
  db: PostgresJsDatabase

  constructor (db: PostgresJsDatabase) {
    this.db = db
  }

  async getAll (): Promise<RowList<any>> {
    const select = sql`SELECT * FROM ${restauranteTable}`

    const restaurantes = await this.db.execute(select)
    return restaurantes
  }

  async getAllHorario (): Promise<RowList<any>> {
    const select = sql`SELECT * FROM ${restauranteHorarioTable}`

    const horarios = await this.db.execute(select)
    return horarios
  }
}
