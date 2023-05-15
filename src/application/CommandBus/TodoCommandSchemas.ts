import { z } from 'zod'

export const CreateTodoCommandSchema = z.object({
  todo: z.object({
    id: z.string().uuid(),
    title: z.string().nonempty().min(10, { message: 'Title must be at least 10 characters long' }),
    completed: z.boolean().default(false)
  })
})

export const FindManyTodosCommandSchema = z.object({
  limit: z.number().int().positive().optional(),
  offset: z.number().int().nonnegative().optional()
})

export const FindUniqueTodoCommandSchema = z.object({
  id: z.string().uuid()
})

export const DeleteTodoCommandSchema = z.object({
  id: z.string().uuid()
})

export const UpdateTodoCommandSchema = z.object({
  id: z.string().uuid(),
  completed: z.boolean()
})
