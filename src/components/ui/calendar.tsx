'use client'

import React, { forwardRef } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { cn } from '@/lib/utils'

interface CalendarProps {
  value?: /* eslint-disable-next-line @typescript-eslint/no-unused-vars */ Date
  onChange: (date: Date | null) => void
  className?: string
  placeholder?: string
  disabled?: boolean
  minDate?: Date
  maxDate?: Date
}

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  ({ value, onChange, className, placeholder = 'Select date', disabled, minDate, maxDate }, ref) => {
    return (
      <div ref={ref} className={cn('relative', className)}>
        <DatePicker
          selected={value}
          onChange={onChange}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholderText={placeholder}
          disabled={disabled}
          minDate={minDate}
          maxDate={maxDate}
          dateFormat="MMMM d, yyyy"
          showPopperArrow={false}
          // Add tattoo-studio theme customizations
          calendarClassName="bg-tattoo-gray border border-tattoo-white/10 rounded-md shadow-lg"
          dayClassName={/* eslint-disable-next-line @typescript-eslint/no-unused-vars */ (_date) => "hover:bg-tattoo-red/20 rounded-full"}
          popperClassName="z-50"
        />
      </div>
    )
  }
)

Calendar.displayName = 'Calendar'
