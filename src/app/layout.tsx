import type { Metadata } from 'next'
import { Inter, Pacifico, Bebas_Neue } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { cn } from '@/lib/utils'
import { Navbar } from '@/components/layout/navbar'
import { Toaster } from '@/components/ui/toaster' // Import the Toaster component

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pacifico',
  display: 'swap',
})
const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Fernando Govea Tattoo Studio',
  description: 'Custom tattoo artistry with precision and passion',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn(`${inter.variable} ${pacifico.variable} ${bebasNeue.variable} font-sans`, inter.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Navbar />
          {children}
          <Toaster /> {/* Add the Toaster component */}
        </ThemeProvider>
      </body>
    </html>
  )
}
