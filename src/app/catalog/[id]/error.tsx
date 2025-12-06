'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container min-h-[calc(100vh-20rem)] flex flex-col items-center justify-center text-center py-10">
      <h2 className="text-2xl font-semibold mb-4 font-headline">
        Something went wrong!
      </h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        {error.message ||
          'We had trouble loading the car details. Please try again or return to the catalog.'}
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()}>Try again</Button>
        <Button variant="outline" asChild>
          <Link href="/catalog">Back to Catalog</Link>
        </Button>
      </div>
    </div>
  );
}
