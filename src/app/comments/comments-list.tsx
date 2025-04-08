'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { removeComment } from '../actions';
import { Trash2 } from 'lucide-react';

interface Comment {
  id: number;
  comment: string;
  created_at: string;
}

interface CommentsListProps {
  comments: Comment[];
  totalPages: number;
  currentPage: number;
}

// Convert to default export
const CommentsList = ({ comments, totalPages, currentPage }: CommentsListProps) => {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  async function handleDelete(id: number) {
    setDeletingId(id);

    try {
      const formData = new FormData();
      formData.append('id', id.toString());

      const result = await removeComment(formData);

      if (result.success) {
        toast({
          title: 'Comment deleted',
          description: 'The comment has been deleted successfully.',
        });

        // Refresh the page
        router.refresh();
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to delete comment',
          variant: 'destructive',
        });
      }
    } catch { // Empty catch block without parameter
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setDeletingId(null);
    }
  }

  function handlePageChange(page: number) {
    router.push(`/comments?page=${page}`);
  }

  if (comments.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500 italic">No comments yet. Be the first to add one!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id} className="relative">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500 font-normal">
                {new Date(comment.created_at).toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{comment.comment}</p>
            </CardContent>
            <CardFooter className="flex justify-end pt-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(comment.id)}
                disabled={deletingId === comment.id}
                className="text-red-500 hover:text-red-700 hover:bg-red-100"
                aria-label="Delete comment"
              >
                {deletingId === comment.id ? 'Deleting...' : <Trash2 className="h-4 w-4" />}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? 'default' : 'outline'}
              size="sm"
              onClick={() => handlePageChange(page)}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentsList;
