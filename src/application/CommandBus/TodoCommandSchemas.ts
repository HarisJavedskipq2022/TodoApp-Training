import { z } from 'zod'

export const TodoSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(10),
  completed: z.boolean()
})

export const FindManySchema = z.object({
  limit: z.number().min(1),
  offset: z.number().min(0)
})

export const StringIdSchema = z.object({
  id: z.string()
})

export const UpdateTodoSchema = z.object({
  id: z.string().uuid(),
  completed: z.boolean()
})
