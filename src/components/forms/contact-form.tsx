'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormValues } from '@/lib/validators/contact';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UploadDropzone } from '@/components/ui/upload-dropzone';
import { Send, Loader2 } from 'lucide-react';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      files: [],
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', data);
      setIsSuccess(true);
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (urls: string[]) => {
    setValue('files', urls, { shouldValidate: true });
  };

  return (
    <div className="bg-tattoo-gray/30 rounded-lg p-6 border border-tattoo-white/10">
      <h2 className="text-2xl font-bold mb-6 text-tattoo-white">
        Send Me a <span className="text-tattoo-red">Message</span>
      </h2>

      {isSuccess ? (
        <div className="bg-green-500/20 border border-green-500/30 rounded-md p-4 mb-6">
          <p className="text-green-400 font-medium">
            Thank you for your message! I'll get back to you soon.
          </p>
        </div>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-tattoo-white">
              Your Name <span className="text-tattoo-red">*</span>
            </label>
            <Input
              id="name"
              placeholder="Enter your name"
              className="tattoo-input"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-sm text-tattoo-red mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-tattoo-white">
              Email Address <span className="text-tattoo-red">*</span>
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="tattoo-input"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-tattoo-red mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-tattoo-white">
            Phone Number <span className="text-tattoo-white/50">(Optional)</span>
          </label>
          <Input
            id="phone"
            placeholder="Enter your phone number"
            className="tattoo-input"
            {...register('phone')}
          />
          {errors.phone && (
            <p className="text-sm text-tattoo-red mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium text-tattoo-white">
            Your Message <span className="text-tattoo-red">*</span>
          </label>
          <Textarea
            id="message"
            placeholder="Describe your tattoo idea, questions, or request..."
            className="tattoo-input min-h-[120px]"
            {...register('message')}
          />
          {errors.message && (
            <p className="text-sm text-tattoo-red mt-1">{errors.message.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-tattoo-white">
            Reference Images <span className="text-tattoo-white/50">(Optional)</span>
          </label>
          <div className="border border-dashed border-tattoo-white/20 rounded-md p-6 bg-tattoo-black/30">
            <UploadDropzone onUploadComplete={handleFileUpload} />
          </div>
          <p className="text-xs text-tattoo-white/50">
            Upload reference images for your tattoo design (Max 5 files, 5MB each)
          </p>
        </div>

        <Button
          type="submit"
          className="tattoo-button w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
