'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ModeToggle } from '@/components/theme/mode-toggle'
import { Users, Calendar, CreditCard, Inbox, BarChart3, LogOut, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify', { credentials: 'include' })
        if (response.ok) {
          setIsAuthenticated(true)
        } else {
          router.push('/login')
        }
      } catch (error) {
        console.error('Authentication verification failed:', error)
        router.push('/login')
      }
    }

    verifyAuth()
  }, [router])

  if (!isAuthenticated) {
    return null // Show nothing until authentication is verified
  }

  const navItems = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: <BarChart3 className='h-5 w-5' />,
    },
    {
      name: 'Users',
      href: '/admin/users',
      icon: <Users className='h-5 w-5' />,
    },
    {
      name: 'Appointments',
      href: '/admin/appointments',
      icon: <Calendar className='h-5 w-5' />,
    },
    {
      name: 'Transactions',
      href: '/admin/transactions',
      icon: <CreditCard className='h-5 w-5' />,
    },
    {
      name: 'Submissions',
      href: '/admin/submissions',
      icon: <Inbox className='h-5 w-5' />,
    },
  ]

  return (
    <div className='flex min-h-screen bg-background'>
      {/* Mobile menu button */}
      <div className='fixed top-4 left-4 z-50 md:hidden'>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
        </Button>
      </div>

      {/* Sidebar navigation */}
      <aside
        className={cn(
          'bg-muted w-64 border-r fixed inset-y-0 z-40 transition-transform duration-300 ease-in-out',
          isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <div className='flex flex-col h-full'>
          <div className='px-4 py-6 border-b'>
            <h1 className='text-2xl font-bold'>Admin Panel</h1>
            <p className='text-sm text-muted-foreground'>Fernando Govea Tattoo Studio</p>
          </div>

          <nav className='flex-1 overflow-auto py-6 px-4'>
            <ul className='space-y-2'>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
                      pathname === item.href
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className='p-4 border-t mt-auto'>
            <Button
              variant='ghost'
              className='w-full justify-start'
              onClick={() => router.push('/login')}
            >
              <LogOut className='h-5 w-5 mr-3' />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className={cn('flex-1 transition-all duration-300 ease-in-out', 'md:ml-64 p-4 md:p-8')}>
        <div className='max-w-7xl mx-auto'>
          <div className='flex justify-between items-center mb-8'>
            <div>{/* Breadcrumb or page title would go here */}</div>
            <ModeToggle />
          </div>

          {/* Page content */}
          {children}
        </div>
      </main>
    </div>
  )
}
