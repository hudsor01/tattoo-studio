'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { bookingSchema, type BookingFormValues } from '@/lib/validators/booking'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import useFormPersist from 'react-hook-form-persist'
import { fetchAvailableTimeSlots } from '@/lib/services/booking-service'
import {
  TIME_SLOTS,
  DURATION_OPTIONS,
  TATTOO_TYPES,
  BODY_PARTS,
} from '@/lib/constants/booking-constants'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FileUpload } from '@/components/ui/file-upload'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { CalendarIcon, Loader2, ArrowRight } from 'lucide-react'
import { format, addDays } from 'date-fns'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { DepositPaymentForm } from './deposit-payment-form'

// Define booking steps
enum BookingStep {
  BOOKING_DETAILS = 0,
  PAYMENT = 1,
  CONFIRMATION = 2,
}

export function BookingForm() {
  const [currentStep, setCurrentStep] = useState<BookingStep>(BookingStep.BOOKING_DETAILS)
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>(TIME_SLOTS)
  const [formKey, setFormKey] = useState(`booking-form-${Date.now()}`)
  const [isLoadingTimeSlots, setIsLoadingTimeSlots] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingData, setBookingData] = useState<BookingFormValues | null>(null)
  const [bookingId, setBookingId] = useState<string | null>(null)

  // Define the form with explicit types
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      designDescription: '',
      referenceImages: [],
      duration: 60,
      tattooType: 'NEW_TATTOO',
      bodyPart: '',
      date: undefined as unknown as Date,
      time: '',
    },
  })

  // Persist form data in localStorage
  useFormPersist(`${formKey}`, {
    watch: form.watch,
    setValue: form.setValue,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    exclude: ['referenceImages'],
  })

  // Watch date to update available time slots
  const selectedDate = form.watch('date')

  // Format phone number as user types
  const phoneValue = form.watch('clientPhone')
  useEffect(() => {
    if (phoneValue) {
      try {
        const phoneNumber = parsePhoneNumberFromString(phoneValue, 'US')
        if (phoneNumber) {
          const formatted = phoneNumber.formatNational()
          if (formatted !== phoneValue) {
            form.setValue('clientPhone', formatted)
          }
        }
      } catch (e) {
        console.error('Failed to format phone number:', e)
      }
    }
  }, [phoneValue, form])

  // Update available time slots when date changes
  useEffect(() => {
    if (!selectedDate) return

    async function getTimeSlots() {
      setIsLoadingTimeSlots(true)
      try {
        // Fetch available time slots from the server
        const slots = await fetchAvailableTimeSlots(selectedDate)
        setAvailableTimeSlots(slots)

        // If the currently selected time is no longer available, clear it
        const currentTime = form.getValues('time')
        if (currentTime && !slots.includes(currentTime)) {
          form.setValue('time', '')
        }
      } catch (error) {
        console.error('Failed to fetch time slots:', error)
        toast.error('Could not load available time slots. Please try again.')
      } finally {
        setIsLoadingTimeSlots(false)
      }
    }

    getTimeSlots()
  }, [selectedDate, form])

  // Handle the initial form submission
  async function onSubmit(data: BookingFormValues) {
    setIsSubmitting(true)

    try {
      // Store the booking data for the payment step
      setBookingData(data)

      // Move to the payment step
      setCurrentStep(BookingStep.PAYMENT)
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error("We couldn't process your booking. Please try again or contact us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle payment success
  function handlePaymentSuccess(paymentId: string) {
    // Store the booking ID (if needed for future reference)
    setBookingId(paymentId)

    // Clear the form data since the booking is complete
    form.reset()

    // Generate new form key to clear localStorage
    setFormKey(`booking-form-${Date.now()}`)

    // Move to confirmation step
    setCurrentStep(BookingStep.CONFIRMATION)
  }

  // Handle payment cancellation
  function handlePaymentCancel() {
    // Return to booking details step
    setCurrentStep(BookingStep.BOOKING_DETAILS)
  }

  // Reset the entire booking process
  function resetBooking() {
    form.reset()
    setBookingData(null)
    setBookingId(null)
    setCurrentStep(BookingStep.BOOKING_DETAILS)
    setFormKey(`booking-form-${Date.now()}`)
  }

  // Show confirmation screen
  if (currentStep === BookingStep.CONFIRMATION) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='p-6 bg-tattoo-black/50 backdrop-blur-sm rounded-lg shadow-md border border-white/10 text-center'
      >
        <div className='h-16 w-16 bg-tattoo-red rounded-full flex items-center justify-center mx-auto mb-6'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='text-white'
          >
            <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14'></path>
            <polyline points='22 4 12 14.01 9 11.01'></polyline>
          </svg>
        </div>

        <h2 className='text-2xl font-extrabold mb-4 text-tattoo-white'>
          Your Appointment is{' '}
          <span className='text-tattoo-red relative'>
            Confirmed
            <span className='absolute -bottom-1 left-0 right-0 h-0.5 bg-tattoo-red/60'></span>
          </span>
        </h2>

        <p className='text-tattoo-white/80 mb-6'>
          Thank you for your booking. We've sent a confirmation email with all the details.
        </p>

        <Button
          onClick={resetBooking}
          className='bg-tattoo-red hover:bg-tattoo-red-dark text-white'
        >
          Book Another Appointment
        </Button>
      </motion.div>
    )
  }

  // Show payment form
  if (currentStep === BookingStep.PAYMENT && bookingData) {
    return (
      <DepositPaymentForm
        bookingData={bookingData}
        onPaymentSuccess={handlePaymentSuccess}
        onCancel={handlePaymentCancel}
      />
    )
  }

  // Default: Show booking form
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='@container p-4 sm:p-6 bg-tattoo-black/50 backdrop-blur-sm rounded-lg shadow-md border border-white/10'
    >
      <h2 className='text-xl sm:text-2xl font-extrabold mb-4 sm:mb-6 text-tattoo-white'>
        Request an{' '}
        <span className='text-tattoo-red relative'>
          Appointment
          <span className='absolute -bottom-1 left-0 right-0 h-0.5 bg-tattoo-red/60'></span>
        </span>
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 sm:space-y-6'>
          {/* Contact Information Section */}
          <div className='space-y-4'>
            <h3 className='text-base sm:text-lg font-semibold text-tattoo-red-light border-b border-tattoo-red/20 pb-1'>
              Contact Information
            </h3>

            <div className='grid grid-cols-1 @sm:grid-cols-2 gap-4 sm:gap-6'>
              <FormField
                control={form.control}
                name='clientName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-tattoo-white'>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='John Doe'
                        {...field}
                        className='border-white/20 bg-tattoo-black/70 text-tattoo-white focus-visible:ring-tattoo-red-light placeholder:text-white/50'
                      />
                    </FormControl>
                    <FormMessage className='text-tattoo-red' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='clientEmail'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-tattoo-white'>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='john@example.com'
                        type='email'
                        {...field}
                        className='border-white/20 bg-tattoo-black/70 text-tattoo-white focus-visible:ring-tattoo-red-light placeholder:text-white/50'
                      />
                    </FormControl>
                    <FormMessage className='text-tattoo-red' />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='clientPhone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-tattoo-white'>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='(555) 123-4567'
                      type='tel'
                      {...field}
                      className='border-white/20 bg-tattoo-black/70 text-tattoo-white focus-visible:ring-tattoo-red-light placeholder:text-white/50'
                    />
                  </FormControl>
                  <FormMessage className='text-tattoo-red' />
                </FormItem>
              )}
            />
          </div>

          {/* Appointment Details Section */}
          <div className='space-y-4'>
            <h3 className='text-base sm:text-lg font-semibold text-tattoo-red-light border-b border-tattoo-red/20 pb-1'>
              Appointment Details
            </h3>

            <div className='grid grid-cols-1 @sm:grid-cols-2 gap-4 sm:gap-6'>
              <FormField
                control={form.control}
                name='date'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel className='text-tattoo-white'>Appointment Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            className={cn(
                              'pl-3 text-left font-normal border-white/20 bg-tattoo-black/70 text-tattoo-white focus-visible:ring-tattoo-red-light',
                              !field.value && 'text-white/70'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'MMM dd, yyyy')
                            ) : (
                              <span>Select a date</span>
                            )}
                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className='w-auto p-0 bg-tattoo-black border-white/20'
                        align='start'
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          fromDate={addDays(new Date(), 1)}
                          className='bg-tattoo-black text-tattoo-white'
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className='text-tattoo-red' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='time'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-tattoo-white'>Appointment Time</FormLabel>
                    <Select
                      disabled={!selectedDate || isSubmitting || isLoadingTimeSlots}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='border-white/20 bg-tattoo-black/70 text-tattoo-white focus-visible:ring-tattoo-red-light'>
                          <SelectValue
                            placeholder={
                              isLoadingTimeSlots
                                ? 'Loading available times...'
                                : 'Select a time slot'
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='bg-tattoo-black border-white/20 text-tattoo-white'>
                        {isLoadingTimeSlots ? (
                          <div className='flex items-center justify-center py-2'>
                            <Loader2 className='h-4 w-4 animate-spin mr-2' />
                            <span>Loading times...</span>
                          </div>
                        ) : availableTimeSlots.length > 0 ? (
                          availableTimeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))
                        ) : (
                          <div className='py-2 text-center text-sm'>
                            No available times for this date
                          </div>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage className='text-tattoo-red' />
                    {selectedDate && availableTimeSlots.length === 0 && !isLoadingTimeSlots && (
                      <p className='text-xs text-tattoo-red mt-1'>
                        No available slots for this date. Please select another date.
                      </p>
                    )}
                  </FormItem>
                )}
              />
            </div>

            {/* Duration and tattoo type fields */}
            <div className='grid grid-cols-1 @sm:grid-cols-2 gap-4 sm:gap-6'>
              <FormField
                control={form.control}
                name='duration'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-tattoo-white'>Session Duration</FormLabel>
                    <Select
                      disabled={isSubmitting}
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className='border-white/20 bg-tattoo-black/70 text-tattoo-white focus-visible:ring-tattoo-red-light'>
                          <SelectValue placeholder='Select session duration' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='bg-tattoo-black border-white/20 text-tattoo-white'>
                        {DURATION_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value.toString()}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className='text-tattoo-red' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='tattooType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-tattoo-white'>Appointment Type</FormLabel>
                    <Select
                      disabled={isSubmitting}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='border-white/20 bg-tattoo-black/70 text-tattoo-white focus-visible:ring-tattoo-red-light'>
                          <SelectValue placeholder='Select appointment type' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='bg-tattoo-black border-white/20 text-tattoo-white'>
                        {TATTOO_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className='text-tattoo-red' />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Tattoo Details Section */}
          <div className='space-y-4'>
            <h3 className='text-base sm:text-lg font-semibold text-tattoo-red-light border-b border-tattoo-red/20 pb-1'>
              Tattoo Details
            </h3>

            <FormField
              control={form.control}
              name='bodyPart'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-tattoo-white'>Placement (Body Part)</FormLabel>
                  <Select
                    disabled={isSubmitting}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='border-white/20 bg-tattoo-black/70 text-tattoo-white focus-visible:ring-tattoo-red-light'>
                        <SelectValue placeholder='Select body part for tattoo placement' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='bg-tattoo-black border-white/20 text-tattoo-white @md:max-h-[300px]'>
                      {BODY_PARTS.map((part) => (
                        <SelectItem key={part} value={part}>
                          {part}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className='text-tattoo-red' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='designDescription'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-tattoo-white'>Design Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Describe your tattoo idea including style, size, colors, and any special requests...'
                      className='min-h-[100px] @md:min-h-[120px] border-white/20 bg-tattoo-black/70 text-tattoo-white focus-visible:ring-tattoo-red-light placeholder:text-white/50'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-tattoo-red' />
                  <p className='text-xs text-tattoo-white/60 mt-1'>
                    {field.value.length}/500 characters
                  </p>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='referenceImages'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-tattoo-white'>Reference Images</FormLabel>
                  <p className='text-xs text-tattoo-white/60 mb-2'>
                    Upload reference images, inspiration, or drawings to help us understand your
                    vision
                  </p>
                  <FormControl>
                    <FileUpload
                      endpoint='tattooDesigns'
                      value={field.value}
                      onChange={field.onChange}
                      maxFiles={5}
                      maxSize='4MB'
                      acceptedFileTypes={['image/*']}
                    />
                  </FormControl>
                  <FormMessage className='text-tattoo-red' />
                </FormItem>
              )}
            />
          </div>

          <div className='bg-tattoo-black/70 p-3 sm:p-4 rounded-lg border border-white/10 mb-4'>
            <div className='flex items-center text-tattoo-white'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='mr-2 text-tattoo-red'
              >
                <circle cx='12' cy='12' r='10' />
                <path d='M12 16v-4' />
                <path d='M12 8h.01' />
              </svg>
              <h4 className='font-medium'>Deposit Required</h4>
            </div>
            <p className='text-xs sm:text-sm text-tattoo-white/70 mt-2'>
              A $50 non-refundable deposit is required to confirm your appointment. This deposit
              will be applied to your final tattoo cost.
            </p>
          </div>

          <Button
            type='submit'
            disabled={isSubmitting}
            className='w-full bg-tattoo-red text-tattoo-white hover:bg-tattoo-red/90 flex items-center justify-center'
          >
            {isSubmitting ? (
              <span className='flex items-center gap-2'>
                <Loader2 className='h-4 w-4 animate-spin' />
                Processing...
              </span>
            ) : (
              <span className='flex items-center gap-2'>
                Continue to Payment
                <ArrowRight className='h-4 w-4' />
              </span>
            )}
          </Button>

          <p className='text-xs text-center text-tattoo-white/60 mt-4'>
            By proceeding, you agree to our cancellation policy. We'll contact you within 24-48
            hours to discuss any details about your tattoo design.
          </p>
        </form>
      </Form>
    </motion.div>
  )
}
