'use client'

import React from 'react' // Import React at the top of the file
import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader2, FileImage, X, UploadCloud, AlertCircle } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import Image from 'next/image'

// Define the form schema with file upload and inquiry type
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  inquiryType: z.string().min(1, 'Please select an inquiry type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  referenceImages: z.array(z.instanceof(File)).optional(),
})

// Define the ContactForm props type - renamed to avoid Server Action naming pattern
export interface ContactFormProps {
  onFormSubmit: () => void
}

export function ContactForm({ onFormSubmit }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [formError, setFormError] = useState<string | null>(null)

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      inquiryType: '',
      message: '',
      referenceImages: [],
    },
  })

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newFiles = Array.from(files)

    // Validate file types (only images)
    const invalidFiles = newFiles.filter((file) => !file.type.includes('image/'))
    if (invalidFiles.length > 0) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload only image files (JPG, PNG, etc.)',
        variant: 'destructive',
      })
      return
    }

    // Validate file size (max 5MB each)
    const oversizedFiles = newFiles.filter((file) => file.size > 5 * 1024 * 1024)
    if (oversizedFiles.length > 0) {
      toast({
        title: 'File too large',
        description: 'Some files exceed the 5MB limit',
        variant: 'destructive',
      })
      return
    }

    // Update form value and state
    const updatedFiles = [...uploadedFiles, ...newFiles]
    setUploadedFiles(updatedFiles)
    form.setValue('referenceImages', updatedFiles)
  }

  // Remove file from upload list
  const removeFile = (index: number) => {
    const updatedFiles = [...uploadedFiles]
    updatedFiles.splice(index, 1)
    setUploadedFiles(updatedFiles)
    form.setValue('referenceImages', updatedFiles)
  }

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setFormError(null)

    // Simulate API call with timeout
    try {
      // Create FormData for file upload
      const formData = new FormData()
      formData.append('name', values.name)
      formData.append('email', values.email)
      formData.append('phone', values.phone || '')
      formData.append('inquiryType', values.inquiryType)
      formData.append('message', values.message)

      // Append files if any
      if (values.referenceImages && values.referenceImages.length > 0) {
        values.referenceImages.forEach((file, index) => {
          formData.append(`file${index}`, file)
        })
      }

      // In a real implementation, you would send this formData to your API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log('Form submitted:', {
        ...values,
        referenceImages: values.referenceImages ? `${values.referenceImages.length} files` : 'none',
      })

      toast({
        title: 'Message sent successfully!',
        description: "We'll get back to you soon.",
        variant: 'default',
      })

      // Reset form
      form.reset()
      setUploadedFiles([])
      onFormSubmit()
    } catch (error) {
      console.error('Error submitting form:', error)
      setFormError('There was an error sending your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="@container">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 sm:space-y-6'>
          {formError && (
            <Alert variant='destructive'>
              <AlertCircle className='h-4 w-4' />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}

          <div className='grid grid-cols-1 @sm:grid-cols-2 gap-4 sm:gap-6'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-tattoo-white'>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Your name'
                      {...field}
                      className='bg-tattoo-black/50 border-tattoo-white/10 text-tattoo-white placeholder:text-tattoo-white/40'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-tattoo-white'>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Your email'
                      type='email'
                      {...field}
                      className='bg-tattoo-black/50 border-tattoo-white/10 text-tattoo-white placeholder:text-tattoo-white/40'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='grid grid-cols-1 @sm:grid-cols-2 gap-4 sm:gap-6'>
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-tattoo-white'>Phone (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Your phone number'
                      type='tel'
                      {...field}
                      className='bg-tattoo-black/50 border-tattoo-white/10 text-tattoo-white placeholder:text-tattoo-white/40'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='inquiryType'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-tattoo-white'>Inquiry Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className='bg-tattoo-black/50 border-tattoo-white/10 text-tattoo-white'>
                        <SelectValue placeholder='Select inquiry type' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='bg-tattoo-black border-tattoo-white/10'>
                      <SelectItem value='custom-tattoo' className='text-tattoo-white'>
                        Custom Tattoo Design
                      </SelectItem>
                      <SelectItem value='coverup' className='text-tattoo-white'>
                        Cover-up Work
                      </SelectItem>
                      <SelectItem value='consultation' className='text-tattoo-white'>
                        Consultation
                      </SelectItem>
                      <SelectItem value='pricing' className='text-tattoo-white'>
                        Pricing Information
                      </SelectItem>
                      <SelectItem value='other' className='text-tattoo-white'>
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='message'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-tattoo-white'>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Tell me about your tattoo idea'
                    {...field}
                    className='bg-tattoo-black/50 border-tattoo-white/10 text-tattoo-white placeholder:text-tattoo-white/40 min-h-[120px] @md:min-h-[160px]'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* File Upload */}
          <FormField
            control={form.control}
            name='referenceImages'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-tattoo-white'>Reference Images (Optional)</FormLabel>
                <FormDescription className='text-tattoo-white/60 text-sm'>
                  Upload photos of tattoo designs or placements you like (max 5MB each)
                </FormDescription>

                <div className='mt-2'>
                  <div className='flex items-center justify-center w-full'>
                    <label
                      htmlFor='fileUpload'
                      className={cn(
                        'flex flex-col items-center justify-center w-full h-24 sm:h-32 border-2 border-dashed border-tattoo-white/20',
                        'rounded-lg cursor-pointer bg-tattoo-black/30 hover:bg-tattoo-black/50 transition-colors',
                        'focus-within:border-tattoo-red/50'
                      )}
                    >
                      <div className='flex flex-col items-center justify-center pt-4 pb-5 sm:pt-5 sm:pb-6'>
                        <UploadCloud className='w-6 h-6 sm:w-8 sm:h-8 mb-2 text-tattoo-red/70' />
                        <p className='mb-1 sm:mb-2 text-xs sm:text-sm text-tattoo-white/70'>
                          <span className='font-semibold'>Click to upload</span> or drag and drop
                        </p>
                        <p className='text-xs text-tattoo-white/50'>PNG, JPG, GIF up to 5MB</p>
                      </div>
                      <input
                        id='fileUpload'
                        type='file'
                        className='hidden'
                        accept='image/*'
                        multiple
                        onChange={(e) => {
                          handleFileChange(e);
                          field.onChange(e);
                        }}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </label>
                  </div>

                  {/* Preview uploaded files */}
                  {uploadedFiles.length > 0 && (
                    <div className='mt-4 space-y-2'>
                      <p className='text-sm font-medium text-tattoo-white'>Uploaded Images:</p>
                      <div className='flex flex-wrap gap-2 sm:gap-3'>
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className='relative group'>
                            <div className='w-16 h-16 sm:w-20 sm:h-20 rounded-md bg-tattoo-black/70 border border-tattoo-white/20 overflow-hidden'>
                              <div className='absolute inset-0 flex items-center justify-center'>
                                <FileImage className='w-5 h-5 sm:w-6 sm:h-6 text-tattoo-white/50' />
                              </div>
                              <Image
                                src={URL.createObjectURL(file)}
                                alt={`Preview ${index}`}
                                width={500} // Set appropriate width
                                height={300} // Set appropriate height
                                className='w-full h-full object-cover'
                              />
                            </div>
                            <button
                              type='button'
                              onClick={() => removeFile(index)}
                              className='absolute -top-2 -right-2 bg-tattoo-red text-tattoo-white rounded-full p-0.5 opacity-90 hover:opacity-100 transition-opacity'
                            >
                              <X className='w-3 h-3 sm:w-4 sm:h-4' />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            disabled={isSubmitting}
            className='w-full bg-tattoo-red hover:bg-tattoo-red-dark text-tattoo-white mt-2 sm:mt-4'
          >
            {isSubmitting ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Sending Message...
              </>
            ) : (
              'Send Message'
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
