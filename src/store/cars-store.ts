'use client';

import { create } from 'zustand';

import type { Car } from '@/lib/types';
import { fetchCars, fetchMakes } from '@/lib/api';
import type { FilterValues } from '@/app/components/car-filter';

const PAGE_LIMIT = 12;

type CarsState = {
  cars: Car[];
  makes: string[];
  page: number;
  hasMore: boolean;
  filters: FilterValues;
  isLoading: boolean;
  error: string | null;
  init: () => Promise<void>;
  applyFilters: (filters: FilterValues) => Promise<void>;
  loadMore: () => Promise<void>;
};

export const useCarsStore = create<CarsState>((set, get) => ({
  cars: [],
  makes: [],
  page: 1,
  hasMore: true,
  filters: {},
  isLoading: false,
  error: null,

  async init() {
    const { cars, makes, isLoading } = get();
    if ((cars.length > 0 || makes.length > 0) && !isLoading) {
      return;
    }

    set({ isLoading: true, error: null, page: 1, filters: {}, cars: [] });

    try {
      const [initialCars, initialMakes] = await Promise.all([
        fetchCars({ page: 1, limit: PAGE_LIMIT }),
        fetchMakes(),
      ]);

      set({
        cars: initialCars,
        makes: initialMakes,
        page: 1,
        hasMore: initialCars.length === PAGE_LIMIT,
        isLoading: false,
      });
    } catch (error) {
      set({
        cars: [],
        hasMore: false,
        isLoading: false,
        error: 'Не вдалося завантажити автомобілі. Спробуйте пізніше.',
      });
    }
  },

  async applyFilters(newFilters) {
    set({
      isLoading: true,
      error: null,
      filters: newFilters,
      page: 1,
      cars: [],
      hasMore: true,
    });

    try {
      const filteredCars = await fetchCars({
        page: 1,
        limit: PAGE_LIMIT,
        ...newFilters,
      });

      set({
        cars: filteredCars,
        page: 1,
        hasMore: filteredCars.length === PAGE_LIMIT,
        isLoading: false,
      });
    } catch {
      set({
        cars: [],
        hasMore: false,
        isLoading: false,
        error: 'Не вдалося застосувати фільтри. Спробуйте ще раз.',
      });
    }
  },

  async loadMore() {
    const { page, hasMore, isLoading, filters, cars } = get();
    if (!hasMore || isLoading) {
      return;
    }

    const nextPage = page + 1;

    set({ isLoading: true, error: null });

    try {
      const newCars = await fetchCars({
        page: nextPage,
        limit: PAGE_LIMIT,
        ...filters,
      });

      set({
        cars: [...cars, ...newCars],
        page: nextPage,
        hasMore: newCars.length === PAGE_LIMIT,
        isLoading: false,
      });
    } catch {
      set({
        isLoading: false,
        error: 'Не вдалося завантажити додаткові автомобілі.',
      });
    }
  },
}));


