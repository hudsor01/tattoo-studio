'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Users, Calendar, CreditCard, BarChart3 } from 'lucide-react'
// Remove unused imports and add missing ones
import {
  Avatar,
  AvatarImage,
  AvatarFallback
} from '@/components/ui/avatar'
import {
  Badge
} from '@/components/ui/badge'
import {
  Settings,
  BellRing,
  Brush,
  PieChart
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Quick stats for the admin header
  const quickStats = [
    {
      title: 'Total Bookings',
      value: '124',
      change: '+12%',
      trend: 'up',
    },
    {
      title: 'New Inquiries',
      value: '8',
      badge: 'New',
    },
    {
      title: 'Revenue',
      value: '$7,254',
      change: '+5%',
      trend: 'up',
    },
    {
      title: 'Upcoming',
      value: '3',
      badge: 'Today',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Admin dashboard header with quick stats */}
      <div className="flex flex-col gap-4 md:flex-row items-start">
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary">
              <AvatarImage src="/images/IMG_3896.JPG" alt="Fernando Govea" />
              <AvatarFallback>FG</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Welcome, Fernando</h1>
              <p className="text-muted-foreground">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/settings" className="text-muted-foreground hover:text-foreground">
            <Settings className="h-5 w-5" />
          </Link>
          <Link href="/admin/notifications" className="text-muted-foreground hover:text-foreground relative">
            <BellRing className="h-5 w-5" />
            <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center">3</Badge>
          </Link>
        </div>
      </div>

      {/* Quick stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.badge && (
                <Badge variant="default" className="bg-primary">
                  {stat.badge}
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.change && (
                <p className={`text-xs ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change} from last month
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tab navigation for different dashboard sections */}
      <div className="border-b">
        <nav className="flex space-x-4 overflow-x-auto pb-2">
          <Link
            href="/admin/dashboard"
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              pathname === '/admin/dashboard'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
          >
            <BarChart3 className="h-4 w-4 inline-block mr-2" />
            Overview
          </Link>
          <Link
            href="/admin/dashboard/appointments"
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              pathname === '/admin/dashboard/appointments'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
          >
            <Calendar className="h-4 w-4 inline-block mr-2" />
            Appointments
          </Link>
          <Link
            href="/admin/dashboard/clients"
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              pathname === '/admin/dashboard/clients'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
          >
            <Users className="h-4 w-4 inline-block mr-2" />
            Clients
          </Link>
          <Link
            href="/admin/dashboard/finances"
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              pathname === '/admin/dashboard/finances'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
          >
            <CreditCard className="h-4 w-4 inline-block mr-2" />
            Finances
          </Link>
          <Link
            href="/admin/dashboard/portfolio"
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              pathname === '/admin/dashboard/portfolio'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
          >
            <Brush className="h-4 w-4 inline-block mr-2" />
            Portfolio
          </Link>
          <Link
            href="/admin/dashboard/analytics"
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              pathname === '/admin/dashboard/analytics'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
          >
            <PieChart className="h-4 w-4 inline-block mr-2" />
            Analytics
          </Link>
        </nav>
      </div>

      {/* Main content area for dashboard pages */}
      <div className="bg-card rounded-lg border p-6">
        {children}
      </div>
    </div>
  )
}
