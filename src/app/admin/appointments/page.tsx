'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MoreHorizontal,
  Calendar as CalendarIcon,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { format, addDays, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns'

// Define appointment types
type AppointmentStatus = 'confirmed' | 'cancelled' | 'completed' | 'no-show'

interface Appointment {
  id: string
  clientName: string
  clientEmail: string
  date: Date
  startTime: string
  endTime: string
  duration: number
  appointmentType: string
  status: AppointmentStatus
  depositPaid: boolean
  totalAmount?: number
  notes?: string
}

// Mock appointment data
const mockAppointments: Appointment[] = [
  {
    id: '1',
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah.j@example.com',
    date: new Date(2025, 3, 15), // April 15, 2025
    startTime: '10:00 AM',
    endTime: '1:00 PM',
    duration: 180,
    appointmentType: 'Full Sleeve Consultation',
    status: 'confirmed',
    depositPaid: true,
    totalAmount: 150,
    notes: 'First session for sleeve design consultation.'
  },
  {
    id: '2',
    clientName: 'Michael Chen',
    clientEmail: 'mchen@example.com',
    date: new Date(2025, 3, 5), // Current day
    startTime: '2:00 PM',
    endTime: '6:00 PM',
    duration: 240,
    appointmentType: 'Back Piece Session',
    status: 'confirmed',
    depositPaid: true,
    totalAmount: 500,
    notes: 'Second session for Japanese back piece.'
  },
  {
    id: '3',
    clientName: 'Taylor Rodriguez',
    clientEmail: 'taylor.r@example.com',
    date: new Date(2025, 3, 12), // April 12, 2025
    startTime: '11:00 AM',
    endTime: '1:00 PM',
    duration: 120,
    appointmentType: 'Cover-up Consultation',
    status: 'confirmed',
    depositPaid: true,
    totalAmount: 100,
  },
  {
    id: '4',
    clientName: 'Jordan Williams',
    clientEmail: 'jwilliams@example.com',
    date: new Date(2025, 3, 2), // April 2, 2025
    startTime: '3:00 PM',
    endTime: '5:00 PM',
    duration: 120,
    appointmentType: 'Geometric Tattoo',
    status: 'completed',
    depositPaid: true,
    totalAmount: 350,
  },
  {
    id: '5',
    clientName: 'Alex Murphy',
    clientEmail: 'alex.m@example.com',
    date: new Date(2025, 3, 22), // April 22, 2025
    startTime: '1:00 PM',
    endTime: '3:00 PM',
    duration: 120,
    appointmentType: 'Traditional Arm Tattoo',
    status: 'confirmed',
    depositPaid: true,
    totalAmount: 300,
  },
  {
    id: '6',
    clientName: 'Jamie Lee',
    clientEmail: 'jamie@example.com',
    date: new Date(2025, 2, 30), // March 30, 2025
    startTime: '11:00 AM',
    endTime: '3:00 PM',
    duration: 240,
    appointmentType: 'Portrait Session',
    status: 'completed',
    depositPaid: true,
    totalAmount: 600,
  },
  {
    id: '7',
    clientName: 'Casey Morgan',
    clientEmail: 'casey.m@example.com',
    date: new Date(2025, 3, 8), // April 8, 2025
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    duration: 60,
    appointmentType: 'Consultation',
    status: 'cancelled',
    depositPaid: false,
    notes: 'Client cancelled due to illness. Rescheduling for next month.'
  },
  {
    id: '8',
    clientName: 'Dana Rivera',
    clientEmail: 'dana.r@example.com',
    date: new Date(2025, 3, 10), // April 10, 2025
    startTime: '2:00 PM',
    endTime: '5:00 PM',
    duration: 180,
    appointmentType: 'Leg Sleeve Session',
    status: 'confirmed',
    depositPaid: true,
    totalAmount: 450,
  },
  {
    id: '9',
    clientName: 'Riley Foster',
    clientEmail: 'riley.f@example.com',
    date: new Date(2025, 3, 18), // April 18, 2025
    startTime: '10:00 AM',
    endTime: '11:30 AM',
    duration: 90,
    appointmentType: 'Small Piece',
    status: 'confirmed',
    depositPaid: true,
    totalAmount: 200,
  },
  {
    id: '10',
    clientName: 'Quinn Johnson',
    clientEmail: 'quinn.j@example.com',
    date: new Date(2025, 3, 28), // April 28, 2025
    startTime: '3:00 PM',
    endTime: '5:00 PM',
    duration: 120,
    appointmentType: 'Flash Tattoo',
    status: 'confirmed',
    depositPaid: true,
    totalAmount: 250,
  }
];

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedTab, setSelectedTab] = useState<string>("calendar")
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'all'>('all')

  // Get appointments for the selected date
  const appointmentsForSelectedDate = mockAppointments.filter(
    appointment => isSameDay(appointment.date, selectedDate)
  ).sort((a, b) => {
    // Sort by start time (convert to 24h format for comparison)
    const aTime = a.startTime.includes('PM') && !a.startTime.includes('12:')
      ? parseInt(a.startTime.split(':')[0]) + 12 + a.startTime.split(':')[1].slice(0, 2)
      : a.startTime;
    const bTime = b.startTime.includes('PM') && !b.startTime.includes('12:')
      ? parseInt(b.startTime.split(':')[0]) + 12 + b.startTime.split(':')[1].slice(0, 2)
      : b.startTime;
    return aTime.localeCompare(bTime);
  });

  // Get all appointments filtered by status
  const filteredAppointments = statusFilter === 'all'
    ? mockAppointments
    : mockAppointments.filter(app => app.status === statusFilter);

  // Create array of dates that have appointments
  const daysWithAppointments = mockAppointments.map(appointment => appointment.date);

  // Calculate schedule availability
  const currentMonthDays = eachDayOfInterval({
    start: startOfMonth(selectedDate),
    end: endOfMonth(selectedDate)
  });

  // Appointment status badge renderer
  const renderStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-500 hover:bg-green-600">Confirmed</Badge>;
      case 'cancelled':
        return <Badge variant="secondary" className="bg-red-500 hover:bg-red-600">Cancelled</Badge>;
      case 'completed':
        return <Badge variant="outline" className="border-green-500 text-green-600">Completed</Badge>;
      case 'no-show':
        return <Badge variant="destructive">No Show</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
        <p className="text-muted-foreground">
          Manage all your appointments and schedules in one place.
        </p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Add Appointment
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className={statusFilter === 'all' ? 'bg-accent' : ''} onClick={() => setStatusFilter('all')}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem className={statusFilter === 'confirmed' ? 'bg-accent' : ''} onClick={() => setStatusFilter('confirmed')}>
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Confirmed
                </DropdownMenuItem>
                <DropdownMenuItem className={statusFilter === 'completed' ? 'bg-accent' : ''} onClick={() => setStatusFilter('completed')}>
                  <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                  Completed
                </DropdownMenuItem>
                <DropdownMenuItem className={statusFilter === 'cancelled' ? 'bg-accent' : ''} onClick={() => setStatusFilter('cancelled')}>
                  <XCircle className="mr-2 h-4 w-4 text-red-500" />
                  Cancelled
                </DropdownMenuItem>
                <DropdownMenuItem className={statusFilter === 'no-show' ? 'bg-accent' : ''} onClick={() => setStatusFilter('no-show')}>
                  <AlertCircle className="mr-2 h-4 w-4 text-amber-500" />
                  No Show
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>
                  Select a date to view appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => setSelectedDate(date || new Date())}
                  className="rounded-md border"
                  modifiers={{
                    withAppointments: (date) =>
                      daysWithAppointments.some(appDate => isSameDay(date, appDate))
                  }}
                  modifiersStyles={{
                    withAppointments: {
                      fontWeight: "bold",
                      border: "1px solid currentColor",
                      backgroundColor: "rgba(59, 130, 246, 0.1)"
                    }
                  }}
                  components={{
                    DayContent: (props) => (
                      <div className="relative">
                        {props.date.getDate()}
                        {daysWithAppointments.some(date => isSameDay(date, props.date)) && (
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-primary"></div>
                        )}
                      </div>
                    )
                  }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>
                    Appointments for {format(selectedDate, 'MMMM d, yyyy')}
                  </CardTitle>
                  <CardDescription>
                    {appointmentsForSelectedDate.length === 0
                      ? "No appointments scheduled"
                      : `${appointmentsForSelectedDate.length} appointment(s) for this day`}
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => setSelectedDate(addDays(selectedDate, -1))}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setSelectedDate(addDays(selectedDate, 1))}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {appointmentsForSelectedDate.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <CalendarIcon className="h-10 w-10 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No appointments scheduled for this day</p>
                    <Button variant="link" size="sm" className="mt-2">
                      + Add appointment
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appointmentsForSelectedDate.map((appointment) => (
                      <div
                        key={appointment.id}
                        className={cn(
                          "p-4 rounded-lg border",
                          appointment.status === 'cancelled' && "border-red-200 bg-red-50 dark:bg-red-900/10",
                          appointment.status === 'completed' && "border-green-200 bg-green-50 dark:bg-green-900/10"
                        )}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="font-medium">
                              {appointment.startTime} - {appointment.endTime}
                            </span>
                          </div>
                          {renderStatusBadge(appointment.status)}
                        </div>
                        <div className="space-y-1">
                          <p className="font-semibold">{appointment.clientName}</p>
                          <p className="text-sm text-muted-foreground">{appointment.appointmentType}</p>
                          <div className="mt-2 flex justify-between items-center">
                            <span className="text-sm">
                              {appointment.depositPaid
                                ? <span className="text-green-600">Deposit paid</span>
                                : <span className="text-amber-600">No deposit</span>}
                              {appointment.totalAmount && ` • $${appointment.totalAmount}`}
                            </span>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Appointment</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
                                <DropdownMenuItem>Cancel Appointment</DropdownMenuItem>
                                <DropdownMenuItem>Mark as No-Show</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>All Appointments</CardTitle>
              <CardDescription>
                {filteredAppointments.length} total appointments {statusFilter !== 'all' && `(filtered by ${statusFilter})`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>
                        <div className="font-medium">
                          {format(appointment.date, 'MMM d, yyyy')}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {appointment.startTime} - {appointment.endTime}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>{appointment.clientName}</div>
                        <div className="text-sm text-muted-foreground">{appointment.clientEmail}</div>
                      </TableCell>
                      <TableCell>{appointment.appointmentType}</TableCell>
                      <TableCell>{appointment.duration} min</TableCell>
                      <TableCell>{renderStatusBadge(appointment.status)}</TableCell>
                      <TableCell>
                        {appointment.depositPaid ? (
                          <span className="inline-flex items-center text-green-600">
                            <CheckCircle className="mr-1 h-3 w-3" /> Deposit paid
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-amber-600">
                            <AlertCircle className="mr-1 h-3 w-3" /> No deposit
                          </span>
                        )}
                        {appointment.totalAmount && (
                          <div className="text-sm text-muted-foreground">
                            ${appointment.totalAmount}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Appointment</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
                            <DropdownMenuItem>Cancel Appointment</DropdownMenuItem>
                            <DropdownMenuItem>Mark as No-Show</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
