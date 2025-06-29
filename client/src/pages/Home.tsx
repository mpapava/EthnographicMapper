import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import RegionCard from '@/components/RegionCard';
import TourCard from '@/components/TourCard';
import ProductCard from '@/components/ProductCard';
import BlogCard from '@/components/BlogCard';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/hooks/useLanguage';
import { getTranslation } from '@/lib/i18n';
import { Link } from 'wouter';
import { ChevronsRight, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';
import type { Region, Tour, Product, BlogPost } from '@shared/schema';

export default function Home() {
  const { language } = useLanguage();

  const { data: regions = [], isLoading: regionsLoading } = useQuery<Region[]>({
    queryKey: ['/api/regions'],
  });

  const { data: tours = [], isLoading: toursLoading } = useQuery<Tour[]>({
    queryKey: ['/api/tours'],
  });

  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const { data: blogPosts = [], isLoading: blogLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
  });

  const latestBlogPosts = blogPosts.slice(0, 3);

  // Carousel hooks
  const [regionsEmblaRef, regionsEmblaApi] = useEmblaCarousel({ loop: false, align: 'start' });
  const [toursEmblaRef, toursEmblaApi] = useEmblaCarousel({ loop: false, align: 'start' });
  const [productsEmblaRef, productsEmblaApi] = useEmblaCarousel({ loop: false, align: 'start' });

  const scrollRegionsPrev = useCallback(() => {
    if (regionsEmblaApi) regionsEmblaApi.scrollPrev();
  }, [regionsEmblaApi]);

  const scrollRegionsNext = useCallback(() => {
    if (regionsEmblaApi) regionsEmblaApi.scrollNext();
  }, [regionsEmblaApi]);

  const scrollToursPrev = useCallback(() => {
    if (toursEmblaApi) toursEmblaApi.scrollPrev();
  }, [toursEmblaApi]);

  const scrollToursNext = useCallback(() => {
    if (toursEmblaApi) toursEmblaApi.scrollNext();
  }, [toursEmblaApi]);

  const scrollProductsPrev = useCallback(() => {
    if (productsEmblaApi) productsEmblaApi.scrollPrev();
  }, [productsEmblaApi]);

  const scrollProductsNext = useCallback(() => {
    if (productsEmblaApi) productsEmblaApi.scrollNext();
  }, [productsEmblaApi]);

  const galleryImages = [
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"
  ];

  return (
    <>
      <Helmet>
        <title>Georgian Heritage - Discover Georgia's Ethnographic Regions</title>
        <meta name="description" content="Explore the authentic beauty and rich cultural heritage of Georgia's ethnographic regions through immersive experiences and traditional hospitality." />
      </Helmet>

      <Header />
      <HeroSection />

      {/* Regions Section */}
      <section id="regions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold georgian-wine mb-4">
                Ethnographic Regions of Georgia
              </h2>
              <p className="text-xl georgian-gray max-w-3xl">
                From the wine valleys of Kakheti to the mountain peaks of Svaneti, each region tells its own unique story through centuries of tradition, culture, and heritage.
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={scrollRegionsPrev}
                className="p-2 rounded-full bg-georgian-wine hover:bg-georgian-wine/90 text-white transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={scrollRegionsNext}
                className="p-2 rounded-full bg-georgian-wine hover:bg-georgian-wine/90 text-white transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {regionsLoading ? (
            <div className="flex space-x-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex-none w-80 space-y-3">
                  <Skeleton className="h-48 w-full rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-hidden" ref={regionsEmblaRef}>
              <div className="flex space-x-6">
                {regions.map((region) => (
                  <div key={region.id} className="flex-none w-80">
                    <RegionCard region={region} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-20 bg-georgian-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold georgian-wine mb-4">
              Visual Journey Through Georgia
            </h2>
            <p className="text-xl georgian-gray max-w-3xl mx-auto">
              Experience the breathtaking beauty and rich cultural heritage through our curated gallery of Georgian landscapes, architecture, and traditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {galleryImages.map((image, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg cursor-pointer">
                <img
                  src={image}
                  alt={`Georgian heritage ${index + 1}`}
                  className="w-full h-64 object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity" />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button className="bg-georgian-wine hover:bg-georgian-wine/90 text-white px-8 py-4 text-lg font-semibold mr-4">
              View Full Gallery
            </Button>
            <Button
              variant="outline"
              className="border-2 border-georgian-wine text-georgian-wine hover:bg-georgian-wine hover:text-white px-8 py-4 text-lg font-semibold"
            >
              <ChevronsRight className="mr-2 h-5 w-5" />
              360° Virtual Tour
            </Button>
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <section id="tours" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold georgian-wine mb-4">
                Authentic Georgian Experiences
              </h2>
              <p className="text-xl georgian-gray max-w-3xl">
                Join us for carefully crafted tours that immerse you in Georgia's rich cultural heritage, from wine tasting to traditional cooking classes.
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={scrollToursPrev}
                className="p-2 rounded-full bg-georgian-wine hover:bg-georgian-wine/90 text-white transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={scrollToursNext}
                className="p-2 rounded-full bg-georgian-wine hover:bg-georgian-wine/90 text-white transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {toursLoading ? (
            <div className="flex space-x-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex-none w-80 space-y-3">
                  <Skeleton className="h-48 w-full rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-hidden" ref={toursEmblaRef}>
              <div className="flex space-x-6">
                {tours.map((tour) => (
                  <div key={tour.id} className="flex-none w-80">
                    <TourCard tour={tour} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-center mt-12">
            <p className="georgian-gray mb-4">Looking for a custom experience?</p>
            <Link href="/tours">
              <Button
                variant="outline"
                className="border-2 border-georgian-wine text-georgian-wine hover:bg-georgian-wine hover:text-white px-8 py-3 font-semibold"
              >
                View All Tours
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Store Section */}
      <section id="store" className="py-20 bg-georgian-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold georgian-wine mb-4">
                Authentic Georgian Products
              </h2>
              <p className="text-xl georgian-gray max-w-3xl">
                Take home the taste and craftsmanship of Georgia with our curated selection of wines, artisanal crafts, and traditional delicacies.
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={scrollProductsPrev}
                className="p-2 rounded-full bg-georgian-wine hover:bg-georgian-wine/90 text-white transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={scrollProductsNext}
                className="p-2 rounded-full bg-georgian-wine hover:bg-georgian-wine/90 text-white transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {productsLoading ? (
            <div className="flex space-x-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex-none w-72 space-y-3">
                  <Skeleton className="h-48 w-full rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-hidden" ref={productsEmblaRef}>
              <div className="flex space-x-6">
                {products.map((product) => (
                  <div key={product.id} className="flex-none w-72">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/store">
              <Button className="bg-georgian-wine hover:bg-georgian-wine/90 text-white px-8 py-3 font-semibold">
                {getTranslation('common.viewAll', language)} Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold georgian-wine mb-4">
              Stories & Traditions
            </h2>
            <p className="text-xl georgian-gray max-w-3xl mx-auto">
              Dive deep into the rich tapestry of Georgian culture through stories, traditions, and insights from local experts and community members.
            </p>
          </div>

          {blogLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-48 w-full rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestBlogPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/blog">
              <Button className="bg-georgian-wine hover:bg-georgian-wine/90 text-white px-8 py-3 font-semibold">
                View All Stories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-georgian-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold georgian-wine mb-4">
              Plan Your Journey
            </h2>
            <p className="text-xl georgian-gray max-w-3xl mx-auto">
              Ready to experience authentic Georgian culture? Get in touch with our local experts to plan your perfect cultural adventure.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />

            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-serif font-bold georgian-wine mb-6">Get in Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <i className="fas fa-map-marker-alt georgian-terracotta text-xl mr-4 mt-1"></i>
                    <div>
                      <h4 className="font-semibold georgian-wine mb-1">Address</h4>
                      <p className="georgian-gray">
                        Rustaveli Avenue 12<br />
                        Tbilisi 0108, Georgia
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <i className="fas fa-phone georgian-terracotta text-xl mr-4 mt-1"></i>
                    <div>
                      <h4 className="font-semibold georgian-wine mb-1">Phone</h4>
                      <p className="georgian-gray">+995 32 200 0000</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <i className="fas fa-envelope georgian-terracotta text-xl mr-4 mt-1"></i>
                    <div>
                      <h4 className="font-semibold georgian-wine mb-1">Email</h4>
                      <p className="georgian-gray">info@georgianheritage.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <i className="fas fa-clock georgian-terracotta text-xl mr-4 mt-1"></i>
                    <div>
                      <h4 className="font-semibold georgian-wine mb-1">Business Hours</h4>
                      <p className="georgian-gray">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-serif font-bold georgian-wine mb-6">Follow Our Journey</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-georgian-wine hover:bg-georgian-wine/90 text-white p-3 rounded-lg transition-all">
                    <i className="fab fa-facebook-f text-lg"></i>
                  </a>
                  <a href="#" className="bg-georgian-wine hover:bg-georgian-wine/90 text-white p-3 rounded-lg transition-all">
                    <i className="fab fa-instagram text-lg"></i>
                  </a>
                  <a href="#" className="bg-georgian-wine hover:bg-georgian-wine/90 text-white p-3 rounded-lg transition-all">
                    <i className="fab fa-youtube text-lg"></i>
                  </a>
                  <a href="#" className="bg-georgian-wine hover:bg-georgian-wine/90 text-white p-3 rounded-lg transition-all">
                    <i className="fab fa-tripadvisor text-lg"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
