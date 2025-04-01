import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { contactSchema } from "@/lib/validators/contact";
import { createClient } from "@vercel/kv";
import { Resend } from 'resend';

const prisma = new PrismaClient();

// Rate limiting function
async function checkRateLimit(ip: string): Promise<boolean> {
  // Skip rate limiting if not in production or KV is not configured
  if (process.env.NODE_ENV !== 'production' || !process.env.KV_URL) {
    return true;
  }

  try {
    const kv = createClient({
      url: process.env.KV_URL!,
      token: process.env.KV_TOKEN!
    });
    const key = `ratelimit:contact:${ip}`;
    const count = await kv.incr(key);

    // Set expiration if this is the first request
    if (count === 1) {
      await kv.expire(key, 60 * 60); // 1 hour
    }

    // Limit to 5 submissions per hour
    return count <= 5;
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
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();

    // Validate request data
    const validatedData = contactSchema.parse(body);

    // Create record in database
    const submission = await prisma.contactSubmission.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        message: validatedData.message,
        files: validatedData.files || [],
        status: "PENDING"
      },
    });

    // Send notification email to Fernando using Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        // Format files list if any
        const filesInfo = validatedData.files && validatedData.files.length > 0 
          ? `\nUploaded Files:\n${validatedData.files.map(file => `- ${file}`).join('\n')}`
          : '\nNo files uploaded';
        
        await resend.emails.send({
          from: "Tattoo Studio <notifications@inkstudio.com>",
          to: ["fernando@inkstudio.com"],
          subject: `New Contact Form Submission from ${validatedData.name}`,
          text: `
New contact form submission details:

Name: ${validatedData.name}
Email: ${validatedData.email}
Phone: ${validatedData.phone || 'Not provided'}
Message:
${validatedData.message}
${filesInfo}

You can view this submission in the admin dashboard.
          `,
        });
        
        console.log('Notification email sent to Fernando');
      } catch (emailError) {
        console.error('Failed to send notification email:', emailError);
        // Continue with the response even if email fails
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        id: submission.id,
        createdAt: submission.createdAt
      }
    });

  } catch (error: any) {
    console.error("Contact submission error:", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid form data", details: error.format() },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}
