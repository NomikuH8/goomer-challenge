import { sql } from 'drizzle-orm'
import { produtoPromocaoHorarioTable, produtoTable } from '../database/schemas/produto'
import { RowList } from 'postgres'
import { db } from '../database/connection'

type ProdutoType = typeof produtoTable.$inferSelect
type ProdutoInsertType = typeof produtoTable.$inferInsert
type HorarioType = typeof produtoPromocaoHorarioTable.$inferSelect
type HorarioInsertType = typeof produtoPromocaoHorarioTable.$inferInsert

export class ProdutoModel {
  async getAllFromRestaurante (restauranteId: number): Promise<RowList<ProdutoType[]>> {
    const select = sql`
      SELECT *
      FROM ${produtoTable}
      WHERE ${produtoTable.restauranteId} = ${restauranteId}
    `

    return await db.execute(select)
  }

  async insertProduto (produto: ProdutoInsertType): Promise<RowList<ProdutoType[]>> {
    const insert = sql`
      INSERT INTO ${produtoTable} (
        ${produtoTable.restauranteId},
        ${produtoTable.foto},
        ${produtoTable.preco}
      ) VALUES (
        ${produto.restauranteId},
        ${produto.foto},
        ${produto.preco}
      )
    `

    return await db.execute(insert)
  }

  async insertMultiplePromocionalHorarios (produtoId: number, horarios: HorarioInsertType[]): Promise<RowList<HorarioType[]>> {
    const insert = sql`
      INSERT INTO ${produtoPromocaoHorarioTable} (
        ${produtoPromocaoHorarioTable.produtoId},
        ${produtoPromocaoHorarioTable.diaSemana},
        ${produtoPromocaoHorarioTable.de},
        ${produtoPromocaoHorarioTable.ate}
      ) VALUES
    `

    for (const horario of horarios) {
      insert.append(sql` (${produtoId}, ${horario.diaSemana}, ${horario.de}, ${horario.ate})`)

      const index = horarios.findIndex((val) => val.diaSemana === horario.diaSemana)
      if (index < horarios.length - 1) {
        insert.append(sql`,`)
      }
    }

    insert.append(sql` RETURNING *`)

    const newHorarios = await db.execute<HorarioType>(insert)
    return newHorarios
  }

  async updateProduto (produtoId: number, produto: ProdutoInsertType): Promise<RowList<ProdutoType[]>> {
    const update = sql`
      UPDATE ${produtoTable}
      SET
        ${produtoTable.foto} = ${produto.foto},
        ${produtoTable.preco} = ${produto.preco},
        ${produtoTable.categoriaId} = ${produto.categoriaId}
      WHERE ${produtoTable.id} = ${produtoId}
      RETURNING *
    `

    return await db.execute(update)
  }

  async updateProdutoPromocaoHorario (produtoId: number, horarioId: number, horario: HorarioInsertType): Promise<RowList<HorarioType[]>> {
    const update = sql`
      UPDATE ${produtoPromocaoHorarioTable}
      SET
        ${produtoPromocaoHorarioTable.de} = ${horario.de},
        ${produtoPromocaoHorarioTable.ate} = ${horario.ate}
      WHERE ${produtoPromocaoHorarioTable.produtoId} = ${produtoId}
            AND ${produtoPromocaoHorarioTable.id} = ${horarioId}
      RETURNING *
    `

    const updatedHorario = await db.execute<HorarioType>(update)
    return updatedHorario
  }

  async deleteProduto (produtoId: number): Promise<void> {
    const deleteQuery = sql`
      DELETE FROM ${produtoTable}
      WHERE ${produtoTable.id} = ${produtoId}
    `

    await db.execute(deleteQuery)
  }

  async deleteMultiplePromocaoHorarios (produtoId: number): Promise<void> {
    const deleteQuery = sql`
      DELETE FROM ${produtoPromocaoHorarioTable}
      WHERE ${produtoPromocaoHorarioTable.produtoId} = ${produtoId}
    `

    await db.execute(deleteQuery)
  }
}
