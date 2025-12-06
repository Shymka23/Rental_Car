import axios from 'axios';
import type { Car } from './types';

const apiClient = axios.create({
  baseURL: 'https://car-rental-api.goit.global',
});

interface CarsListResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}

export const fetchCars = async ({
  page = 1,
  limit = 12,
  make: brand,
  rentalPrice,
  mileageFrom: minMileage,
  mileageTo: maxMileage,
}: {
  page?: number;
  limit?: number;
  make?: string;
  rentalPrice?: string;
  mileageFrom?: string;
  mileageTo?: string;
}): Promise<Car[]> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (brand) {
    params.append('brand', brand);
  }
  if (rentalPrice) {
    params.append('rentalPrice', rentalPrice);
  }
  if (minMileage) {
    params.append('minMileage', minMileage);
  }
  if (maxMileage) {
    params.append('maxMileage', maxMileage);
  }

  const response = await apiClient.get<CarsListResponse | Car[]>('/cars', {
    params,
  });

  if (Array.isArray(response.data)) {
    return response.data;
  }

  if (response.data && Array.isArray(response.data.cars)) {
    return response.data.cars;
  }

  return [];
};

export const fetchCarById = async (id: string): Promise<Car | null> => {
  try {
    const response = await apiClient.get<Car>(`/cars/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

export const fetchMakes = async (): Promise<string[]> => {
  const { data } = await apiClient.get<string[]>('/brands');
  return data;
};