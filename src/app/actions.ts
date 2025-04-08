'use server';

import { revalidatePath } from 'next/cache';
import { addComment, deleteComment } from '@/lib/neon';
import { CommentSchema } from '@/lib/validators/comment';

/**
 * Server action to add a new comment
 */
export async function createComment(formData: FormData) {
  try {
    // Extract and validate the comment
    const comment = formData.get('comment');

    // Validate with Zod
    const result = CommentSchema.safeParse({ comment });

    if (!result.success) {
      return {
        success: false,
        error: result.error.flatten().fieldErrors.comment?.[0] || 'Invalid comment',
      };
    }

    // Add the comment to the database
    const newComment = await addComment(result.data.comment);

    // Revalidate the comments page to show the new comment
    revalidatePath('/comments');

    return {
      success: true,
      comment: newComment,
    };
  } catch (error) {
    console.error('Error creating comment:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create comment',
    };
  }
}

/**
 * Server action to delete a comment
 */
export async function removeComment(formData: FormData) {
  try {
    const id = formData.get('id');

    if (!id || typeof id !== 'string') {
      return {
        success: false,
        error: 'Invalid comment ID',
      };
    }

    const commentId = parseInt(id, 10);

    if (isNaN(commentId)) {
      return {
        success: false,
        error: 'Comment ID must be a number',
      };
    }

    // Delete the comment
    await deleteComment(commentId);

    // Revalidate the comments page
    revalidatePath('/comments');

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error deleting comment:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete comment',
    };
  }
}
