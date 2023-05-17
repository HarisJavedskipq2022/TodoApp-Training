// validationSchemas.ts
import { z } from 'zod'

export const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export const UpdatePasswordSchema = z.object({
  id: z.string(),
  newPassword: z.string().min(8)
})
