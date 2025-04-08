'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BookingForm } from '@/components/booking/booking-form';
import { Button } from '@/components/ui/button';
import { Clock, Shield, CreditCard, Info, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { DepositPaymentForm } from '../../components/booking/deposit-payment-form';

// Note: Metadata should be defined in a separate layout.tsx file since this is a Client Component

interface BookingFormValues {
  firstName: string;
  date: string;
  time: string;
  clientName: string;
  email: string;
  phone: string;
  notes: string;
  tattooDepositAmount: string;
  duration: number;
  clientEmail: string;
  clientPhone: string;
  designDescription: string;
  referenceImages: string[];
  tattooType: "NEW_TATTOO" | "TOUCH_UP" | "COVER_UP" | "CONSULTATION";
  bodyPart: string;
}

// Define booking steps
enum BookingStep {
  BOOKING_DETAILS = 0,
  PAYMENT = 1,
  CONFIRMATION = 2
}

export default function BookingPage() {
  const [formKey, setFormKey] = useState(`booking-form-${Date.now()}`);
  const [bookingData, setBookingData] = useState<BookingFormValues | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(BookingStep.BOOKING_DETAILS);

  // Handle payment success
  function handlePaymentSuccess(paymentId: string) {
    setBookingId(paymentId);
    setFormKey(`booking-form-${Date.now()}`);
    setCurrentStep(BookingStep.CONFIRMATION);
  }

  // Reset the entire booking process
  function resetBooking() {
    setBookingData(null);
    setBookingId(null);
    setCurrentStep(BookingStep.BOOKING_DETAILS);
    setFormKey(`booking-form-${Date.now()}`);
  }

  // Handle payment cancel
  function handlePaymentCancel() {
    resetBooking();
  }

  // Show payment form if in PAYMENT step and have booking data
  if (currentStep === BookingStep.PAYMENT && bookingData) {
    return (
      <DepositPaymentForm
        bookingData={{
          clientName: bookingData.clientName || bookingData.firstName || '',
          clientEmail: bookingData.clientEmail || bookingData.email || '',
          clientPhone: bookingData.clientPhone || bookingData.phone || '',
          designDescription: bookingData.designDescription || bookingData.notes || '',
          referenceImages: bookingData.referenceImages || [],
          time: bookingData.time || '',
          duration: bookingData.duration || 0,
          date: new Date(bookingData.date),
          tattooType: bookingData.tattooType || "NEW_TATTOO",
          bodyPart: bookingData.bodyPart || ''
        }}
        onPaymentSuccess={handlePaymentSuccess}
        onCancel={handlePaymentCancel}
      />
    );
  }

  // Show confirmation screen if in CONFIRMATION step
  if (currentStep === BookingStep.CONFIRMATION) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='p-6 bg-tattoo-black/50 backdrop-blur-sm rounded-lg shadow-md border border-white/10 text-center'
      >
        <h2 className='text-2xl font-extrabold mb-4 text-tattoo-red'>
          Confirmed
          <span className='absolute -bottom-1 left-0 right-0 h-0.5 bg-tattoo-red/60'></span>
        </h2>

        <p className='text-tattoo-white/80 mb-2'>
          Thank you for your booking. We&apos;ve sent a confirmation email with all the details.
        </p>

        {bookingId && (
          <p className='text-tattoo-white/90 mb-6'>
            Your booking reference: <span className='font-semibold text-tattoo-red'>{bookingId}</span>
          </p>
        )}

        <Button
          onClick={resetBooking}
          className='bg-tattoo-red hover:bg-tattoo-red-dark text-white'
        >
          Book Another Appointment
        </Button>
      </motion.div>
    );
  }

  // Default: Show booking form
  return (
    <main className='bg-tattoo-black min-h-screen'>
      {/* Hero Section - Side by Side Layout */}
      <section className='relative bg-tattoo-black overflow-hidden'>
        <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[70vh]'>
          {/* Text Content */}
          <div className='flex flex-col justify-center px-6 py-12 lg:py-0 lg:pl-12 lg:pr-0 z-10'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className='tattoo-script text-3xl text-tattoo-red mb-4 text-center lg:text-left'
              >
                Your Ink Journey Begins
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
                className='tattoo-heading text-shadow-bold mb-6 tracking-wider uppercase text-center lg:text-left'
              >
                Book Your{' '}
                <span className='relative inline-block'>
                  Appointment
                  <span className='absolute -bottom-2 left-0 right-0 h-2 bg-tattoo-red'></span>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 100 }}
                className='text-xl md:text-2xl text-tattoo-white/90 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed text-center lg:text-left'
              >
                Reserve your session with Fernando Govea and begin your
                journey toward a custom tattoo that tells your unique story.
              </motion.p>

              <div className='hidden lg:block'>
                <div className='space-y-5 mb-8'>
                  <div className='flex gap-4 items-start'>
                    <div className='shrink-0 w-10 h-10 rounded-full bg-tattoo-red/20 flex items-center justify-center'>
                      <Calendar className='w-5 h-5 text-tattoo-red' />
                    </div>
                    <div>
                      <h3 className='font-medium text-tattoo-white'>Booking Steps</h3>
                      <ol className='text-sm text-tattoo-white/80 mt-2 space-y-1 list-decimal pl-4'>
                        <li>Choose your desired appointment date and time</li>
                        <li>Pay your deposit to secure your booking</li>
                        <li>Receive confirmation via email with all details</li>
                      </ol>
                    </div>
                  </div>

                  <div className='flex gap-4 items-start'>
                    <div className='shrink-0 w-10 h-10 rounded-full bg-tattoo-red/20 flex items-center justify-center'>
                      <Shield className='w-5 h-5 text-tattoo-red' />
                    </div>
                    <div>
                      <h3 className='font-medium text-tattoo-white'>Important Notes</h3>
                      <p className='text-sm text-tattoo-white/80 mt-2'>
                        A non-refundable deposit is required to reserve your time slot.
                        You must be 18+ with valid ID on the day of your appointment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Image Content with Overlapping Layout */}
          <div className='relative lg:h-auto overflow-hidden'>
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className='relative h-full min-h-[50vh] lg:min-h-[unset]'
            >
              {/* Main Image */}
              <Image
                src='/images/5082639F-3D97-45F8-8BFE-D28EBEE539DF.jpg'
                alt='Tattoo artist at work'
                fill
                className='object-cover rounded-none lg:rounded-l-3xl shadow-2xl'
                priority
              />

              {/* Decorative Elements */}
              <div className='absolute inset-0 bg-gradient-to-t from-tattoo-black/80 to-transparent opacity-80 lg:opacity-40'></div>

              {/* Floating Elements */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className='absolute bottom-12 -left-6 lg:bottom-16 lg:-left-16 w-32 h-32 sm:w-40 sm:h-40 rounded-lg shadow-2xl hidden sm:block z-10 border-2 border-white/10 overflow-hidden'
              >
                <Image
                  src='/images/IMG_4284.JPG'
                  alt='Tattoo artwork sample'
                  fill
                  className='object-cover'
                />
              </motion.div>

              {/* Floating Element 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className='absolute top-12 -right-6 lg:top-16 lg:-right-16 w-32 h-32 sm:w-40 sm:h-40 rounded-lg shadow-2xl hidden sm:block z-10 border-2 border-white/10 overflow-hidden'
              >
                <Image
                  src='/images/IMG_3947.JPG'
                  alt='Tattoo artwork sample'
                  fill
                  className='object-cover'
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Curve */}
        <div className='absolute bottom-0 left-0 right-0 h-16 sm:h-24'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='absolute bottom-0 h-full w-full'>
            <path
              fill="#0a0a0a"
              fillOpacity="1"
              d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,186.7C960,213,1056,235,1152,229.3C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <div className='container max-w-6xl mx-auto py-12 px-4 md:px-6'>
        <div className='grid md:grid-cols-3 gap-8 items-start'>
          <div className='md:col-span-2'>
            <div className='mb-8 lg:hidden'>
              <h2 className='text-2xl font-bold text-white mb-4'>Book Your Session</h2>
              <p className='text-white/80 mb-6'>
                Fill out the form below to reserve your time with Fernando. A non-refundable deposit is required to secure your appointment.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='bg-tattoo-black/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-white/10'
            >
              <BookingForm key={formKey} />
            </motion.div>
          </div>
          <motion.div
            className='space-y-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Information Card */}
            <div className='bg-tattoo-black/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-white/10 hover:border-tattoo-red/40 transition-all duration-300'>
              <h2 className='text-2xl font-extrabold mb-6 text-tattoo-white'>
                Before Your{' '}
                <span className='text-tattoo-red-light relative'>
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
            <div className='group bg-gradient-to-b from-tattoo-black to-black p-6 rounded-lg shadow-lg border border-tattoo-red/40 hover:border-tattoo-red transition-all duration-300'>
              <h2 className='text-2xl font-extrabold mb-4 text-tattoo-white'>
                Your{' '}
                <span className='text-tattoo-red relative'>
                  Artist
                  <span className='absolute -bottom-1 left-0 right-0 h-0.5 bg-tattoo-red/60'></span>
                </span>
              </h2>

              <div className='aspect-square relative mb-4 rounded-lg overflow-hidden'>
                <Image
                  src='/images/IMG_3896.JPG'
                  alt='Fernando - Tattoo Artist'
                  fill
                  className='object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60'></div>
                <div className='absolute inset-x-0 bottom-0 p-3'>
                  <h3 className='text-lg font-bold text-white'>Fernando Govea</h3>
                  <p className='text-white/80 text-sm'>
                    Black & grey specialist with 10+ years experience
                  </p>
                </div>
              </div>

              <Button
                className='w-full bg-tattoo-red text-tattoo-white hover:bg-tattoo-red/90 group-hover:bg-tattoo-red transition-all mt-2 flex justify-between items-center'
                asChild
              >
                <Link href='/about'>
                  View Artist Profile
                  <ArrowRight className='ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1' />
                </Link>
              </Button>
            </div>

            {/* Need Help Card */}
            <div className='bg-gradient-to-b from-black to-tattoo-black/90 p-6 rounded-lg shadow-lg border border-white/10 hover:border-white/30 transition-all duration-300'>
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
                      <span className='font-medium'>Email:</span> info@fernandogovea.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
