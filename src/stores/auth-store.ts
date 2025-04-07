import { create } from 'zustand'

interface AuthState {
  isAuthenticated: boolean
  checkAuth: () => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  checkAuth: async () => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        credentials: 'include', // Include cookies
      })

      if (response.ok) {
        set({ isAuthenticated: true })
      } else {
        set({ isAuthenticated: false })
      }
    } catch (error) {
      console.error('Authentication check failed:', error)
      set({ isAuthenticated: false })
    }
  },
  logout: async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies
      })
      set({ isAuthenticated: false })
    } catch (error) {
      console.error('Logout failed:', error)
    }
  },
}))
