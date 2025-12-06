import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden">
      <img
        src="/images/hero-car@1x.jpg"
        srcSet="/images/hero-car@1x.jpg 1x, /images/hero-car@2x.jpg 2x"
        alt="White sports car driving on the highway"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center p-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight animate-fade-in-up">
          Find your perfect rental car
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-2xl font-semibold animate-fade-in-up animation-delay-200">
          Reliable and budget-friendly rentals for any journey.
        </p>
        <Button
          asChild
          size="lg"
          className="mt-10 rounded-xl bg-primary hover:bg-primary-active px-12 py-3 text-base md:text-lg font-semibold animate-fade-in-up animation-delay-400"
        >
          <Link href="/catalog">View Catalog</Link>
        </Button>
      </div>
    </div>
  );
}
