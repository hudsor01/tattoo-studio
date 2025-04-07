import { ReactNode } from 'react'

export function Modal({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white p-4 rounded shadow-lg w-1/3'>
        <button className='absolute top-2 right-2' onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>
  )
}
