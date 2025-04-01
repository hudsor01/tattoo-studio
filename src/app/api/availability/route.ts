import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { TIME_SLOTS } from '@/lib/constants/booking-constants'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const dateParam = searchParams.get('date')

    if (!dateParam) {
      return NextResponse.json(
        { message: 'Date parameter is required' },
        { status: 400 }
      )
    }

    const date = new Date(dateParam)

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return NextResponse.json(
        { message: 'Invalid date format' },
        { status: 400 }
      )
    }

    // Get all bookings for the selected date
    const bookings = await prisma.appointment.findMany({
      where: {
        date: {
          // Match the date regardless of time
          gte: new Date(date.setHours(0, 0, 0, 0)),
          lt: new Date(date.setHours(23, 59, 59, 999)),
        },
        // Only consider confirmed or pending bookings
        status: {
          in: ['CONFIRMED', 'PENDING'],
        },
      },
    })

    // Determine which time slots are already booked
    const bookedSlots = new Set<string>()

    bookings.forEach(booking => {
      // Use the correct field names from your schema
      const startTime = booking.time // If this doesn't exist, you need to update your schema
      const durationInMinutes = booking.duration

      // Calculate how many 30-minute slots this booking takes
      const slotsOccupied = Math.ceil(durationInMinutes / 30)

      // Find the index of the start time
      const startIndex = TIME_SLOTS.indexOf(startTime)

      // Mark all slots occupied by this booking
      for (let i = 0; i < slotsOccupied && startIndex + i < TIME_SLOTS.length; i++) {
        bookedSlots.add(TIME_SLOTS[startIndex + i])
      }
    })

    // Filter out booked slots
    const availableSlots = TIME_SLOTS.filter(slot => !bookedSlots.has(slot))

    // Apply weekend restrictions if needed
    const isWeekend = date.getDay() === 0 || date.getDay() === 6

    let finalAvailableSlots = availableSlots

    if (isWeekend) {
      // Weekend has limited slots (12pm-5pm)
      finalAvailableSlots = availableSlots.filter(slot => {
        const hour = parseInt(slot.split(':')[0])
        return hour >= 12 && hour < 17
      })
    }

    return NextResponse.json({ availableSlots: finalAvailableSlots })
  } catch (error) {
    console.error('Error fetching availability:', error)
    return NextResponse.json(
      { message: 'Failed to fetch availability' },
      { status: 500 }
    )
  }
}
