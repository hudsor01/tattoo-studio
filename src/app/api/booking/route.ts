import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { bookingSchema } from '@/lib/validators/booking'
import { Resend } from 'resend'
import { checkRateLimit } from '@/lib/utils/rate-limit'
import { logError } from '@/lib/utils/error-logger'

const prisma = new PrismaClient()
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

async function sendNotificationEmails(validatedData: any, studioEmail: string) {
  if (!resend) return

  try {
    // Notification to studio
    await resend.emails.send({
      from: 'Tattoo Studio <notifications@tattoo-studio.com>',
      to: [studioEmail],
      subject: `New Appointment Request from ${validatedData.clientName}`,
      text: `
Name: ${validatedData.clientName}
Email: ${validatedData.clientEmail}
Phone: ${validatedData.clientPhone}
Date: ${validatedData.date.toLocaleDateString()} at ${validatedData.time}
Duration: ${validatedData.duration} minutes
Tattoo Type: ${validatedData.tattooType}
Body Part: ${validatedData.bodyPart}
Description: ${validatedData.designDescription}
Reference Images: ${validatedData.referenceImages?.length || 0} image(s) uploaded
      `,
    })

    // Confirmation to client
    await resend.emails.send({
      from: 'Tattoo Studio <bookings@tattoo-studio.com>',
      to: [validatedData.clientEmail],
      subject: 'Your Tattoo Studio Appointment Request',
      text: `
Hi ${validatedData.clientName},

Thank you for requesting an appointment with Tattoo Studio!

We've received your request for ${validatedData.date.toLocaleDateString()} at ${validatedData.time}.

Our team will review your request and contact you within 24-48 hours to confirm availability and discuss any details. Please note that a deposit will be required to secure your appointment once confirmed.

If you have any questions in the meantime, please feel free to contact us at (555) 123-4567.

We look forward to working with you!

Best regards,
The Tattoo Studio Team
      `,
    })
  } catch (error) {
    console.error('Failed to send notification emails:', error)
    // Don't throw error - we don't want to fail the booking if emails fail
  }
}

export async function POST(req: NextRequest) {
  // Get client IP for rate limiting
  const ip = req.headers.get('x-forwarded-for') || 'unknown'

  // Check rate limit using the centralized utility
  const isAllowed = await checkRateLimit(ip, {
    limit: 3,
    duration: 60 * 60 * 24, // 24 hours
    identifier: 'booking',
  })

  if (!isAllowed) {
    return NextResponse.json(
      { error: 'Too many booking requests. Please try again tomorrow.' },
      { status: 429 }
    )
  }

  try {
    const body = await req.json()

    // Validate request data
    const validatedData = bookingSchema.parse(body)

    // Create record in database
    const appointment = await prisma.appointment.create({
      data: {
        clientName: validatedData.clientName,
        clientEmail: validatedData.clientEmail,
        clientPhone: validatedData.clientPhone,
        date: new Date(`${validatedData.date.toDateString()} ${validatedData.time}`),
        time: validatedData.time,
        duration: validatedData.duration,
        tattooType: validatedData.tattooType,
        bodyPart: validatedData.bodyPart,
        designDescription: validatedData.designDescription,
        notes: validatedData.designDescription,
        status: 'REQUESTED',
      },
    })

    // Send notification emails
    await sendNotificationEmails(
      validatedData,
      process.env.STUDIO_EMAIL || 'studio@tattoo-studio.com'
    )

    return NextResponse.json({
      success: true,
      data: {
        id: appointment.id,
        date: appointment.date,
        status: appointment.status,
      },
    })
  } catch (error: any) {
    // Use the enhanced error logging
    logError(error, 'Booking request failed', {
      context: {
        endpoint: '/api/booking',
        ip,
        // Include partial data that doesn't contain sensitive information
        partialData: req.headers.get('content-type'),
      },
    })

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid booking data', details: error.format() },
        { status: 400 }
      )
    }

    return NextResponse.json({ error: 'Failed to process booking request' }, { status: 500 })
  }
}
