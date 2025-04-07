import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { CreditCard } from 'lucide-react'

export interface PaymentIconProps {
  type?: string // For backward compatibility
  name?: string // For backward compatibility
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function PaymentIcon({
  type,
  name,
  size = 'md',
  className,
  ...props
}: PaymentIconProps & { method?: string }) {
  // Allow 'method' prop to be passed to maintain compatibility with existing code
  const paymentType = props.method || type || name || 'credit-card'

  const dimensions = {
    sm: { width: 16, height: 16 },
    md: { width: 24, height: 24 },
    lg: { width: 32, height: 32 },
  }

  const { width, height } = dimensions[size]

  switch (paymentType) {
    case 'paypal':
      return (
        <Image
          src='/images/paypal-icon.svg'
          alt='PayPal'
          width={width}
          height={height}
          className={cn(className)}
        />
      )
    case 'cashapp':
      return (
        <Image
          src='/images/cashapp-icon.svg'
          alt='Cash App'
          width={width}
          height={height}
          className={cn(className)}
        />
      )
    case 'venmo':
      return (
        <Image
          src='/images/venmo-icon.svg'
          alt='Venmo'
          width={width}
          height={height}
          className={cn(className)}
        />
      )
    case 'credit-card':
    default:
      return <CreditCard className={cn(`h-${height} w-${width}`, className)} />
  }
}
