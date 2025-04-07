import { z } from 'zod'
import { bookingSchema } from '@/lib/validators/booking'

// Export the main booking form values type
export type BookingFormValues = z.infer<typeof bookingSchema>

// Tattoo type enum
export type TattooType = 'NEW_TATTOO' | 'TOUCH_UP' | 'COVER_UP' | 'CONSULTATION'

// Booking status for database records
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'

// Database booking record
export interface BookingRecord extends BookingFormValues {
  id: string
  createdAt: Date
  status: BookingStatus
  depositPaid: boolean
  notes?: string
}

// API response type
export interface BookingResponse {
  success: boolean
  id?: string
  error?: string
}
