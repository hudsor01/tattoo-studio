'use server'

import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  files: z.string().transform((val) => {
    try {
      return JSON.parse(val) as string[]
    } catch {
      return [] as string[]
    }
  }),
})

export async function submitContactForm(prevState: any, formData: FormData) {
  // Validate form data
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    message: formData.get('message'),
    files: formData.get('files'),
  })

  // Return errors if validation fails
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Process the form data (e.g., send email, store in database)
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Here you would typically send an email or store in a database
    console.log('Form submitted:', validatedFields.data)

    // Return success
    return {
      success: true,
      errors: {},
    }
  } catch (error) {
    console.error('Error submitting form:', error)
    return {
      success: false,
      errors: {
        form: 'Failed to submit the form. Please try again later.',
      },
    }
  }
}
