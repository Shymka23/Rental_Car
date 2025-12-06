import { fetchCarById } from '@/lib/api';
import { CarDetailClient } from '@/app/components/car-detail-client';
import { notFound } from 'next/navigation';

type CarDetailPageProps = {
  params?: Promise<Record<string, string | string[] | undefined>>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const resolvedParams = (params && (await params)) ?? {};
  const idValue = resolvedParams.id;

  if (typeof idValue !== 'string') {
    notFound();
  }

  const car = await fetchCarById(idValue);

  if (!car) {
    notFound();
  }

  return (
    <div className="container py-8 lg:py-12 px-4 sm:px-8">
      <CarDetailClient car={car} />
    </div>
  );
}
