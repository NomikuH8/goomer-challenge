import { z } from 'zod'

const regex = /[0-9]{2}:[0-9]{2}/g

export const produtoSchema = z.object({
  foto: z.string().optional(),
  nome: z.string(),
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
