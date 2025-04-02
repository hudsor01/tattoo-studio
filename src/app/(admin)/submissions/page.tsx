// This directive ensures the page is not statically generated at build time
export const dynamic = 'force-dynamic';

import { ModeToggle } from '@/components/theme/mode-toggle'
import { DataTable } from '@/components/admin/submissions-table'
import { Submission } from '@/components/admin/submissions-table'
import { getSubmissions } from '@/lib/actions/submissions'

export default async function AdminSubmissions() {
  // Auth check removed since we're focusing only on marketing pages for now
  // Will add proper authentication later

  // Try to get submissions, but provide fallback empty array if database is not available
  let submissions: Submission[] = [];

  try {
    submissions = await getSubmissions();
  } catch (error) {
    console.error('Failed to fetch submissions:', error);
    // Just use empty array if database is not available
  }

  return (
    <div className='p-6 space-y-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Contact Submissions</h1>
        <ModeToggle />
      </div>
      <DataTable data={submissions} />
    </div>
  )
}
