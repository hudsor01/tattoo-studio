'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Comments page error:', error);
  }, [error]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-700">Something went wrong!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">
            {error.message || 'An error occurred while loading the comments.'}
          </p>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button onClick={() => reset()} variant="outline">
            Try again
          </Button>
          <Button onClick={() => window.location.href = '/'} variant="ghost">
            Go to homepage
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
