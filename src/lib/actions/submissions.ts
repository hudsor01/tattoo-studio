'use server';

import { PrismaClient } from '@prisma/client';
import { unstable_cache } from 'next/cache';

const prisma = new PrismaClient();

export const getSubmissions = unstable_cache(
  async () => {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return submissions;
  },
  ['contact-submissions'], // Cache key
  { 
    revalidate: 60, // Revalidate every 60 seconds
    tags: ['submissions'], 
  }
);

// Function to update status
export async function updateSubmissionStatus(id: string, status: string) {
  const validStatuses = ['PENDING', 'CONTACTED', 'RESOLVED', 'ARCHIVED'];
  
  if (!validStatuses.includes(status)) {
    throw new Error('Invalid status');
  }
  
  const updated = await prisma.contactSubmission.update({
    where: { id },
    data: { status },
  });
  
  return updated;
}