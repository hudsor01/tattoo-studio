import { NextResponse } from 'next/server'
import { bookingSchema } from '@/lib/validators/booking'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validate the request body
    const result = bookingSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { message: 'Invalid booking data', errors: result.error.format() },
        { status: 400 }
      )
    }

    // Create the booking in the database using the appointment model
    const booking = await prisma.appointment.create({
      data: {
        clientName: result.data.clientName,
        clientEmail: result.data.clientEmail,
        clientPhone: result.data.clientPhone,
        date: result.data.date,
        time: result.data.time,
        duration: result.data.duration,
        tattooType: result.data.tattooType,
        bodyPart: result.data.bodyPart,
        designDescription: result.data.designDescription,
        referenceImages: result.data.referenceImages,
        status: 'PENDING',
      },
    })

    // Send email notification (in a real app)
    // await sendBookingNotification(booking)

    return NextResponse.json({
      success: true,
      id: booking.id,
      message: 'Booking request submitted successfully'
    })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { message: 'Failed to create booking' },
      { status: 500 }
    )
  }
}
