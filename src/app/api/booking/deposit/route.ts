import { NextResponse } from 'next/server'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { bookingSchema } from '@/lib/validators/booking'

const prisma = new PrismaClient()

// Schema for validating payment details
const paymentDetailsSchema = z.object({
  amount: z.number().min(1),
  method: z.string().min(1),
  last4: z.string().optional(),
})

// Schema for validating the request body
const depositRequestSchema = z.object({
  bookingData: bookingSchema,
  paymentDetails: paymentDetailsSchema,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validate request data
    const { bookingData, paymentDetails } = depositRequestSchema.parse(body)

    // Create transaction with external payment processor
    // In a real-world implementation, this would interact with Stripe, PayPal, etc.
    // For now, we'll simulate a successful payment
    const transactionId = `tx_${Math.random().toString(36).substring(2, 15)}`

    // First create the appointment record
    const appointment = await prisma.appointment.create({
      data: {
        clientName: bookingData.clientName,
        clientEmail: bookingData.clientEmail,
        clientPhone: bookingData.clientPhone,
        date: bookingData.date,
        time: bookingData.time,
        duration: bookingData.duration,
        tattooType: bookingData.tattooType,
        bodyPart: bookingData.bodyPart,
        designDescription: bookingData.designDescription,
        referenceImages: bookingData.referenceImages || [],
        notes: bookingData.designDescription, // Use design description as the notes
        depositPaid: true,
        depositAmount: paymentDetails.amount,
        status: 'CONFIRMED', // Mark as confirmed since deposit is paid
      },
    })

    // Then create the payment record linked to the appointment
    const payment = await prisma.payment.create({
      data: {
        appointmentId: appointment.id,
        amount: paymentDetails.amount,
        paymentType: 'DEPOSIT',
        paymentMethod: paymentDetails.method,
        last4: paymentDetails.last4 || '',
        status: 'COMPLETED',
        transactionId,
      },
    })

    // Send confirmation email
    // This would be implemented with a service like SendGrid, AWS SES, etc.
    // For now, we'll just simulate this step
    console.log(`Sending confirmation email to ${bookingData.clientEmail}`)

    // Return success response with appointment and payment details
    return NextResponse.json({
      success: true,
      appointmentId: appointment.id,
      paymentId: payment.id,
      message: 'Deposit payment successful. Your appointment is confirmed.'
    })

  } catch (error) {
    console.error('Deposit payment error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to process deposit payment' },
      { status: 500 }
    )
  }
}
