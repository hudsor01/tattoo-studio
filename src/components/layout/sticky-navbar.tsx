'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/theme/mode-toggle'

export function StickyNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Check if we're on an admin page
  const isAdminPage = pathname?.startsWith('/admin') ?? false

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    // Run the handler once to set initial state
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Don't show on admin pages
  if (isAdminPage) return null

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-md py-2' : 'bg-transparent py-4'
      )}
    >
      <div className='container mx-auto px-4 flex items-center justify-between'>
        <Link href='/' className='font-bold text-xl'>
          Tattoo Studio
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center space-x-6'>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'transition-colors hover:text-tattoo-red',
                pathname === link.href ? 'text-tattoo-red font-medium' : 'text-foreground'
              )}
            >
              {link.label}
            </a>
          ))}
          <Button className='bg-tattoo-red text-tattoo-white hover:bg-tattoo-red/90 transition-all'>
            <a href='/book'>Book Now</a>
          </Button>
          <ModeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className='md:hidden flex items-center'>
          <ModeToggle />
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='ml-2'
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className='md:hidden bg-background/95 backdrop-blur-sm p-4'>
          <div className='flex flex-col space-y-4'>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-tattoo-red py-2',
                  pathname === link.href ? 'text-tattoo-red font-medium' : 'text-foreground'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button className='bg-tattoo-red text-tattoo-white hover:bg-tattoo-red/90 transition-all w-full mt-2'>
              <a href='/book' onClick={() => setIsMobileMenuOpen(false)}>
                Book Now
              </a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
