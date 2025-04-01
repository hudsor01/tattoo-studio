import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { bookingSchema } from "@/lib/validators/booking";
import kv from "@vercel/kv";

const prisma = new PrismaClient();

// Rate limiting function
async function checkRateLimit(ip: string): Promise<boolean> {
  // Skip rate limiting if not in production or KV is not configured
  if (process.env.NODE_ENV !== 'production' || !process.env.KV_URL) {
    return true;
  }

  try {
    const key = `ratelimit:booking:${ip}`;
    const count = await kv.incr(key);

    // Set expiration if this is the first request
    if (count === 1) {
      await kv.expire(key, 60 * 60 * 24); // 24 hours
    }

    // Limit to 3 booking requests per day
    return count <= 3;
  } catch (error) {
    console.error('Rate limiting error:', error);
    return true; // Allow request if rate limiting fails
  }
}

export async function POST(req: NextRequest) {
  // Get client IP for rate limiting
  const ip = req.headers.get('x-forwarded-for') || 'unknown';

  // Check rate limit
  const isAllowed = await checkRateLimit(ip);
  if (!isAllowed) {
    return NextResponse.json(
      { error: "Too many booking requests. Please try again tomorrow." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();

    // Validate request data
    const validatedData = bookingSchema.parse(body);

    // Create record in database
    const appointment = await prisma.appointment.create({
      data: {
        clientName: validatedData.clientName,
        clientEmail: validatedData.clientEmail,
        date: new Date(`${validatedData.date.toDateString()} ${validatedData.time}`),
        duration: validatedData.duration,
        notes: validatedData.designDescription,
        status: "REQUESTED"
      },
    });

    // Here you would typically send a notification email to the studio owner
    // And a confirmation email to the client
    // Example with Resend, commented out as it requires additional setup
    /*
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);

      // Notification to studio
      await resend.emails.send({
        from: "Tattoo Studio <notifications@tattoo-studio.com>",
        to: ["studio@tattoo-studio.com"],
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
      });

      // Confirmation to client
      await resend.emails.send({
        from: "Tattoo Studio <bookings@tattoo-studio.com>",
        to: [validatedData.clientEmail],
        subject: "Your Tattoo Studio Appointment Request",
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
      });
    }
    */

    return NextResponse.json({
      success: true,
      data: {
        id: appointment.id,
        date: appointment.date,
        status: appointment.status
      }
    });

  } catch (error: any) {
    console.error("Booking request error:", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid booking data", details: error.format() },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to process booking request" },
      { status: 500 }
    );
  }
}
