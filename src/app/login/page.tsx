import { Metadata } from 'next'
import Image from 'next/image'
import { LoginForm } from '@/components/forms/login-form'

export const metadata: Metadata = {
  title: 'Login | Tattoo Studio Admin',
  description: 'Admin login portal for Tattoo Studio',
}

export default function LoginPage() {
  // No auth check for now since we're only handling marketing pages

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/* Image section - hidden on mobile */}
      <div className='hidden lg:block relative bg-muted'>
        <Image
          src='/images/login-bg.jpg'
          alt='Tattoo artist at work'
          fill
          className='object-cover'
          priority
        />
        <div className='absolute inset-0 bg-black/40 flex flex-col items-start justify-end p-12'>
          <h1 className='text-white text-4xl font-bold mb-4'>Tattoo Studio</h1>
          <p className='text-white/80 max-w-md text-lg'>
            Admin portal for managing appointments, submissions, and content.
          </p>
        </div>
      </div>

      {/* Login form section */}
      <div className='flex items-center justify-center p-6'>
        <div className='w-full max-w-md space-y-8'>
          <div className='text-center mb-8'>
            <h2 className='text-2xl font-bold'>Admin Login</h2>
            <p className='text-muted-foreground mt-2'>
              Enter your credentials to access the dashboard
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  )
}
