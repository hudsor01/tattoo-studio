import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  files: z.array(z.string()).default([]), // Make sure this is a non-optional array with default
})

export type ContactFormValues = z.infer<typeof contactSchema>
