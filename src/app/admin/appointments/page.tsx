'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'
import { Modal } from '@/components/ui/modal'
import { AppointmentForm } from '@/components/ui/appointment-form'
import axios from 'axios'

interface Appointment {
  id: string
  customerName: string
  date: string
  time: string
  service: string
  status: string
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('/api/admin/appointments')
      setAppointments(response.data)
    } catch (error) {
      console.error('Failed to fetch appointments:', error)
    }
  }

  const handleEdit = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsModalOpen(true)
  }

  const handleDelete = async (appointmentId: string) => {
    try {
      await axios.delete(`/api/admin/appointments/${appointmentId}`)
      setAppointments(appointments.filter((appt) => appt.id !== appointmentId))
    } catch (error) {
      console.error('Failed to delete appointment:', error)
    }
  }

  const handleModalClose = () => {
    setSelectedAppointment(null)
    setIsModalOpen(false)
  }

  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>Appointments</h1>
        <Button onClick={() => setIsModalOpen(true)}>Add Appointment</Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Service</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.customerName}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td>{appointment.service}</td>
              <td>{appointment.status}</td>
              <td>
                <Button variant='ghost' onClick={() => handleEdit(appointment)}>
                  Edit
                </Button>
                <Button variant='destructive' onClick={() => handleDelete(appointment.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {isModalOpen && (
        <Modal onClose={handleModalClose}>
          <AppointmentForm
            appointment={selectedAppointment || undefined}
            onClose={handleModalClose}
            onAppointmentUpdated={fetchAppointments}
          />
        </Modal>
      )}
    </div>
  )
}
