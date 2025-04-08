'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  role: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUsers() {
      setIsLoading(true)
      try {
        const response = await fetch('/api/users', {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include cookies for authentication
        })

        if (!response.ok) {
          throw new Error(`Error fetching users: ${response.status}`)
        }

        const data = await response.json()
        setUsers(data)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch users:', err)
        setError('Failed to load users. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className='text-2xl font-bold'>User Management</h1>
        <Button onClick={() => window.location.reload()}>Refresh</Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading users...</span>
        </div>
      ) : error ? (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md">
          {error}
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-12 border rounded-md">
          <p className="text-muted-foreground">No users found.</p>
        </div>
      ) : (
        <div>
          <div className="bg-card rounded-md shadow">
            <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
              <div>Name</div>
              <div>Email</div>
              <div>Role</div>
              <div>Actions</div>
            </div>
            {users.map((user) => (
              <div key={user.id} className="grid grid-cols-4 gap-4 p-4 border-b hover:bg-accent/10">
                <div className="font-medium">{user.name}</div>
                <div className="text-muted-foreground">{user.email}</div>
                <div>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    user.role === 'admin'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-secondary/20 text-secondary-foreground'
                  }`}>
                    {user.role}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm">Delete</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
