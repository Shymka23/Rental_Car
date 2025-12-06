'use client';

import { useEffect } from 'react';
import { CarCard } from '@/app/components/car-card';
import { CarFilter, type FilterValues } from '@/app/components/car-filter';
import { Button } from '@/components/ui/button';
import { Loader } from '@/app/components/loader';
import { useCarsStore } from '@/store/cars-store';

export default function CatalogPage() {
  const { cars, makes, hasMore, isLoading, error, init, applyFilters, loadMore } =
    useCarsStore((state) => ({
      cars: state.cars,
      makes: state.makes,
      hasMore: state.hasMore,
      isLoading: state.isLoading,
      error: state.error,
      init: state.init,
      applyFilters: state.applyFilters,
      loadMore: state.loadMore,
    }));

  useEffect(() => {
    void init();
  }, [init]);

  const handleFilter = (newFilters: FilterValues) => {
    void applyFilters(newFilters);
  };

  const handleLoadMore = () => {
    void loadMore();
  };

  const hasCars = cars.length > 0;

  return (
    <div className="container py-8 px-4 sm:px-8 md:px-16 lg:px-32">
      <CarFilter makes={makes} onFilter={handleFilter} />

      {isLoading && !hasCars ? (
        <Loader />
      ) : hasCars ? (
        <>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-7 gap-y-12 mt-12 justify-items-center">
            {cars.map((car) => (
              <li key={car.id} className="flex justify-center w-full">
                <CarCard car={car} />
              </li>
            ))}
          </ul>
          {hasMore && (
            <div className="text-center mt-24">
              <Button
                onClick={handleLoadMore}
                variant="outline"
                className="text-foreground hover:text-primary-foreground font-semibold text-base rounded-xl py-3 w-40"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Load more'}
              </Button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center mt-12 text-muted-foreground text-lg">
          {error ?? 'No cars found matching your criteria.'}
        </p>
      )}
    </div>
  );
}

