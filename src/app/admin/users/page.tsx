'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'
import { Modal } from '@/components/ui/modal'
import { useAuthStore } from '@/stores/auth-store'
import axios from 'axios'

interface User {
  id: string
  name: string
  email: string
  role: string
}

export default function UsersPage() {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>User Management</h1>
      <p>Manage users here. Add, edit, or delete users as needed.</p>
    </div>
  )
}
