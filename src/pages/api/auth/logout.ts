import { NextApiRequest, NextApiResponse } from 'next'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use DATABASE_URL as the connection string
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const token = req.cookies['auth-token']
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    await pool.query('DELETE FROM sessions WHERE token = $1', [token])

    // Clear the cookie
    res.setHeader('Set-Cookie', 'auth-token=; Path=/; HttpOnly; Secure; Max-Age=0')
    res.status(200).json({ message: 'Logged out successfully' })
  } catch (error) {
    console.error('Database error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
