import '@mantine/carousel/styles.css';

import { Suspense, lazy } from 'react';

import { Metadata } from 'next';

import LandingHeader from '@/components/templates/LandingHeader/LandingHeader';

export const metadata: Metadata = {
  title: 'Landing - Denise',
  description: 'Denise Beauty Center',
};

const LandingTodayAvailableSection = lazy(
  () => import('@/components/templates/LandingTodayAvailableSection/LandingTodayAvailableSection')
);
const WelcomeSection = lazy(() => import('@/components/templates/WelcomeSection/WelcomeSection'));
const LandingGallerySection = lazy(
  () => import('@/components/templates/LandingGallerySection/LandingGallerySection')
);
const LandingWorkingHours = lazy(
  () => import('@/components/templates/LandingWorkingHours/LandingWorkingHours')
);
const ReviewSection = lazy(() => import('@/components/templates/ReviewSection/ReviewSection'));
const BrandsSection = lazy(() => import('@/components/templates/BrandsSection/BrandsSection'));
const ShopDetailSection = lazy(
  () => import('@/components/templates/ShopDetailSection/ShopDetailSection')
);
const LandingStaffers = lazy(
  () => import('@/components/templates/LandingStaffers/LandingStaffers')
);

export interface HomePageProps {
  searchParams: {
    category?: string;
  };
}

// TODO: Get meta data for page
export default async function HomePage({ searchParams }: HomePageProps) {
  const { category } = searchParams;

  return (
    <>
      <LandingHeader imageUrl="/assets/images/header/header.jpg" />
      <Suspense>
        <LandingTodayAvailableSection categorySearchParam={category} />
      </Suspense>
      <Suspense>
        <WelcomeSection />
      </Suspense>
      <Suspense>
        <LandingGallerySection />
      </Suspense>
      <Suspense>
        <LandingWorkingHours />
      </Suspense>
      <Suspense>
        <ReviewSection />
      </Suspense>
      <Suspense>
        <BrandsSection />
      </Suspense>
      <Suspense>
        <ShopDetailSection usage="landing" />
      </Suspense>
      <Suspense>
        <LandingStaffers />
      </Suspense>
    </>
  );
}
