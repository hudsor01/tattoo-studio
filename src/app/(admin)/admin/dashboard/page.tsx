'use client';

import React, { useState } from 'react'
import Link from 'next/link'
import {
  CalendarIcon,
  Users2Icon,
  BarChart3Icon,
  DollarSignIcon,
  TrendingUpIcon,
  ArrowUpRightIcon,
  ArrowDownRightIcon
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Mock data for dashboard
const stats = [
  {
    name: 'Total Revenue',
    value: '$24,256',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSignIcon,
    color: 'bg-green-500/20',
    textColor: 'text-green-500',
  },
  {
    name: 'Appointments',
    value: '156',
    change: '+8.2%',
    trend: 'up',
    icon: CalendarIcon,
    color: 'bg-blue-500/20',
    textColor: 'text-blue-500',
  },
  {
    name: 'New Clients',
    value: '28',
    change: '+14.6%',
    trend: 'up',
    icon: Users2Icon,
    color: 'bg-purple-500/20',
    textColor: 'text-purple-500',
  },
  {
    name: 'Cancellations',
    value: '7',
    change: '-3.2%',
    trend: 'down',
    icon: BarChart3Icon,
    color: 'bg-yellow-500/20',
    textColor: 'text-yellow-500',
  }
]

const recentAppointments = [
  {
    id: 'apt1',
    client: 'Sarah Johnson',
    service: 'Full Sleeve Consultation',
    artist: 'Miguel Rivera',
    date: 'Apr 7, 2025',
    time: '10:00 AM',
    status: 'confirmed'
  },
  {
    id: 'apt2',
    client: 'James Wilson',
    service: 'Traditional Chest Piece',
    artist: 'Emma Chen',
    date: 'Apr 7, 2025',
    time: '2:30 PM',
    status: 'confirmed'
  },
  {
    id: 'apt3',
    client: 'Olivia Martinez',
    service: 'Geometric Back Design',
    artist: 'Miguel Rivera',
    date: 'Apr 8, 2025',
    time: '11:15 AM',
    status: 'pending'
  },
  {
    id: 'apt4',
    client: 'Tyler Nguyen',
    service: 'Fine Line Portrait',
    artist: 'Alex Kim',
    date: 'Apr 8, 2025',
    time: '3:00 PM',
    status: 'confirmed'
  },
  {
    id: 'apt5',
    client: 'Emily Rodriguez',
    service: 'Coverup Consultation',
    artist: 'Emma Chen',
    date: 'Apr 9, 2025',
    time: '9:30 AM',
    status: 'pending'
  }
]

const recentTransactions = [
  {
    id: 'txn1',
    client: 'Sarah Johnson',
    amount: '$150.00',
    type: 'deposit',
    date: 'Apr 5, 2025',
    status: 'completed'
  },
  {
    id: 'txn2',
    client: 'Michael Chen',
    amount: '$500.00',
    type: 'payment',
    date: 'Apr 5, 2025',
    status: 'completed'
  },
  {
    id: 'txn3',
    client: 'Taylor Rodriguez',
    amount: '$100.00',
    type: 'deposit',
    date: 'Apr 4, 2025',
    status: 'completed'
  },
  {
    id: 'txn4',
    client: 'Jordan Williams',
    amount: '$350.00',
    type: 'payment',
    date: 'Apr 2, 2025',
    status: 'completed'
  },
  {
    id: 'txn5',
    client: 'Alex Murphy',
    amount: '$50.00',
    type: 'deposit',
    date: 'Apr 3, 2025',
    status: 'completed'
  }
]

export default function DashboardPage() {
  const [tabView, setTabView] = useState('today')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="text-sm text-[#ffffff]/70">
          <span className="font-medium">Today:</span> April 6, 2025
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-[#0a0a0a] border-[#ffffff]/10">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-[#ffffff]/70">{stat.name}</CardTitle>
              <div className={`${stat.color} p-2 rounded-full`}>
                <stat.icon className={`h-4 w-4 ${stat.textColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#ffffff]">{stat.value}</div>
              <div className="flex items-center space-x-1 mt-1">
                {stat.trend === 'up' ? (
                  <ArrowUpRightIcon className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRightIcon className="h-4 w-4 text-red-500" />
                )}
                <p className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                  {stat.change}
                </p>
                <p className="text-[#ffffff]/50 text-sm">vs last month</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Appointments */}
        <Card className="bg-[#0a0a0a] border-[#ffffff]/10">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-[#ffffff]">Recent Appointments</CardTitle>
              <Link href="/admin/appointments">
                <Button variant="outline" size="sm" className="text-[#ffffff] border-[#ffffff]/10 hover:bg-[#ffffff]/5">
                  View All
                </Button>
              </Link>
            </div>
            <CardDescription className="text-[#ffffff]/70">You have {recentAppointments.length} upcoming appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={tabView} onValueChange={setTabView} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-[#ffffff]/5">
                <TabsTrigger value="today" className="data-[state=active]:bg-[#d62828] data-[state=active]:text-[#ffffff]">Today</TabsTrigger>
                <TabsTrigger value="week" className="data-[state=active]:bg-[#d62828] data-[state=active]:text-[#ffffff]">This Week</TabsTrigger>
                <TabsTrigger value="month" className="data-[state=active]:bg-[#d62828] data-[state=active]:text-[#ffffff]">This Month</TabsTrigger>
              </TabsList>
              <TabsContent value="today" className="mt-4">
                <div className="space-y-4">
                  {recentAppointments.slice(0, 2).map((apt) => (
                    <div key={apt.id} className="flex justify-between items-center bg-[#0a0a0a] p-3 border border-[#ffffff]/10 rounded-lg">
                      <div className="flex flex-col">
                        <span className="text-[#ffffff] font-medium">{apt.client}</span>
                        <span className="text-[#ffffff]/70 text-sm">{apt.service}</span>
                        <div className="text-[#ffffff]/50 text-xs mt-1">
                          {apt.time} with {apt.artist}
                        </div>
                      </div>
                      <div>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          apt.status === 'confirmed' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                        }`}>
                          {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="week" className="mt-4">
                <div className="space-y-4">
                  {recentAppointments.map((apt) => (
                    <div key={apt.id} className="flex justify-between items-center bg-[#0a0a0a] p-3 border border-[#ffffff]/10 rounded-lg">
                      <div className="flex flex-col">
                        <span className="text-[#ffffff] font-medium">{apt.client}</span>
                        <span className="text-[#ffffff]/70 text-sm">{apt.service}</span>
                        <div className="text-[#ffffff]/50 text-xs mt-1">
                          {apt.date} at {apt.time} with {apt.artist}
                        </div>
                      </div>
                      <div>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          apt.status === 'confirmed' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                        }`}>
                          {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="month" className="mt-4">
                <div className="text-center py-6 text-[#ffffff]/70">
                  Displaying appointments for the current month will be available soon.
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="border-t border-[#ffffff]/10 px-6 py-4">
            <Link href="/admin/appointments/new" className="w-full">
              <Button
                variant="default"
                className="bg-[#d62828] text-[#ffffff] hover:bg-[#d62828]/90 w-full"
              >
                Schedule New Appointment
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Recent Transactions */}
        <Card className="bg-[#0a0a0a] border-[#ffffff]/10">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-[#ffffff]">Recent Transactions</CardTitle>
              <Link href="/admin/transactions">
                <Button variant="outline" size="sm" className="text-[#ffffff] border-[#ffffff]/10 hover:bg-[#ffffff]/5">
                  View All
                </Button>
              </Link>
            </div>
            <CardDescription className="text-[#ffffff]/70">You have received {recentTransactions.length} payments recently</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((txn) => (
                <div key={txn.id} className="flex justify-between items-center bg-[#0a0a0a] p-3 border border-[#ffffff]/10 rounded-lg">
                  <div className="flex flex-col">
                    <span className="text-[#ffffff] font-medium">{txn.client}</span>
                    <span className={`text-sm ${
                      txn.type === 'deposit' ? 'text-blue-500' :
                      txn.type === 'payment' ? 'text-green-500' :
                      'text-red-500'
                    }`}>
                      {txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}
                    </span>
                    <div className="text-[#ffffff]/50 text-xs mt-1">
                      {txn.date}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[#ffffff] font-medium">{txn.amount}</span>
                    <div className="text-green-500 text-xs">
                      {txn.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t border-[#ffffff]/10 px-6 py-4">
            <Link href="/admin/transactions" className="w-full">
              <Button
                variant="default"
                className="bg-[#d62828] text-[#ffffff] hover:bg-[#d62828]/90 w-full"
              >
                View Transactions Report
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions Card */}
        <Card className="bg-[#0a0a0a] border-[#ffffff]/10">
          <CardHeader>
            <CardTitle className="text-[#ffffff]">Quick Actions</CardTitle>
            <CardDescription className="text-[#ffffff]/70">Common studio management tasks</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button className="bg-[#0a0a0a] border border-[#ffffff]/10 flex flex-col items-center justify-center h-24 hover:bg-[#ffffff]/5">
              <CalendarIcon className="h-8 w-8 mb-2 text-[#ffffff]" />
              <span className="text-sm text-[#ffffff]">New Booking</span>
            </Button>
            <Button className="bg-[#0a0a0a] border border-[#ffffff]/10 flex flex-col items-center justify-center h-24 hover:bg-[#ffffff]/5">
              <Users2Icon className="h-8 w-8 mb-2 text-[#ffffff]" />
              <span className="text-sm text-[#ffffff]">Add Client</span>
            </Button>
            <Button className="bg-[#0a0a0a] border border-[#ffffff]/10 flex flex-col items-center justify-center h-24 hover:bg-[#ffffff]/5">
              <DollarSignIcon className="h-8 w-8 mb-2 text-[#ffffff]" />
              <span className="text-sm text-[#ffffff]">Record Payment</span>
            </Button>
            <Button className="bg-[#0a0a0a] border border-[#ffffff]/10 flex flex-col items-center justify-center h-24 hover:bg-[#ffffff]/5">
              <TrendingUpIcon className="h-8 w-8 mb-2 text-[#ffffff]" />
              <span className="text-sm text-[#ffffff]">View Reports</span>
            </Button>
          </CardContent>
        </Card>

        {/* Submission Requests Card */}
        <Card className="bg-[#0a0a0a] border-[#ffffff]/10 lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-[#ffffff]">Recent Contact Submissions</CardTitle>
              <Link href="/admin/submissions">
                <Button variant="outline" size="sm" className="text-[#ffffff] border-[#ffffff]/10 hover:bg-[#ffffff]/5">
                  View All
                </Button>
              </Link>
            </div>
            <CardDescription className="text-[#ffffff]/70">3 new inquiries to review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-start bg-[#0a0a0a] p-4 border border-[#ffffff]/10 rounded-lg">
                <div className="flex flex-col">
                  <span className="text-[#ffffff] font-medium">Custom Sleeve Design Inquiry</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[#ffffff]/70 text-sm">From:</span>
                    <span className="text-[#ffffff] text-sm">Morgan Campbell</span>
                  </div>
                  <div className="text-[#ffffff]/70 text-sm mt-2 line-clamp-2">
                    I&apos;m interested in getting a full sleeve with a mix of geometric and floral elements. I&apos;d like to schedule a consultation...
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-[#ffffff]/50 text-xs">Apr 5, 2025</span>
                  <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-500">
                    New
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-start bg-[#0a0a0a] p-4 border border-[#ffffff]/10 rounded-lg">
                <div className="flex flex-col">
                  <span className="text-[#ffffff] font-medium">Quote for Small Wrist Tattoo</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[#ffffff]/70 text-sm">From:</span>
                    <span className="text-[#ffffff] text-sm">Jamie Rodriguez</span>
                  </div>
                  <div className="text-[#ffffff]/70 text-sm mt-2 line-clamp-2">
                    I&apos;m looking to get a small tattoo on my wrist, probably around 2 inches. It would be a simple line drawing of a wave...
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-[#ffffff]/50 text-xs">Apr 4, 2025</span>
                  <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-500">
                    New
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-start bg-[#0a0a0a] p-4 border border-[#ffffff]/10 rounded-lg">
                <div className="flex flex-col">
                  <span className="text-[#ffffff] font-medium">Cover-up Work Inquiry</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[#ffffff]/70 text-sm">From:</span>
                    <span className="text-[#ffffff] text-sm">Taylor Washington</span>
                  </div>
                  <div className="text-[#ffffff]/70 text-sm mt-2 line-clamp-2">
                    I have an old tribal tattoo on my shoulder that I&apos;d like to cover with something more meaningful. I was thinking of a nature-inspired design...
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-[#ffffff]/50 text-xs">Apr 3, 2025</span>
                  <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-500">
                    Pending
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
