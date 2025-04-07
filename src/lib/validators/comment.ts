import { z } from 'zod';

export const CommentSchema = z.object({
  comment: z
    .string()
    .min(1, { message: 'Comment cannot be empty' })
    .max(500, { message: 'Comment must be less than 500 characters' })
    .trim(),
});

export type CommentFormValues = z.infer<typeof CommentSchema>;
