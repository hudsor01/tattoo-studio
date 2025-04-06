'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export const metadata: Metadata = {
  title: 'Login | Tattoo Studio Admin',
  description: 'Admin login portal for Tattoo Studio',
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/admin'

  // Check if already logged in
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('admin-authenticated') === 'true'
    if (isAuthenticated) {
      router.push('/admin')
    }
  }, [router])

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // For this demo, we're using a simple authentication mechanism
  // In a real app, you'd use a proper auth system like NextAuth.js
  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true)

    try {
      // Add a slight delay to simulate server request
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Check against hardcoded credentials (in a real app, this would be a server API call)
      if (values.email === 'fennyg83@gmail.com' && values.password === 'godmode') {
        // Set authenticated in localStorage (this is NOT secure for real applications)
        localStorage.setItem('admin-authenticated', 'true')

        toast.success('Login successful!')
        router.push(redirectTo)
      } else {
        toast.error('Invalid email or password')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="fernando@ink37.com"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Log in"
                )}
              </Button>
            </form>
          </Form>

          {/* For demo purposes */}
          <div className="mt-4 p-3 bg-muted rounded text-sm">
            <p className="font-medium">Demo credentials:</p>
            <p className="text-muted-foreground">Email: fennyg83@gmail.com</p>
            <p className="text-muted-foreground">Password: godmode</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6">
          <Link href="/" className="text-sm text-center text-muted-foreground hover:text-primary">
            Return to website
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
