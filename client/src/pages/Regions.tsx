import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/hooks/useLanguage";
import { getTranslation } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegionCard from "@/components/RegionCard";
import { Region } from "@shared/schema";

export default function Regions() {
  const { language } = useLanguage();
  const { data: regions, isLoading } = useQuery<Region[]>({
    queryKey: ["/api/regions"],
  });

  const pageTitle = getTranslation("regions_title", language);
  const pageDescription = getTranslation("regions_description", language);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <Helmet>
        <title>{pageTitle} | Georgian Heritage</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-amber-900 mb-6 font-playfair">
            {getTranslation("regions_hero_title", language)}
          </h1>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto font-inter">
            {getTranslation("regions_hero_subtitle", language)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regions?.map((region) => (
            <RegionCard key={region.id} region={region} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-amber-900 mb-6 font-playfair">
              {getTranslation("regions_about_title", language)}
            </h2>
            <p className="text-lg text-amber-700 leading-relaxed font-inter">
              {getTranslation("regions_about_content", language)}
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}