import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TourCard from '@/components/TourCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import type { Tour, Region } from '@shared/schema';

export default function Tours() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const { data: allTours = [], isLoading: toursLoading } = useQuery<Tour[]>({
    queryKey: ['/api/tours'],
  });

  const { data: regions = [] } = useQuery<Region[]>({
    queryKey: ['/api/regions'],
  });

  // Filter tours based on search and filters
  const filteredTours = allTours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tour.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tour.category === selectedCategory;
    const matchesRegion = selectedRegion === 'all' || tour.regionId?.toString() === selectedRegion;
    
    return matchesSearch && matchesCategory && matchesRegion;
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'wine', label: 'Wine Experience' },
    { value: 'culinary', label: 'Culinary' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'adventure', label: 'Adventure' }
  ];

  const getRegionName = (region: Region) => {
    switch (language) {
      case 'ka': return region.nameKa || region.name;
      case 'ru': return region.nameRu || region.name;
      default: return region.name;
    }
  };

  return (
    <>
      <Helmet>
        <title>Tours - Georgian Heritage</title>
        <meta name="description" content="Explore authentic Georgian tours and experiences. From wine tasting to culinary classes and cultural heritage tours." />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="relative h-64 bg-gradient-to-r from-georgian-wine to-georgian-terracotta">
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              {language === 'ka' ? 'ტურები' : language === 'ru' ? 'Туры' : 'Tours & Experiences'}
            </h1>
            <p className="text-lg md:text-xl font-light">
              {language === 'ka' 
                ? 'აღმოაჩინეთ ავთენტური ქართული გამოცდილებები' 
                : language === 'ru' 
                ? 'Откройте для себя аутентичные грузинские впечатления'
                : 'Discover Authentic Georgian Experiences'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search tours..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {regions.map(region => (
                    <SelectItem key={region.id} value={region.id.toString()}>
                      {getRegionName(region)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            {selectedCategory !== 'all' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCategory('all')}
                className="georgian-wine"
              >
                {categories.find(c => c.value === selectedCategory)?.label} ×
              </Button>
            )}
            {selectedRegion !== 'all' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedRegion('all')}
                className="georgian-wine"
              >
                {getRegionName(regions.find(r => r.id.toString() === selectedRegion)!)} ×
              </Button>
            )}
            {searchQuery && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSearchQuery('')}
                className="georgian-wine"
              >
                "{searchQuery}" ×
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16 bg-georgian-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-serif font-bold georgian-wine">
              {filteredTours.length} {filteredTours.length === 1 ? 'Tour' : 'Tours'} Found
            </h2>
          </div>

          {toursLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-48 w-full rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredTours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-serif font-bold georgian-wine mb-4">No Tours Found</h3>
                <p className="georgian-gray mb-6">
                  We couldn't find any tours matching your criteria. Try adjusting your filters or search terms.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedRegion('all');
                  }}
                  className="bg-georgian-wine hover:bg-georgian-wine/90 text-white"
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Custom Tour CTA */}
      <section className="py-16 bg-georgian-wine text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Looking for Something Unique?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            We can create a custom tour experience tailored to your interests and preferences.
          </p>
          <Button
            className="bg-white text-georgian-wine hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
            onClick={() => window.location.href = '/contact'}
          >
            Plan Custom Tour
          </Button>
        </div>
      </section>

      <Footer />
    </>
  );
}
