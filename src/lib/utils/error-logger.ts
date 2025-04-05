type ErrorSeverity = 'info' | 'warning' | 'error' | 'critical'

interface ErrorLogOptions {
  severity?: ErrorSeverity
  context?: Record<string, any>
  user?: string
}

/**
 * Enhanced error logging utility
 * @param error The error object
 * @param message Custom error message
 * @param options Additional logging options
 */
export function logError(
  error: unknown,
  message: string,
  options: ErrorLogOptions = {}
): void {
  const { severity = 'error', context = {}, user = 'anonymous' } = options
  
  // Create structured log entry
  const logEntry = {
    timestamp: new Date().toISOString(),
    message,
    severity,
    user,
    context,
    error: formatError(error),
  }
  
  // In production, you might want to send this to a logging service
  if (process.env.NODE_ENV === 'production') {
    // TODO: Send to external logging service like Sentry, LogRocket, etc.
    console.error(JSON.stringify(logEntry))
  } else {
    // In development, pretty print for readability
    console.error(`[${severity.toUpperCase()}] ${message}:`, error)
    if (Object.keys(context).length) {
      console.error('Context:', context)
    }
  }
}

/**
 * Format error object for consistent logging
 */
function formatError(error: unknown): Record<string, any> {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
      // Add additional properties for specific error types
      ...(error as any).code ? { code: (error as any).code } : {},
      ...(error as any).status ? { status: (error as any).status } : {},
    }
  }
  
  return { raw: String(error) }
}