import { NextApiRequest, NextApiResponse } from 'next'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL, // Ensure this is set in your .env file
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Check if token is in cookies first
  const cookieToken = req.cookies['auth-token']
  if (cookieToken === 'authenticated') {
    return res.status(200).json({ authenticated: true })
  }

  // Otherwise, check authorization header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const result = await pool.query(
      'SELECT * FROM sessions WHERE token = $1 AND expires_at > NOW()',
      [token]
    )

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid or expired token' })
    }

    res.status(200).json({ message: 'Token is valid' })
  } catch (error) {
    console.error('Database error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
