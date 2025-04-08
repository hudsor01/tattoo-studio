import React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import axios from 'axios'

interface AppointmentFormProps {
  appointment?: {
    id: string
    customerName: string
    date: string
    time: string
    service: string
    status: string
  }
  onClose: () => void
  onAppointmentUpdated: () => void
}

export function AppointmentForm({
  appointment,
  onClose,
  onAppointmentUpdated,
}: AppointmentFormProps) {
  const [customerName, setCustomerName] = useState(appointment?.customerName || '')
  const [date, setDate] = useState(appointment?.date || '')
  const [time, setTime] = useState(appointment?.time || '')
  const [service, setService] = useState(appointment?.service || '')
  const [status, setStatus] = useState(appointment?.status || 'Scheduled')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (appointment) {
        await axios.put(`/api/admin/appointments/${appointment.id}`, {
          customerName,
          date,
          time,
          service,
          status,
        })
      } else {
        await axios.post('/api/admin/appointments', { customerName, date, time, service, status })
      }
      onAppointmentUpdated()
      onClose()
    } catch (error) {
      console.error('Failed to save appointment:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-4'>
        <label className='block text-sm font-medium'>Customer Name</label>
        <input
          type='text'
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className='w-full border border-gray-300 rounded p-2'
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-medium'>Date</label>
        <input
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className='w-full border border-gray-300 rounded p-2'
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-medium'>Time</label>
        <input
          type='time'
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className='w-full border border-gray-300 rounded p-2'
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-medium'>Service</label>
        <input
          type='text'
          value={service}
          onChange={(e) => setService(e.target.value)}
          className='w-full border border-gray-300 rounded p-2'
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-medium'>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className='w-full border border-gray-300 rounded p-2'
        >
          <option value='Scheduled'>Scheduled</option>
          <option value='Completed'>Completed</option>
          <option value='Cancelled'>Cancelled</option>
        </select>
      </div>
      <div className='flex justify-end'>
        <Button type='submit'>{appointment ? 'Update' : 'Add'} Appointment</Button>
      </div>
    </form>
  )
}
