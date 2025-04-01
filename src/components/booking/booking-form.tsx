'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { bookingSchema, type BookingFormValues } from '@/lib/validators/booking'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import useFormPersist from 'react-hook-form-persist'
import { fetchAvailableTimeSlots, submitBookingRequest } from '@/lib/services/booking-service'
import {
  TIME_SLOTS,
  DURATION_OPTIONS,
  TATTOO_TYPES,
  BODY_PARTS
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
import { CalendarIcon, Loader2 } from 'lucide-react'
import { format, addDays, isWeekend } from 'date-fns'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'

export function BookingForm() {
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>(TIME_SLOTS)
  const [formKey, setFormKey] = useState(`booking-form-${Date.now()}`)
  const [isLoadingTimeSlots, setIsLoadingTimeSlots] = useState(false)

  // Define the form with explicit types
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      designDescription: '',
      referenceImages: [], // This must be an empty array, not undefined
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
        // Invalid phone number format, let the validation handle it
      }
    }
  }, [phoneValue, form])

  // Update available time slots when date changes - now using the API
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

  const mutation = useMutation({
    mutationFn: async (values: BookingFormValues) => {
      // Use the real API service
      return await submitBookingRequest(values)
    },
    onSuccess: (data) => {
      toast.success(
        "Your appointment request has been submitted! We'll contact you to confirm details."
      )
      form.reset()
      // Generate new form key to clear localStorage
      setFormKey(`booking-form-${Date.now()}`)
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "We couldn't process your booking. Please try again or contact us directly."
      )
    },
  })

  function onSubmit(data: BookingFormValues) {
    mutation.mutate(data)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='p-6 bg-tattoo-white rounded-lg shadow-md border border-tattoo-black/10'
    >
      <h2 className='text-2xl font-bold mb-6 text-tattoo-black'>
        Request an <span className='text-tattoo-red'>Appointment</span>
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          {/* Contact Information Section */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-tattoo-blue border-b border-tattoo-blue/20 pb-1'>
              Contact Information
            </h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <FormField
                control={form.control}
                name='clientName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-tattoo-black'>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='John Doe'
                        {...field}
                        className='border-tattoo-black/20 focus-visible:ring-tattoo-blue'
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
                    <FormLabel className='text-tattoo-black'>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='john@example.com'
                        type='email'
                        {...field}
                        className='border-tattoo-black/20 focus-visible:ring-tattoo-blue'
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
                  <FormLabel className='text-tattoo-black'>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='(555) 123-4567'
                      type='tel'
                      {...field}
                      className='border-tattoo-black/20 focus-visible:ring-tattoo-blue'
                    />
                  </FormControl>
                  <FormMessage className='text-tattoo-red' />
                </FormItem>
              )}
            />
          </div>

          {/* Appointment Details Section */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-tattoo-blue border-b border-tattoo-blue/20 pb-1'>
              Appointment Details
            </h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <FormField
                control={form.control}
                name='date'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel className='text-tattoo-black'>Appointment Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            className={cn(
                              'pl-3 text-left font-normal border-tattoo-black/20 focus-visible:ring-tattoo-blue',
                              !field.value && 'text-muted-foreground'
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
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          value={field.value}
                          onChange={field.onChange}
                          minDate={addDays(new Date(), 1)}
                          className='bg-tattoo-white'
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
                    <FormLabel className='text-tattoo-black'>Appointment Time</FormLabel>
                    <Select
                      disabled={!selectedDate || mutation.isPending || isLoadingTimeSlots}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='border-tattoo-black/20 focus-visible:ring-tattoo-blue'>
                          <SelectValue placeholder={
                            isLoadingTimeSlots
                              ? 'Loading available times...'
                              : 'Select a time slot'
                          } />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='bg-tattoo-white'>
                        {isLoadingTimeSlots ? (
                          <div className="flex items-center justify-center py-2">
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            <span>Loading times...</span>
                          </div>
                        ) : availableTimeSlots.length > 0 ? (
                          availableTimeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))
                        ) : (
                          <div className="py-2 text-center text-sm">
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

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <FormField
                control={form.control}
                name='duration'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-tattoo-black'>Session Duration</FormLabel>
                    <Select
                      disabled={mutation.isPending}
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className='border-tattoo-black/20 focus-visible:ring-tattoo-blue'>
                          <SelectValue placeholder='Select session duration' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='bg-tattoo-white'>
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
                    <FormLabel className='text-tattoo-black'>Appointment Type</FormLabel>
                    <Select
                      disabled={mutation.isPending}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='border-tattoo-black/20 focus-visible:ring-tattoo-blue'>
                          <SelectValue placeholder='Select appointment type' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='bg-tattoo-white'>
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
            <h3 className='text-lg font-semibold text-tattoo-blue border-b border-tattoo-blue/20 pb-1'>
              Tattoo Details
            </h3>

            <FormField
              control={form.control}
              name='bodyPart'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-tattoo-black'>Placement (Body Part)</FormLabel>
                  <Select
                    disabled={mutation.isPending}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='border-tattoo-black/20 focus-visible:ring-tattoo-blue'>
                        <SelectValue placeholder='Select body part for tattoo placement' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='bg-tattoo-white'>
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
                  <FormLabel className='text-tattoo-black'>Design Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Describe your tattoo idea including style, size, colors, and any special requests...'
                      className='min-h-[120px] border-tattoo-black/20 focus-visible:ring-tattoo-blue'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-tattoo-red' />
                  <p className='text-xs text-tattoo-black/60 mt-1'>
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
                  <FormLabel className='text-tattoo-black'>Reference Images</FormLabel>
                  <p className='text-xs text-tattoo-black/60 mb-2'>
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

          <Button
            type='submit'
            disabled={mutation.isPending}
            className='w-full bg-tattoo-red text-tattoo-white hover:bg-tattoo-red/90'
          >
            {mutation.isPending ? (
              <span className='flex items-center gap-2'>
                <Loader2 className='h-4 w-4 animate-spin' />
                Submitting Request...
              </span>
            ) : (
              'Request Appointment'
            )}
          </Button>

          <p className='text-xs text-center text-tattoo-black/60 mt-4'>
            By requesting an appointment, you agree to our cancellation policy and understand that a
            deposit will be required to confirm your booking. We'll contact you within 24-48 hours
            to confirm availability and discuss any details.
          </p>
        </form>
      </Form>
    </motion.div>
  )
}
