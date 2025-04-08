import { Suspense } from 'react';
import { getNeonClient, getComments, initDatabase } from '@/lib/neon';
import { Card, CardContent } from '@/components/ui/card';
import CommentForm from './comment-form';
import CommentsList from './comments-list';
import CommentsSkeleton from './comments-skeleton';

// Get database version
async function getDatabaseVersion() {
  try {
    const sql = getNeonClient();
    const response = await sql`SELECT version()`;
    return response[0].version;
  } catch (error: unknown) {
    console.error('Error fetching database version:', error);
    throw new Error('Failed to connect to database');
  }
}

// Initialize tables if they don't exist
async function ensureDatabase() {
  try {
    await initDatabase();
  } catch (error: unknown) {
    console.error('Error initializing database:', error);
    throw new Error('Failed to initialize database');
  }
}

export const dynamic = 'force-dynamic'; // Ensure the page is not statically generated

interface PageProps {
  searchParams: { page?: string };
}

export default async function CommentsPage({ searchParams }: PageProps) {
  // Get the current page from the URL query parameters
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

  // Initialize database tables
  await ensureDatabase();

  // Get database version
  const dbVersion = await getDatabaseVersion();

  // Get paginated comments
  const { comments, totalPages } = await getComments(currentPage, 5) as { comments: any[]; totalPages: number };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Neon Database Connection Test</h1>

      {/* Database version card */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <p className="font-mono">{dbVersion}</p>
        </CardContent>
      </Card>

      {/* Comment form section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add a Comment</h2>
        <CommentForm />
      </div>

      {/* Comments list section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Comments ({comments.length > 0 ? `${comments.length} of ${totalPages * 5}` : '0'})
        </h2>

        <Suspense fallback={<CommentsSkeleton />}>
          <CommentsList
            comments={comments}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </Suspense>
      </div>
    </div>
  );
}
