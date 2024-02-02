import { sql } from 'drizzle-orm'
import { produtoTable } from '../database/schemas/produto'
import { RowList } from 'postgres'
import { db } from '../database/connection'

type ProdutoType = typeof produtoTable.$inferSelect
type ProdutoInsertType = typeof produtoTable.$inferSelect

export class ProdutoModel {
  async getAllFromRestaurante (restauranteId: number): Promise<RowList<ProdutoType[]>> {
    const select = sql`
      SELECT *
      FROM ${produtoTable}
      WHERE ${produtoTable.restauranteId} = ${restauranteId}
    `

    return await db.execute(select)
  }

  insertProduto () {
  }

  updateProduto () {
  }

  deleteProduto () {
  }
}