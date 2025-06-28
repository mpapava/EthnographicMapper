import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { useLanguage } from '@/hooks/useLanguage';
import type { Region } from '@shared/schema';

interface RegionCardProps {
  region: Region;
}

export default function RegionCard({ region }: RegionCardProps) {
  const { language } = useLanguage();

  const getName = () => {
    switch (language) {
      case 'ka': return region.nameKa || region.name;
      case 'ru': return region.nameRu || region.name;
      default: return region.name;
    }
  };

  const getDescription = () => {
    switch (language) {
      case 'ka': return region.descriptionKa || region.description;
      case 'ru': return region.descriptionRu || region.description;
      default: return region.description;
    }
  };

  return (
    <Link href={`/regions/${region.slug}`}>
      <div className="group cursor-pointer">
        <Card className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform group-hover:scale-105">
          <img
            src={region.imageUrl}
            alt={getName()}
            className="w-full h-48 object-cover"
          />
          <CardContent className="p-6">
            <h3 className="text-2xl font-serif font-bold georgian-wine mb-2">
              {getName()}
            </h3>
            <p className="georgian-gray mb-4">
              {getDescription()}
            </p>
            <div className="flex items-center justify-between">
              <span className="georgian-terracotta font-semibold">
                {region.mainAttraction}
              </span>
              <ArrowRight className="h-5 w-5 georgian-wine group-hover:translate-x-1 transition-transform" />
            </div>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
}
