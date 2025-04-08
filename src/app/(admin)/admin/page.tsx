'use client';

import React from 'react';
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Users,
  Calendar,
  CreditCard,
  Inbox,
  Clock,
  Calendar as CalendarIcon,
  DollarSign,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

// Placeholder data - would come from API in production
const revenueData = [
  { month: 'Jan', revenue: 3200 },
  { month: 'Feb', revenue: 3800 },
  { month: 'Mar', revenue: 4200 },
  { month: 'Apr', revenue: 4900 },
  { month: 'May', revenue: 5700 },
  { month: 'Jun', revenue: 5200 },
]

const bookingsData = [
  { month: 'Jan', bookings: 15 },
  { month: 'Feb', bookings: 18 },
  { month: 'Mar', bookings: 20 },
  { month: 'Apr', bookings: 22 },
  { month: 'May', bookings: 26 },
  { month: 'Jun', bookings: 24 },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalClients: 0,
    pendingAppointments: 0,
    monthlyRevenue: 0,
    unreadSubmissions: 0,
  })

  // Simulate fetching data from API
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchDashboardData = async () => {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 500))

      setStats({
        totalClients: 189,
        pendingAppointments: 12,
        monthlyRevenue: 14750,
        unreadSubmissions: 5,
      })
    }

    fetchDashboardData()
  }, [])

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
        <p className='text-muted-foreground'>
          Welcome back, Fernando. Here is an overview of your business.
        </p>
      </div>

      {/* Stats cards */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Clients</CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.totalClients}</div>
            <p className='text-xs text-muted-foreground'>+12 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Pending Appointments</CardTitle>
            <Calendar className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.pendingAppointments}</div>
            <p className='text-xs text-muted-foreground'>Next: Today at 2:00 PM</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Monthly Revenue</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>${stats.monthlyRevenue.toLocaleString()}</div>
            <p className='text-xs text-muted-foreground'>+18% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Unread Submissions</CardTitle>
            <Inbox className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.unreadSubmissions}</div>
            <Button variant='link' className='px-0 text-xs text-primary' asChild>
              <a href='/admin/submissions'>View all</a>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
            <CardDescription>Your monthly revenue for the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={revenueData}>
                <XAxis dataKey='month' />
                <YAxis tickFormatter={(value) => `$${value}`} width={80} />
                <Tooltip
                  formatter={(value) => [`$${value}`, 'Revenue']}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Bar dataKey='revenue' fill='#22c55e' radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bookings</CardTitle>
            <CardDescription>Number of bookings per month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={bookingsData}>
                <XAxis dataKey='month' />
                <YAxis width={30} />
                <Tooltip />
                <Bar dataKey='bookings' fill='#3b82f6' radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>The latest actions from your business</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div className='flex items-start gap-4 border-b pb-4'>
              <div className='rounded-full p-2 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200'>
                <CalendarIcon className='h-4 w-4' />
              </div>
              <div className='space-y-1'>
                <p className='text-sm font-medium'>New appointment booked</p>
                <p className='text-sm text-muted-foreground'>
                  Sarah Johnson booked a full sleeve consultation for May 15, 2025
                </p>
              </div>
              <div className='ml-auto text-sm text-muted-foreground'>
                <Clock className='h-3 w-3 inline mr-1' /> 2h ago
              </div>
            </div>

            <div className='flex items-start gap-4 border-b pb-4'>
              <div className='rounded-full p-2 bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200'>
                <CreditCard className='h-4 w-4' />
              </div>
              <div className='space-y-1'>
                <p className='text-sm font-medium'>Payment received</p>
                <p className='text-sm text-muted-foreground'>
                  $240 deposit from Michael Chen for back piece
                </p>
              </div>
              <div className='ml-auto text-sm text-muted-foreground'>
                <Clock className='h-3 w-3 inline mr-1' /> 6h ago
              </div>
            </div>

            <div className='flex items-start gap-4 border-b pb-4'>
              <div className='rounded-full p-2 bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-200'>
                <Inbox className='h-4 w-4' />
              </div>
              <div className='space-y-1'>
                <p className='text-sm font-medium'>New contact form submission</p>
                <p className='text-sm text-muted-foreground'>
                  Taylor Rodriguez submitted a question about cover-up work
                </p>
              </div>
              <div className='ml-auto text-sm text-muted-foreground'>
                <Clock className='h-3 w-3 inline mr-1' /> 12h ago
              </div>
            </div>

            <div className='flex items-start gap-4'>
              <div className='rounded-full p-2 bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-200'>
                <Users className='h-4 w-4' />
              </div>
              <div className='space-y-1'>
                <p className='text-sm font-medium'>New client added</p>
                <p className='text-sm text-muted-foreground'>
                  Jordan Williams was added to your client database
                </p>
              </div>
              <div className='ml-auto text-sm text-muted-foreground'>
                <Clock className='h-3 w-3 inline mr-1' /> 1d ago
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
