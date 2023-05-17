// validationSchemas.ts
import { z } from 'zod'

export const CreateUserSchema = z.object({
  email: z.string().email({ message: 'Invalid Email Address' }),
  password: z.string().min(8)
})

export const UpdatePasswordSchema = z.object({
  id: z.string().uuid({ message: 'Invalid UUID' }),
  newPassword: z.string().min(8)
})
