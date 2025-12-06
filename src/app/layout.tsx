import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/app/components/header';
import { Toaster } from '@/components/ui/toaster';
import { Manrope } from 'next/font/google';

export const metadata: Metadata = {
  title: 'RentalCar',
  description:
    'RentalCar is a modern car rental service that helps you find the perfect vehicle for any trip.',
  metadataBase:
    typeof window === 'undefined'
      ? new URL('https://rental-car.example.com')
      : undefined,
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'RentalCar – Find your perfect rental car',
    description:
      'Browse a curated catalog of rental cars, filter by brand, price and mileage, and book your next ride in a few clicks.',
    url: 'https://rental-car.example.com',
    siteName: 'RentalCar',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${manrope.variable}`}>
      <body className="font-body antialiased bg-background">
        <Header />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
