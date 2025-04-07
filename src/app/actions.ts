'use server'

import { z } from 'zod'
import { saveContactSubmission, getAllComments, getNeonClient } from '@/lib/neon'

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

export async function submitContactForm(prevState: unknown, formData: FormData) {
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

  // Process the form data and store in database
  try {
    // Save submission to the database using our utility function
    await saveContactSubmission({
      name: validatedFields.data.name,
      email: validatedFields.data.email,
      phone: validatedFields.data.phone,
      message: validatedFields.data.message,
      files: validatedFields.data.files,
    });

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

// Generic function to get data from any table
export async function getData(tableName = 'posts') {
  // Use the getNeonClient utility to get a connection
  const sql = getNeonClient();

  // Dynamic query based on table name using SQL template parameter
  try {
    const data = await sql`SELECT * FROM ${sql(tableName)}`;
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${tableName}:`, error);
    return [];
  }
}

// Function to get contact submissions
export async function getContactSubmissions() {
  try {
    // Use the utility function from our neon.ts file
    return await getAllComments();
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return [];
  }
}

// Function to add a test post
export async function addTestPost(title: string, content: string) {
  const sql = getNeonClient();

  try {
    const result = await sql`
      INSERT INTO posts (title, content)
      VALUES (${title}, ${content})
      RETURNING id, title, content, created_at
    `;

    return result[0];
  } catch (error) {
    console.error('Error adding test post:', error);
    throw error;
  }
}
