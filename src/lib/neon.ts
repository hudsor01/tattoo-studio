import { neon } from '@neondatabase/serverless';

// Singleton pattern to avoid creating multiple connections
let sql: ReturnType<typeof neon> | null = null;

/**
 * Creates or returns a Neon SQL client
 * Using a singleton pattern to reuse connections when possible
 */
export function getNeonClient() {
  if (!sql) {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      throw new Error('DATABASE_URL is not set');
    }
    sql = neon(dbUrl);
  }
  return sql;
}

/**
 * Creates necessary tables if they don't exist
 * Call this on app initialization or first request
 */
export async function initDatabase() {
  const sql = getNeonClient();

  // Comments table
  await sql`
    CREATE TABLE IF NOT EXISTS comments (
      id SERIAL PRIMARY KEY,
      comment TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // Posts table
  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // Contact submissions table
  await sql`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      message TEXT NOT NULL,
      files TEXT[],
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;

  console.warn('Database tables initialized');
}

/**
 * Example queries for common operations
 */

/**
 * Get paginated comments with total count
 * @param page Page number (1-based)
 * @param limit Number of comments per page
 * @returns Object containing comments array and total count
 */
export async function getComments(page = 1, limit = 10) {
  try {
    const sql = getNeonClient();
    const offset = (page - 1) * limit;

    // Get comments with pagination
    const comments = await sql`
      SELECT * FROM comments
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;

    // Get total count for pagination
    const result = await sql`
      SELECT COUNT(*) as count FROM comments
    `;
    const countResult = (result as { count: string }[])[0];
    if (!countResult) {
      throw new Error('Failed to retrieve count from comments table');
    }
    const count = countResult.count;

    return {
      comments,
      totalCount: parseInt(count),
      page,
      limit,
      totalPages: Math.ceil(parseInt(count) / limit)
    };
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw new Error('Failed to fetch comments');
  }
}

/**
 * Get all comments (use with caution for large datasets)
 * @returns Array of all comments
 */
export async function getAllComments() {
  try {
    const sql = getNeonClient();
    return await sql`SELECT * FROM comments ORDER BY created_at DESC`;
  } catch (error) {
    console.error('Error fetching all comments:', error);
    throw new Error('Failed to fetch all comments');
  }
}

/**
 * Add a new comment
 * @param comment Comment text
 * @returns The newly created comment
 */
export async function addComment(comment: string) {
  try {
    const sql = getNeonClient();
    const result = await sql`
      INSERT INTO comments (comment)
      VALUES (${comment})
      RETURNING *
    ` as { id: number; comment: string; created_at: Date }[];
    const newComment = result[0];
    return newComment;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw new Error('Failed to add comment');
  }
}

/**
 * Delete a comment by ID
 * @param id Comment ID
 * @returns The deleted comment
 */
export async function deleteComment(id: number) {
  try {
    const sql = getNeonClient();
    const result = await sql`
      DELETE FROM comments
      WHERE id = ${id}
      RETURNING *
    ` as { id: number; comment: string; created_at: Date }[];
    const deletedComment = result[0];

    if (!deletedComment) {
      throw new Error(`Comment with ID ${id} not found`);
    }

    return deletedComment;
  } catch (error) {
    console.error(`Error deleting comment ${id}:`, error);
    throw new Error('Failed to delete comment');
  }
}

export async function saveContactSubmission(data: {
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  files: string[];
}) {
  const sql = getNeonClient();

  return await sql`
    INSERT INTO contact_submissions (name, email, phone, message, files)
    VALUES (
      ${data.name},
      ${data.email},
      ${data.phone || null},
      ${data.message},
      ${data.files}
    )
    RETURNING *
  `;
}

export async function getContactSubmissions() {
  const sql = getNeonClient();
  return await sql`SELECT * FROM contact_submissions ORDER BY created_at DESC`;
}
