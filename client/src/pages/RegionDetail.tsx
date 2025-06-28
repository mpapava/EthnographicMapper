import { useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TourCard from '@/components/TourCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, MapPin, Camera, Clock } from 'lucide-react';
import { Link } from 'wouter';
import { useLanguage } from '@/hooks/useLanguage';
import type { Region, Tour } from '@shared/schema';

export default function RegionDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();

  const { data: region, isLoading: regionLoading, error: regionError } = useQuery<Region>({
    queryKey: [`/api/regions/slug/${slug}`],
  });

  const { data: tours = [], isLoading: toursLoading } = useQuery<Tour[]>({
    queryKey: [`/api/tours?region=${region?.id}`],
    enabled: !!region?.id,
  });

  const getName = () => {
    if (!region) return '';
    switch (language) {
      case 'ka': return region.nameKa || region.name;
      case 'ru': return region.nameRu || region.name;
      default: return region.name;
    }
  };

  const getDescription = () => {
    if (!region) return '';
    switch (language) {
      case 'ka': return region.descriptionKa || region.description;
      case 'ru': return region.descriptionRu || region.description;
      default: return region.description;
    }
  };

  if (regionLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-georgian-cream">
          <div className="relative h-96">
            <Skeleton className="w-full h-full" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <Skeleton className="h-8 w-64 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-96 w-full rounded-xl" />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (regionError || !region) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-georgian-cream flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-serif font-bold georgian-wine mb-4">Region Not Found</h1>
            <p className="georgian-gray mb-6">The region you're looking for doesn't exist.</p>
            <Link href="/">
              <Button className="bg-georgian-wine hover:bg-georgian-wine/90 text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{getName()} - Georgian Heritage</title>
        <meta name="description" content={getDescription()} />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img
          src={region.imageUrl}
          alt={getName()}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
              {getName()}
            </h1>
            <p className="text-xl md:text-2xl font-light">
              {region.mainAttraction}
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="georgian-gray hover:georgian-wine transition-colors">
              Home
            </Link>
            <span className="georgian-gray">/</span>
            <Link href="/#regions" className="georgian-gray hover:georgian-wine transition-colors">
              Regions
            </Link>
            <span className="georgian-gray">/</span>
            <span className="georgian-wine font-medium">{getName()}</span>
          </div>
        </div>
      </div>

      {/* Region Details */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-serif font-bold georgian-wine mb-6">
                About {getName()}
              </h2>
              <p className="text-lg georgian-gray leading-relaxed mb-8">
                {getDescription()}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="text-center p-6 bg-georgian-cream rounded-xl">
                  <MapPin className="h-12 w-12 georgian-wine mx-auto mb-4" />
                  <h3 className="font-semibold georgian-wine mb-2">Location</h3>
                  <p className="text-sm georgian-gray">
                    {language === 'ka' ? 'საქართველო' : language === 'ru' ? 'Грузия' : 'Georgia'}
                  </p>
                </div>
                <div className="text-center p-6 bg-georgian-cream rounded-xl">
                  <Camera className="h-12 w-12 georgian-wine mx-auto mb-4" />
                  <h3 className="font-semibold georgian-wine mb-2">Main Attraction</h3>
                  <p className="text-sm georgian-gray">{region.mainAttraction}</p>
                </div>
                <div className="text-center p-6 bg-georgian-cream rounded-xl">
                  <Clock className="h-12 w-12 georgian-wine mx-auto mb-4" />
                  <h3 className="font-semibold georgian-wine mb-2">Best Time</h3>
                  <p className="text-sm georgian-gray">
                    {language === 'ka' ? 'მთელი წელი' : language === 'ru' ? 'Круглый год' : 'Year Round'}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-georgian-cream rounded-xl p-6">
                <h3 className="text-xl font-serif font-bold georgian-wine mb-4">
                  Quick Facts
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="georgian-gray">Region:</span>
                    <span className="georgian-wine font-medium">{getName()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="georgian-gray">Tours Available:</span>
                    <span className="georgian-wine font-medium">{tours.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="georgian-gray">Featured:</span>
                    <span className="georgian-wine font-medium">
                      {region.featured ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-georgian-wine text-white rounded-xl p-6">
                <h3 className="text-xl font-serif font-bold mb-4">
                  Plan Your Visit
                </h3>
                <p className="text-gray-300 mb-4">
                  Ready to explore {getName()}? Contact us to plan your perfect cultural adventure.
                </p>
                <Link href="/contact">
                  <Button className="w-full bg-white text-georgian-wine hover:bg-gray-100">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tours in this Region */}
      <section className="py-16 bg-georgian-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold georgian-wine mb-4">
              Tours in {getName()}
            </h2>
            <p className="text-xl georgian-gray max-w-2xl mx-auto">
              Discover authentic experiences and immerse yourself in the unique culture of this region.
            </p>
          </div>

          {toursLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-96 w-full rounded-xl" />
              ))}
            </div>
          ) : tours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl georgian-gray mb-6">
                No tours are currently available for this region.
              </p>
              <Link href="/tours">
                <Button className="bg-georgian-wine hover:bg-georgian-wine/90 text-white">
                  Browse All Tours
                </Button>
              </Link>
            </div>
          )}

          {tours.length > 0 && (
            <div className="text-center mt-12">
              <Link href="/tours">
                <Button className="bg-georgian-wine hover:bg-georgian-wine/90 text-white px-8 py-3 font-semibold">
                  View All Tours
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
