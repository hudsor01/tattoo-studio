'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingSchema, type BookingFormValues } from '@/lib/validators/booking';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileUpload } from '@/components/ui/file-upload';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { format, addDays, isWeekend } from 'date-fns';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';

// Available time slots
const TIME_SLOTS = [
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00'
];

// Duration options in minutes
const DURATION_OPTIONS = [
  { value: 30, label: '30 minutes - Quick Consultation' },
  { value: 60, label: '1 hour - Small Tattoo' },
  { value: 120, label: '2 hours - Medium Tattoo' },
  { value: 240, label: '4 hours - Large Tattoo' },
  { value: 480, label: '8 hours - Full Day Session' },
];

const TATTOO_TYPES = [
  { value: 'NEW_TATTOO', label: 'New Tattoo' },
  { value: 'TOUCH_UP', label: 'Touch-Up' },
  { value: 'COVER_UP', label: 'Cover-Up' },
  { value: 'CONSULTATION', label: 'Consultation Only' },
];

const BODY_PARTS = [
  'Arm', 'Forearm', 'Bicep', 'Shoulder', 'Back', 'Chest',
  'Stomach', 'Thigh', 'Calf', 'Ankle', 'Foot', 'Hand',
  'Neck', 'Head', 'Face', 'Ribs', 'Hip', 'Other'
];

export function BookingForm() {
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>(TIME_SLOTS);
  
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
    },
  });
  
  // Watch date to update available time slots
  const selectedDate = form.watch('date');
  
  // Update available time slots when date changes
  useEffect(() => {
    if (!selectedDate) return;
    
    // Simulate checking availability
    // In a real app, this would come from the server
    if (isWeekend(selectedDate)) {
      // Weekend has limited slots
      setAvailableTimeSlots(TIME_SLOTS.filter(slot => {
        const hour = parseInt(slot.split(':')[0]);
        return hour >= 12 && hour < 17; // 12pm-5pm only
      }));
    } else {
      // Weekdays have all slots
      setAvailableTimeSlots(TIME_SLOTS);
    }
  }, [selectedDate]);
  
  const mutation = useMutation({
    mutationFn: async (values: BookingFormValues) => {
      // This would be an API call in a real app
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return { success: true, id: 'booking-' + Math.random().toString(36).substr(2, 9) };
    },
    onSuccess: () => {
      toast.success("Your appointment request has been submitted! We'll contact you to confirm details.");
      form.reset();
    },
    onError: () => {
      toast.error("We couldn't process your booking. Please try again or contact us directly.");
    },
  });
  
  function onSubmit(values: BookingFormValues) {
    mutation.mutate(values);
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-tattoo-white rounded-lg shadow-md border border-tattoo-black/10"
    >
      <h2 className="text-2xl font-bold mb-6 text-tattoo-black">
        Request an <span className="text-tattoo-red">Appointment</span>
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Contact Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-tattoo-blue border-b border-tattoo-blue/20 pb-1">
              Contact Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-tattoo-black">Full Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="John Doe" 
                        {...field} 
                        className="border-tattoo-black/20 focus-visible:ring-tattoo-blue" 
                      />
                    </FormControl>
                    <FormMessage className="text-tattoo-red" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="clientEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-tattoo-black">Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="john@example.com" 
                        type="email" 
                        {...field} 
                        className="border-tattoo-black/20 focus-visible:ring-tattoo-blue" 
                      />
                    </FormControl>
                    <FormMessage className="text-tattoo-red" />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="clientPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-tattoo-black">Phone Number</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="(555) 123-4567" 
                      type="tel" 
                      {...field} 
                      className="border-tattoo-black/20 focus-visible:ring-tattoo-blue" 
                    />
                  </FormControl>
                  <FormMessage className="text-tattoo-red" />
                </FormItem>
              )}
            />
          </div>
          
          {/* Appointment Details Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-tattoo-blue border-b border-tattoo-blue/20 pb-1">
              Appointment Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-tattoo-black">Appointment Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "pl-3 text-left font-normal border-tattoo-black/20 focus-visible:ring-tattoo-blue",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "MMM dd, yyyy")
                            ) : (
                              <span>Select a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => {
                            // Disable today, yesterday, and weekends
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            const tomorrow = addDays(today, 1);
                            return date < tomorrow;
                          }}
                          initialFocus
                          className="bg-tattoo-white"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-tattoo-red" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-tattoo-black">Appointment Time</FormLabel>
                    <Select
                      disabled={!selectedDate || mutation.isPending}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-tattoo-black/20 focus-visible:ring-tattoo-blue">
                          <SelectValue placeholder="Select a time slot" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-tattoo-white">
                        {availableTimeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-tattoo-red" />
                    {selectedDate && isWeekend(selectedDate) && (
                      <p className="text-xs text-tattoo-blue mt-1">
                        Note: Weekend hours are limited (12pm-5pm)
                      </p>
                    )}
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-tattoo-black">Session Duration</FormLabel>
                    <Select
                      disabled={mutation.isPending}
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="border-tattoo-black/20 focus-visible:ring-tattoo-blue">
                          <SelectValue placeholder="Select session duration" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-tattoo-white">
                        {DURATION_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value.toString()}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-tattoo-red" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="tattooType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-tattoo-black">Appointment Type</FormLabel>
                    <Select
                      disabled={mutation.isPending}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-tattoo-black/20 focus-visible:ring-tattoo-blue">
                          <SelectValue placeholder="Select appointment type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-tattoo-white">
                        {TATTOO_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-tattoo-red" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Tattoo Details Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-tattoo-blue border-b border-tattoo-blue/20 pb-1">
              Tattoo Details
            </h3>
            
            <FormField
              control={form.control}
              name="bodyPart"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-tattoo-black">Placement (Body Part)</FormLabel>
                  <Select
                    disabled={mutation.isPending}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-tattoo-black/20 focus-visible:ring-tattoo-blue">
                        <SelectValue placeholder="Select body part for tattoo placement" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-tattoo-white">
                      {BODY_PARTS.map((part) => (
                        <SelectItem key={part} value={part}>
                          {part}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-tattoo-red" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="designDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-tattoo-black">Design Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your tattoo idea including style, size, colors, and any special requests..."
                      className="min-h-[120px] border-tattoo-black/20 focus-visible:ring-tattoo-blue"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-tattoo-red" />
                  <p className="text-xs text-tattoo-black/60 mt-1">
                    {field.value.length}/500 characters
                  </p>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="referenceImages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-tattoo-black">Reference Images</FormLabel>
                  <p className="text-xs text-tattoo-black/60 mb-2">
                    Upload reference images, inspiration, or drawings to help us understand your vision
                  </p>
                  <FormControl>
                    <FileUpload
                      endpoint="tattooDesigns"
                      value={field.value}
                      onChange={field.onChange}
                      maxFiles={5}
                      maxSize="4MB"
                      acceptedFileTypes={["image/*"]}
                    />
                  </FormControl>
                  <FormMessage className="text-tattoo-red" />
                </FormItem>
              )}
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={mutation.isPending}
            className="w-full bg-tattoo-red text-tattoo-white hover:bg-tattoo-red/90"
          >
            {mutation.isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting Request...
              </span>
            ) : "Request Appointment"}
          </Button>
          
          <p className="text-xs text-center text-tattoo-black/60 mt-4">
            By requesting an appointment, you agree to our cancellation policy and understand that 
            a deposit will be required to confirm your booking. We'll contact you within 24-48 hours 
            to confirm availability and discuss any details.
          </p>
        </form>
      </Form>
    </motion.div>
  );
}
