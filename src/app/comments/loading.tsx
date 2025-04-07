import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { CommentsSkeleton } from './components/comments-skeleton';

export default function Loading() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Neon Database Connection Test</h1>

      {/* Database version skeleton */}
      <Card className="p-4 mb-6">
        <CardContent className="p-0">
          <Skeleton className="h-6 w-full" />
        </CardContent>
      </Card>

      {/* Comment form skeleton */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Add a Comment</h2>
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-grow" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>

      {/* Comments list skeleton */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <CommentsSkeleton />
      </div>
    </div>
  );
}
