import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { ModeToggle } from '@/components/theme/mode-toggle';
import { DataTable } from '@/components/admin/submissions-table';
import { Submission } from '@/components/admin/submissions-table';
import { getSubmissions } from '@/lib/actions/submissions';

export default async function AdminSubmissions() {
  const session = await auth();
  if (!session?.user) return redirect("/login");

  const submissions = await getSubmissions();

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Contact Submissions</h1>
        <ModeToggle />
      </div>
      <DataTable data={submissions as Submission[]} />
    </div>
  );
}
