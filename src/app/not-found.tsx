'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center gap-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">404</h1>
        <p className="text-xl font-semibold text-foreground">
          Page not found
        </p>
        <p className="max-w-md text-muted-foreground">
          The page you are looking for doesn&apos;t exist or has been moved. Check the URL
          or return to the catalog to continue browsing cars.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button asChild className="rounded-xl px-8">
          <Link href="/catalog">Go to catalog</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-xl px-8">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}


