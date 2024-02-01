import { z } from 'zod'

const regex = /[0-9]{2}:[0-9]{2}/g

export const restauranteSchema = z.object({
  id: z.number().optional(),
  nome: z.string(),
  foto: z.string(),
  endereco: z.string(),
  horarioFuncionamento: z.object({
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
})

export type RestauranteType = z.infer<typeof restauranteSchema>
