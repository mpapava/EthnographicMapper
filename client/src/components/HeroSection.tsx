import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { getTranslation } from '@/lib/i18n';
import { Play } from 'lucide-react';

export default function HeroSection() {
  const { language } = useLanguage();

  const handleStartExploring = () => {
    document.getElementById('regions')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWatchVideo = () => {
    // TODO: Implement virtual tour modal
    alert('Virtual tour feature will be implemented with 360° panoramic views');
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')`
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6">
          {getTranslation('hero.title', language)}
          <br />
          <span className="georgian-gold">{language === 'ka' ? 'მემკვიდრეობა' : language === 'ru' ? 'Наследие' : 'Heritage'}</span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 font-light max-w-3xl mx-auto">
          {getTranslation('hero.subtitle', language)}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleStartExploring}
            className="bg-georgian-wine hover:bg-georgian-wine/90 text-white px-8 py-4 text-lg font-semibold"
            size="lg"
          >
            {getTranslation('hero.cta.explore', language)}
          </Button>
          <Button
            onClick={handleWatchVideo}
            variant="outline"
            className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold backdrop-blur-sm"
            size="lg"
          >
            <Play className="mr-2 h-5 w-5" />
            {getTranslation('hero.cta.video', language)}
          </Button>
        </div>
      </div>
    </section>
  );
}
