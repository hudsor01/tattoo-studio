import { z } from 'zod'

export const bookingSchema = z.object({
  clientName: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  clientEmail: z.string().email({ message: 'Please enter a valid email address' }),
  clientPhone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  designDescription: z.string().min(10, { message: 'Please provide a brief description' }).max(500),
  referenceImages: z.array(z.string()), // Make sure this is a non-optional array
  duration: z.number({ required_error: 'Please select a duration' }),
  tattooType: z.enum(['NEW_TATTOO', 'TOUCH_UP', 'COVER_UP', 'CONSULTATION'], {
    required_error: 'Please select an appointment type',
  }),
  bodyPart: z.string().min(1, { message: 'Please select a body part' }),
  date: z.date({ required_error: 'Please select a date' }),
  time: z.string().min(1, { message: 'Please select a time' }),
})

export type BookingFormValues = z.infer<typeof bookingSchema>

// Create a schema for the booking data that will be stored in the database
export const bookingDbSchema = bookingSchema.extend({
  id: z.string(),
  createdAt: z.date(),
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']).default('PENDING'),
  depositPaid: z.boolean().default(false),
  notes: z.string().optional(),
})

export type BookingDb = z.infer<typeof bookingDbSchema>

// Helper function to validate booking form data
export function validateBookingForm(data: unknown): {
  success: boolean
  data?: BookingFormValues
  error?: string
} {
  try {
    const validData = bookingSchema.parse(data)
    return { success: true, data: validData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', '),
      }
    }
    return { success: false, error: 'Invalid form data' }
  }
}
