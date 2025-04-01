'use client'

import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { submitContactForm } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { UploadDropzone } from '@/components/ui/upload-dropzone'
import { Send, Loader2 } from 'lucide-react'

// Form submit button with loading state
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type='submit' className='tattoo-button w-full' disabled={pending}>
      {pending ? (
        <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          Sending...
        </>
      ) : (
        <>
          <Send className='mr-2 h-4 w-4' />
          Send Message
        </>
      )}
    </Button>
  )
}

export function ContactForm() {
  const [files, setFiles] = useState<string[]>([])
  const [state, formAction] = useFormState(submitContactForm, {
    success: false,
    errors: {},
  })

  const handleFileUpload = (urls: string[]) => {
    setFiles(urls)
  }

  return (
    <div className='bg-tattoo-gray/30 rounded-lg p-6 border border-tattoo-white/10'>
      <h2 className='text-2xl font-bold mb-6 text-tattoo-white'>
        Send Me a <span className='text-tattoo-red'>Message</span>
      </h2>

      {state.success ? (
        <div className='bg-green-500/20 border border-green-500/30 rounded-md p-4 mb-6'>
          <p className='text-green-400 font-medium'>
            Thank you for your message! I'll get back to you soon.
          </p>
        </div>
      ) : null}

      <form action={formAction} className='space-y-6'>
        <input type='hidden' name='files' value={JSON.stringify(files)} />

        <div className='grid md:grid-cols-2 gap-6'>
          <div className='space-y-2'>
            <label htmlFor='name' className='block text-sm font-medium text-tattoo-white'>
              Your Name <span className='text-tattoo-red'>*</span>
            </label>
            <Input id='name' name='name' placeholder='Enter your name' className='tattoo-input' />
            {state.errors && 'name' in state.errors && state.errors.name && (
              <p className='text-sm text-tattoo-red mt-1'>{state.errors.name}</p>
            )}
          </div>

          <div className='space-y-2'>
            <label htmlFor='email' className='block text-sm font-medium text-tattoo-white'>
              Email Address <span className='text-tattoo-red'>*</span>
            </label>
            <Input
              id='email'
              name='email'
              type='email'
              placeholder='Enter your email'
              className='tattoo-input'
            />
            {state.errors && 'email' in state.errors && state.errors.email && (
              <p className='text-sm text-tattoo-red mt-1'>{state.errors.email}</p>
            )}
          </div>
        </div>

        {/* Rest of the form fields remain similar but use name attribute instead of register */}

        <div className='space-y-2'>
          <label htmlFor='phone' className='block text-sm font-medium text-tattoo-white'>
            Phone Number <span className='text-tattoo-white/50'>(Optional)</span>
          </label>
          <Input
            id='phone'
            name='phone'
            placeholder='Enter your phone number'
            className='tattoo-input'
          />
          {state.errors && 'phone' in state.errors && state.errors.phone && (
            <p className='text-sm text-tattoo-red mt-1'>{state.errors.phone}</p>
          )}
        </div>

        <div className='space-y-2'>
          <label htmlFor='message' className='block text-sm font-medium text-tattoo-white'>
            Your Message <span className='text-tattoo-red'>*</span>
          </label>
          <Textarea
            id='message'
            name='message'
            placeholder='Describe your tattoo idea, questions, or request...'
            className='tattoo-input min-h-[120px]'
          />
          {state.errors && 'message' in state.errors && state.errors.message && (
            <p className='text-sm text-tattoo-red mt-1'>{state.errors.message}</p>
          )}
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-medium text-tattoo-white'>
            Reference Images <span className='text-tattoo-white/50'>(Optional)</span>
          </label>
          <div className='border border-dashed border-tattoo-white/20 rounded-md p-6 bg-tattoo-black/30'>
            <UploadDropzone onUploadComplete={handleFileUpload} />
          </div>
          <p className='text-xs text-tattoo-white/50'>
            Upload reference images for your tattoo design (Max 5 files, 5MB each)
          </p>
        </div>

        <SubmitButton />
      </form>
    </div>
  )
}
