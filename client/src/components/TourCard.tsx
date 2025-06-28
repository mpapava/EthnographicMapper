import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Utensils, Bed } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { getTranslation } from '@/lib/i18n';
import type { Tour } from '@shared/schema';

interface TourCardProps {
  tour: Tour;
}

export default function TourCard({ tour }: TourCardProps) {
  const { language } = useLanguage();

  const getTitle = () => {
    switch (language) {
      case 'ka': return tour.titleKa || tour.title;
      case 'ru': return tour.titleRu || tour.title;
      default: return tour.title;
    }
  };

  const getDescription = () => {
    switch (language) {
      case 'ka': return tour.descriptionKa || tour.description;
      case 'ru': return tour.descriptionRu || tour.description;
      default: return tour.description;
    }
  };

  const getIncludes = () => {
    switch (language) {
      case 'ka': return tour.includesKa || tour.includes;
      case 'ru': return tour.includesRu || tour.includes;
      default: return tour.includes;
    }
  };

  const getCategoryColor = () => {
    switch (tour.category) {
      case 'wine': return 'bg-georgian-gold/20 text-georgian-wine';
      case 'culinary': return 'bg-georgian-terracotta/20 text-georgian-wine';
      case 'cultural': return 'bg-blue-100 text-georgian-wine';
      case 'adventure': return 'bg-green-100 text-georgian-wine';
      default: return 'bg-georgian-gold/20 text-georgian-wine';
    }
  };

  const handleBookTour = () => {
    // TODO: Implement booking modal
    alert(`Booking system will be implemented for tour: ${tour.title}`);
  };

  return (
    <Card className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <img
        src={tour.imageUrl}
        alt={getTitle()}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Badge className={getCategoryColor()}>
            {tour.category.charAt(0).toUpperCase() + tour.category.slice(1)}
          </Badge>
          <span className="text-2xl font-bold georgian-wine">
            ${tour.price}
          </span>
        </div>
        
        <h3 className="text-2xl font-serif font-bold georgian-wine mb-3">
          {getTitle()}
        </h3>
        
        <p className="georgian-gray mb-4">
          {getDescription()}
        </p>
        
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-sm georgian-gray">
            <Clock className="mr-2 h-4 w-4 georgian-terracotta" />
            <span>{tour.duration}</span>
          </div>
          <div className="flex items-center text-sm georgian-gray">
            <Users className="mr-2 h-4 w-4 georgian-terracotta" />
            <span>Max {tour.maxPeople} people</span>
          </div>
          <div className="flex items-center text-sm georgian-gray">
            {tour.category === 'adventure' ? (
              <Bed className="mr-2 h-4 w-4 georgian-terracotta" />
            ) : (
              <Utensils className="mr-2 h-4 w-4 georgian-terracotta" />
            )}
            <span>{getIncludes()}</span>
          </div>
        </div>

        <Button
          onClick={handleBookTour}
          className="w-full bg-georgian-wine hover:bg-georgian-wine/90 text-white py-3 font-semibold"
        >
          {getTranslation('common.bookNow', language)}
        </Button>
      </CardContent>
    </Card>
  );
}
