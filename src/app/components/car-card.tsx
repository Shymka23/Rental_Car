'use client';

import type { Car } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { cn, formatMileage } from '@/lib/utils';
import useFavoriteStore from '@/hooks/use-favorite-store';

function getShortAddress(address: string) {
  const parts = address.split(', ');
  return {
    city: parts.length > 1 ? parts[1] : '',
    country: parts.length > 2 ? parts[2] : '',
  };
}

const InfoSeparator = () => (
  <div className="w-0 h-4 outline outline-1 outline-offset-[-0.50px] outline-gray-300/50" />
);

export function CarCard({ car }: { car: Car }) {
  const { city, country } = getShortAddress(car.address);
  const { favorites, toggleFavorite } = useFavoriteStore();
  const isFavorite = favorites.includes(car.id);
  const formattedMileage = formatMileage(car.mileage);
  const numericRentalPrice = Number.parseInt(
    car.rentalPrice.replace(/\D/g, ''),
    10,
  );
  const formattedRentalPrice = Number.isNaN(numericRentalPrice)
    ? car.rentalPrice
    : `${numericRentalPrice}$`;

  return (
    <div className="flex flex-col h-full w-full max-w-[274px] transition-transform duration-300 ease-in-out hover:scale-105">
      <Link
        href={`/catalog/${car.id}`}
        className="block relative w-full h-[268px] rounded-14 overflow-hidden mb-3.5"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(18,20,23,0.5)] to-[rgba(18,20,23,0)] z-10" />
        <img
          src={car.img || `https://picsum.photos/seed/${car.id}/400/300`}
          alt={`${car.brand} ${car.model}`}
          className="h-full w-full object-cover"
          data-ai-hint={`car ${car.brand}`}
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3.5 right-3.5 z-20 bg-transparent hover:bg-transparent"
          onClick={(event) => {
            event.preventDefault();
            toggleFavorite(car.id);
          }}
        >
          <Heart
            className={cn(
              'w-5 h-5 text-white/80 transition-all',
              isFavorite && 'text-primary fill-primary',
            )}
          />
        </Button>
      </Link>

      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-base truncate text-foreground">
          {car.brand} <span className="text-primary">{car.model}</span>, {car.year}
        </h3>
        <p className="font-medium text-base text-foreground">
          {formattedRentalPrice}
        </p>
      </div>

      <div className="text-xs text-muted-alt/70 space-y-1 mb-7">
        <div className="flex items-center gap-1.5 truncate">
          <span>{city}</span>
          <InfoSeparator />
          <span>{country}</span>
          <InfoSeparator />
          <span className="truncate">{car.rentalCompany}</span>
        </div>
        <div className="flex items-center gap-1.5 truncate">
          <span>{car.type}</span>
          <InfoSeparator />
          <span>{formattedMileage} km</span>
          <InfoSeparator />
          <span className="truncate">{car.fuelConsumption}</span>
        </div>
      </div>

      <Button
        asChild
        className="mt-auto w-full bg-primary hover:bg-primary-active rounded-xl py-3 text-base font-semibold"
      >
        <Link href={`/catalog/${car.id}`}>Read more</Link>
      </Button>
    </div>
  );
}

