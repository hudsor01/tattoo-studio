import { BookingFormValues } from '@/lib/validators/booking'

/**
 * Get available time slots from the server based on date
 */
export async function fetchAvailableTimeSlots(date: Date): Promise<string[]> {
  try {
    // In a real app, this would be a fetch call to your API
    const response = await fetch(`/api/availability?date=${date.toISOString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch available time slots')
    }

    const data = await response.json()
    return data.availableSlots
  } catch (error) {
    console.error('Error fetching time slots:', error)
    // Fallback to default slots if API fails
    return getDefaultTimeSlots(date)
  }
}

/**
 * Submit booking request to the server
 */
export async function submitBookingRequest(formData: BookingFormValues) {
  const response = await fetch('/api/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to submit booking')
  }

  return response.json()
}

/**
 * Fallback function to get default time slots if API fails
 */
function getDefaultTimeSlots(date: Date): string[] {
  const isWeekend = date.getDay() === 0 || date.getDay() === 6
  
  const allTimeSlots = [
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', 
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00',
  ]
  
  if (isWeekend) {
    // Weekend has limited slots (12pm-5pm)
    return allTimeSlots.filter(slot => {
      const hour = parseInt(slot.split(':')[0])
      return hour >= 12 && hour < 17
    })
  }
  
  return allTimeSlots
}
