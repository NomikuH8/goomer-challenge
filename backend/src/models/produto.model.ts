import { sql } from 'drizzle-orm'
import { produtoTable } from '../database/schemas/produto'
import { RowList } from 'postgres'
import { db } from '../database/connection'

type ProdutoType = typeof produtoTable.$inferSelect
type ProdutoInsertType = typeof produtoTable.$inferInsert

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
      ) VALUES (
        ${produto.restauranteId}
      )
    `

    return await db.execute(insert)
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

  async deleteProduto (produtoId: number): Promise<void> {
    const deleteQuery = sql`
      DELETE FROM ${produtoTable}
      WHERE ${produtoTable.id} = ${produtoId}
    `

    await db.execute(deleteQuery)
  }
}
