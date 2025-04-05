import kv from '@vercel/kv'

interface RateLimitConfig {
  limit: number
  duration: number // in seconds
  identifier: string
}

/**
 * Checks if a request is within rate limits
 * @param ip Client IP address
 * @param config Rate limiting configuration
 * @returns Boolean indicating if request is allowed
 */
export async function checkRateLimit(
  ip: string,
  config: RateLimitConfig
): Promise<boolean> {
  // Skip rate limiting if not in production or KV is not configured
  if (process.env.NODE_ENV !== 'production' || !process.env.KV_URL) {
    return true
  }

  try {
    const key = `ratelimit:${config.identifier}:${ip}`
    const count = await kv.incr(key)

    // Set expiration if this is the first request
    if (count === 1) {
      await kv.expire(key, config.duration)
    }

    // Check if under the limit
    return count <= config.limit
  } catch (error) {
    console.error(`Rate limiting error for ${config.identifier}:`, error)
    return true // Allow request if rate limiting fails
  }
}