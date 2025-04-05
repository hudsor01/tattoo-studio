import * as React from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    // Initial check - only runs once on mount
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Set initial value
    checkIfMobile()

    // Add event listener
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    mql.addEventListener('change', checkIfMobile)

    // Cleanup
    return () => mql.removeEventListener('change', checkIfMobile)
  }, []) // Empty dependency array ensures this only runs once on mount

  // Return false as default if running on server (isMobile is null)
  return isMobile === null ? false : isMobile
}
