import { z } from 'zod'

const regex = /[0-9]{2}:[0-9]{2}/g

export const produtoSchema = z.object({
  id: z.number().optional(),
  nome: z.string(),
  foto: z.string().optional(),
  preco: z.number(),
  categoria: z.string(),
  promocao: z.object({
    descricao: z.string().optional(),
    preco: z.number(),
    horario: z.object({
      domingo: z.object({
        de: z.string().regex(regex),
        ate: z.string().regex(regex)
      }),
      segunda: z.object({
        de: z.string().regex(regex),
        ate: z.string().regex(regex)
      }),
      terca: z.object({
        de: z.string().regex(regex),
        ate: z.string().regex(regex)
      }),
      quarta: z.object({
        de: z.string().regex(regex),
        ate: z.string().regex(regex)
      }),
      quinta: z.object({
        de: z.string().regex(regex),
        ate: z.string().regex(regex)
      }),
      sexta: z.object({
        de: z.string().regex(regex),
        ate: z.string().regex(regex)
      }),
      sabado: z.object({
        de: z.string().regex(regex),
        ate: z.string().regex(regex)
      })
    })
  }).optional()
})

export type ProdutoType = z.infer<typeof produtoSchema>
