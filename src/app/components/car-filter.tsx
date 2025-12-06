'use client';

import { useState, type ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { formatMileage } from '@/lib/utils';

export type FilterValues = {
  make?: string;
  rentalPrice?: string;
  mileageFrom?: string;
  mileageTo?: string;
};

type CarFilterProps = {
  makes: string[];
  onFilter: (filters: FilterValues) => void;
};

const prices = Array.from({ length: 48 }, (_, index) => 30 + index * 10);

export function CarFilter({ makes, onFilter }: CarFilterProps) {
  const [make, setMake] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');
  const [mileageFrom, setMileageFrom] = useState('');
  const [mileageTo, setMileageTo] = useState('');

  const handleSearch = () => {
    onFilter({
      make: make === 'all' ? '' : make,
      rentalPrice: rentalPrice === 'all' ? '' : rentalPrice.replace('$', ''),
      mileageFrom: mileageFrom.replace(/\s/g, ''),
      mileageTo: mileageTo.replace(/\s/g, ''),
    });
  };

  const handleMileageFromChange = (event: ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value.replace(/\D/g, '');
    setMileageFrom(digits ? formatMileage(digits) : '');
  };

  const handleMileageToChange = (event: ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value.replace(/\D/g, '');
    setMileageTo(digits ? formatMileage(digits) : '');
  };

  return (
    <div className="flex flex-wrap items-end justify-center gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="make" className="text-sm font-medium text-muted-alt">
          Car brand
        </Label>
        <Select value={make} onValueChange={setMake}>
          <SelectTrigger
            id="make"
            className="bg-secondary rounded-xl w-full sm:w-[224px] h-12 text-base font-medium"
          >
            <SelectValue placeholder="Enter the text" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            {makes.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="price" className="text-sm font-medium text-muted-alt">
          Price/ 1 hour
        </Label>
        <Select value={rentalPrice} onValueChange={setRentalPrice}>
          <SelectTrigger
            id="price"
            className="bg-secondary rounded-xl w-full sm:w-[125px] h-12 text-base font-medium"
          >
            <SelectValue placeholder="To $" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {prices.map((price) => (
              <SelectItem key={price} value={String(price)}>
                {`${price}$`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium text-muted-alt">
          Car mileage / km
        </Label>
        <div className="flex h-12">
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-alt">
              From
            </span>
            <Input
              type="text"
              value={mileageFrom}
              onChange={handleMileageFromChange}
              className="w-full sm:w-40 bg-secondary rounded-l-xl rounded-r-none border-r border-border/50 pl-12 text-base h-full"
            />
          </div>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-alt">
              To
            </span>
            <Input
              type="text"
              value={mileageTo}
              onChange={handleMileageToChange}
              className="w-full sm:w-40 bg-secondary rounded-r-xl rounded-l-none pl-12 text-base h-full"
            />
          </div>
        </div>
      </div>

      <Button
        onClick={handleSearch}
        className="bg-primary hover:bg-primary-active h-12 px-11 rounded-xl font-semibold w-full sm:w-auto"
      >
        Search
      </Button>
    </div>
  );
}

