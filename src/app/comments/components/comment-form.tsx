'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommentSchema, type CommentFormValues } from '@/lib/validators/comment';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { createComment } from '../actions';
import { useRouter } from 'next/navigation';

export function CommentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      comment: '',
    },
  });

  async function onSubmit(data: CommentFormValues) {
    setIsSubmitting(true);

    try {
      // Create FormData object
      const formData = new FormData();
      formData.append('comment', data.comment);

      // Submit the form using server action
      const result = await createComment(formData);

      if (result.success) {
        // Show success toast
        toast({
          title: 'Comment added',
          description: 'Your comment has been added successfully.',
        });

        // Reset the form
        reset();

        // Refresh the page to show the new comment
        router.refresh();
      } else {
        // Show error toast
        toast({
          title: 'Error',
          description: result.error || 'Failed to add comment',
          variant: 'destructive',
        });
      }
    } catch (_error) {
      // Show error toast
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            {...register('comment')}
            placeholder="Write a comment"
            className="flex-grow"
            disabled={isSubmitting}
            aria-invalid={errors.comment ? 'true' : 'false'}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
        {errors.comment && (
          <p className="text-sm text-red-500">{errors.comment.message}</p>
        )}
      </div>
    </form>
  );
}
