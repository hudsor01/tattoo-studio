'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { X, Menu } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    }

    window.addEventListener('scroll', handleScroll)
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-tattoo-black shadow-lg py-2'
          : 'bg-gradient-to-b from-tattoo-black/90 to-transparent py-4'
      )}
    >
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <Link href='/' className='font-script text-3xl text-tattoo-white hover:text-tattoo-red transition-colors text-shadow-bold' onClick={(e) => {
              // Stop propagation to prevent any parent handlers from triggering
              e.stopPropagation();
            }}>
              Ink 37
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-6'>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'text-tattoo-white hover:text-tattoo-red transition-colors text-sm font-medium',
                  pathname === link.href && 'text-tattoo-red'
                )}
              >
                {link.label}
              </a>
            ))}
            <Button
              className={cn(
                'bg-tattoo-red text-tattoo-white hover:bg-tattoo-red-dark transition-all',
                isScrolled ? 'px-4 py-1.5' : 'px-5 py-2'
              )}
            >
              <a href='/book'>Book Now</a>
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className='md:hidden'>
            <Button
              variant='ghost'
              size='icon'
              className='text-tattoo-white hover:bg-tattoo-white/10'
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className='md:hidden bg-tattoo-black border-t border-white/10'
          >
            <div className='container mx-auto px-4 py-4 flex flex-col space-y-4'>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-tattoo-white hover:text-tattoo-red transition-colors py-2 text-lg',
                    pathname === link.href && 'text-tattoo-red'
                  )}
                >
                  {link.label}
                </a>
              ))}
              <Button className='bg-tattoo-red text-tattoo-white hover:bg-tattoo-red-dark w-full mt-2'>
                <a href='/book'>Book Now</a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
