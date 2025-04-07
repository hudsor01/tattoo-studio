import { useState } from 'react'
import { Button } from '@/components/ui/button'
import axios from 'axios'

interface UserFormProps {
  user?: { id: string; name: string; email: string; role: string }
  onClose: () => void
  onUserUpdated: () => void
}

export function UserForm({ user, onClose, onUserUpdated }: UserFormProps) {
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [role, setRole] = useState(user?.role || '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (user) {
        await axios.put(`/api/admin/users/${user.id}`, { name, email, role })
      } else {
        await axios.post('/api/admin/users', { name, email, role })
      }
      onUserUpdated()
      onClose()
    } catch (error) {
      console.error('Failed to save user:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-4'>
        <label className='block text-sm font-medium'>Name</label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full border border-gray-300 rounded p-2'
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-medium'>Email</label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full border border-gray-300 rounded p-2'
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-medium'>Role</label>
        <input
          type='text'
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className='w-full border border-gray-300 rounded p-2'
          required
        />
      </div>
      <div className='flex justify-end'>
        <Button type='submit'>{user ? 'Update' : 'Add'} User</Button>
      </div>
    </form>
  )
}
