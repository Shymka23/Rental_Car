'use client';

import { useEffect, useState } from 'react';
import useFavoriteStore from '@/hooks/use-favorite-store';
import { fetchCarById } from '@/lib/api';
import type { Car } from '@/lib/types';
import { CarCard } from '@/app/components/car-card';
import { Loader } from '@/app/components/loader';
import Link from 'next/link';

export default function FavoritesPage() {
  const { favorites } = useFavoriteStore();
  const [favoriteCars, setFavoriteCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      setIsLoading(true);
      if (favorites.length > 0) {
        try {
          const carPromises = favorites.map((id) => fetchCarById(id));
          const cars = (await Promise.all(carPromises)).filter(
            (car): car is Car => car !== null
          );
          setFavoriteCars(cars);
        } catch {
          setFavoriteCars([]);
        }
      } else {
        setFavoriteCars([]);
      }
      setIsLoading(false);
    };

    loadFavorites();
  }, [favorites]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container py-8 px-32">
      <h1 className="text-3xl font-bold mb-8">Your Favorite Cars</h1>
      {favoriteCars.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
          {favoriteCars.map((car) => (
            <li key={car.id} className="flex justify-center w-full">
              <CarCard car={car} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-20">
          <p className="text-lg text-muted-foreground mb-4">
            You haven't added any cars to your favorites yet.
          </p>
          <Link href="/catalog" className="text-primary hover:underline">
            Browse our catalog
          </Link>
        </div>
      )}
    </div>
  );
}
