import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { BookingForm } from '@/components/booking/booking-form'
import { Button } from '@/components/ui/button'
import { Clock, Shield, CreditCard, Info } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Book an Appointment | Tattoo Studio',
  description: 'Schedule your tattoo appointment with our talented artists.',
}

export default function BookingPage() {
  return (
    <main className='bg-tattoo-black min-h-screen'>
      {/* Header Banner */}
      <div className='relative h-[40vh] overflow-hidden'>
        <Image
          src='/5082639F-3D97-45F8-8BFE-D28EBEE539DF.jpg'
          alt='Tattoo artist at work'
          fill
          className='object-cover'
          priority
        />
        <div className='absolute inset-0 bg-gradient-to-b from-tattoo-black/80 to-tattoo-black/40'></div>
        <div className='absolute inset-0 flex flex-col items-center justify-center text-center px-4'>
          <h1 className='tattoo-heading text-shadow-bold mb-4'>
            Book Your <span className='text-tattoo-red'>Appointment</span>
          </h1>
          <p className='tattoo-paragraph max-w-2xl'>
            Reserve your session with Fernando Govea
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className='container max-w-6xl mx-auto py-12 px-4 md:px-6'>
        <div className='grid md:grid-cols-3 gap-8 items-start'>
          <div className='md:col-span-2'>
            <BookingForm />
          </div>

          <div className='space-y-8'>
            {/* Information Card */}
            <div className='bg-tattoo-black/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-white/10 hover:border-tattoo-red transition-all'>
              <h2 className='text-2xl font-extrabold mb-6 text-tattoo-white'>
                Before Your <span className='text-tattoo-red-light relative'>
                  Appointment
                  <span className='absolute -bottom-1 left-0 right-0 h-0.5 bg-tattoo-red-light/60'></span>
                </span>
              </h2>

              <div className='space-y-6'>
                <div className='flex gap-4'>
                  <div className='shrink-0 w-10 h-10 rounded-full bg-tattoo-red/20 flex items-center justify-center'>
                    <Shield className='w-5 h-5 text-tattoo-red' />
                  </div>
                  <div>
                    <h3 className='font-medium text-tattoo-white'>Know Before You Go</h3>
                    <ul className='text-sm text-tattoo-white/70 mt-2 space-y-1 list-disc pl-4'>
                      <li>Bring a valid ID - you must be 18+ to get tattooed</li>
                      <li>Eat a full meal before your appointment</li>
                      <li>Stay hydrated (but limit caffeine and alcohol)</li>
                      <li>Wear comfortable clothing that allows access to the tattoo area</li>
                    </ul>
                  </div>
                </div>

                <div className='flex gap-4'>
                  <div className='shrink-0 w-10 h-10 rounded-full bg-tattoo-red-light/20 flex items-center justify-center'>
                    <CreditCard className='w-5 h-5 text-tattoo-red-light' />
                  </div>
                  <div>
                    <h3 className='font-medium text-tattoo-white'>Deposits & Payment</h3>
                    <p className='text-sm text-tattoo-white/70 mt-2'>
                      A non-refundable deposit is required to secure your appointment. This deposit
                      will be applied to your final tattoo cost. We accept cash, credit cards, and
                      mobile payments.
                    </p>
                  </div>
                </div>

                <div className='flex gap-4'>
                  <div className='shrink-0 w-10 h-10 rounded-full bg-tattoo-red/20 flex items-center justify-center'>
                    <Clock className='w-5 h-5 text-tattoo-red' />
                  </div>
                  <div>
                    <h3 className='font-medium text-tattoo-white'>Cancellation Policy</h3>
                    <p className='text-sm text-tattoo-white/70 mt-2'>
                      At least 48 hours notice is required for cancellations or rescheduling.
                      Deposits are non-refundable for cancellations with less than 48 hours notice.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Artist Card */}
            <div className='bg-gradient-to-b from-tattoo-red to-tattoo-red-dark p-6 rounded-lg shadow-lg'>
              <h2 className='text-2xl font-extrabold mb-4 text-tattoo-white'>
                Featured <span className='text-black relative'>
                  Artist
                  <span className='absolute -bottom-1 left-0 right-0 h-0.5 bg-black/60'></span>
                </span>
              </h2>

              <div className='aspect-square relative mb-4 rounded-lg overflow-hidden'>
                <Image
                  src='/fernando-card.jpg'
                  alt='Fernando - Tattoo Artist'
                  fill
                  className='object-cover'
                />
              </div>

              <h3 className='text-lg font-bold text-tattoo-white'>Fernando Govea</h3>
              <p className='text-tattoo-white/80 text-sm mb-4'>
                Specializing in black & grey realism, traditional, and Japanese styles.
              </p>

              <Button
                className='w-full bg-tattoo-black text-tattoo-white hover:bg-opacity-90'
                asChild
              >
                <Link href='/about'>View About Fernando</Link>
              </Button>
            </div>

            {/* Need Help Card */}
            <div className='bg-gradient-to-b from-black to-tattoo-black/90 p-6 rounded-lg shadow-lg border border-white/10'>
              <div className='flex gap-4 items-start'>
                <div className='shrink-0 w-10 h-10 rounded-full bg-tattoo-white/20 flex items-center justify-center'>
                  <Info className='w-5 h-5 text-tattoo-white' />
                </div>
                <div>
                  <h3 className='font-bold text-tattoo-white text-xl mb-2'>Need Assistance?</h3>
                  <p className='text-tattoo-white/80 mt-2 mb-4'>
                    If you have any questions or need help booking your appointment, please contact
                    us directly.
                  </p>
                  <div className='text-sm text-tattoo-white/90'>
                    <p>
                      <span className='font-medium'>Email:</span> fennyg83@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
