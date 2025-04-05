'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-tattoo-black group-[.toaster]:text-tattoo-white group-[.toaster]:border-tattoo-white/10 group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-tattoo-white/80',
          actionButton: 'group-[.toast]:bg-tattoo-red group-[.toast]:text-white',
          cancelButton: 'group-[.toast]:bg-tattoo-black group-[.toast]:text-tattoo-white/80',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
