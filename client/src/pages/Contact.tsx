import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { getTranslation } from '@/lib/i18n';

export default function Contact() {
  const { language } = useLanguage();

  return (
    <>
      <Helmet>
        <title>Contact - Georgian Heritage</title>
        <meta name="description" content="Get in touch with Georgian Heritage to plan your cultural adventure and learn more about authentic Georgian experiences." />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="relative h-64 bg-gradient-to-r from-georgian-wine to-georgian-terracotta">
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              {getTranslation('nav.contact', language)}
            </h1>
            <p className="text-lg md:text-xl font-light">
              {language === 'ka' 
                ? 'დაგვიკავშირდით თქვენი კულტურული თავგადასავლის დასაგეგმად' 
                : language === 'ru' 
                ? 'Свяжитесь с нами, чтобы спланировать ваше культурное приключение'
                : 'Get in touch to plan your cultural adventure'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold georgian-wine mb-4">
              Get in Touch
            </h2>
            <p className="text-xl georgian-gray max-w-2xl mx-auto">
              We're here to help you discover the authentic beauty of Georgian culture and heritage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Address */}
            <div className="text-center p-6 bg-georgian-cream rounded-xl" data-testid="contact-address">
              <MapPin className="h-12 w-12 georgian-wine mx-auto mb-4" />
              <h3 className="text-lg font-serif font-bold georgian-wine mb-3">Address</h3>
              <p className="georgian-gray" data-testid="address-details">
                Rustaveli Avenue 12<br />
                Tbilisi 0108, Georgia
              </p>
            </div>

            {/* Phone */}
            <div className="text-center p-6 bg-georgian-cream rounded-xl" data-testid="contact-phone">
              <Phone className="h-12 w-12 georgian-wine mx-auto mb-4" />
              <h3 className="text-lg font-serif font-bold georgian-wine mb-3">Phone</h3>
              <p className="georgian-gray" data-testid="phone-numbers">
                +995 32 200 0000<br />
                +995 599 123 456
              </p>
            </div>

            {/* Email */}
            <div className="text-center p-6 bg-georgian-cream rounded-xl" data-testid="contact-email">
              <Mail className="h-12 w-12 georgian-wine mx-auto mb-4" />
              <h3 className="text-lg font-serif font-bold georgian-wine mb-3">Email</h3>
              <p className="georgian-gray" data-testid="email-addresses">
                info@georgianheritage.com<br />
                tours@georgianheritage.com
              </p>
            </div>

            {/* Hours */}
            <div className="text-center p-6 bg-georgian-cream rounded-xl" data-testid="contact-hours">
              <Clock className="h-12 w-12 georgian-wine mx-auto mb-4" />
              <h3 className="text-lg font-serif font-bold georgian-wine mb-3">Business Hours</h3>
              <p className="georgian-gray text-sm" data-testid="business-hours">
                Mon - Fri: 9:00 AM - 6:00 PM<br />
                Sat: 10:00 AM - 4:00 PM<br />
                Sun: Closed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-georgian-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold georgian-wine mb-4">
              Plan Your Journey
            </h2>
            <p className="text-xl georgian-gray max-w-3xl mx-auto">
              Ready to experience authentic Georgian culture? Get in touch with our local experts to plan your perfect cultural adventure.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />

            <div className="space-y-8">
              {/* Why Choose Us */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-serif font-bold georgian-wine mb-6">Why Choose Us?</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-georgian-wine rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold georgian-wine mb-1">Local Expertise</h4>
                      <p className="text-sm georgian-gray">Deep knowledge of Georgian culture and traditions from local experts.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-georgian-wine rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold georgian-wine mb-1">Authentic Experiences</h4>
                      <p className="text-sm georgian-gray">Genuine cultural immersion with local families and artisans.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-georgian-wine rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold georgian-wine mb-1">Personalized Service</h4>
                      <p className="text-sm georgian-gray">Customized tours and experiences tailored to your interests.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-georgian-wine rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold georgian-wine mb-1">Quality Guarantee</h4>
                      <p className="text-sm georgian-gray">Commitment to excellence in every aspect of your journey.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-serif font-bold georgian-wine mb-6">Follow Our Journey</h3>
                <p className="georgian-gray mb-6">
                  Stay connected with us on social media for the latest updates, stories, and behind-the-scenes content.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-georgian-wine hover:bg-georgian-wine/90 text-white p-3 rounded-lg transition-all flex items-center justify-center"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="bg-georgian-wine hover:bg-georgian-wine/90 text-white p-3 rounded-lg transition-all flex items-center justify-center"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="bg-georgian-wine hover:bg-georgian-wine/90 text-white p-3 rounded-lg transition-all flex items-center justify-center"
                    aria-label="YouTube"
                  >
                    <Youtube className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-serif font-bold georgian-wine mb-6">Visit Our Office</h3>
                <div className="bg-georgian-cream h-48 rounded-lg flex items-center justify-center">
                  <div className="text-center georgian-gray">
                    <MapPin className="h-12 w-12 mx-auto mb-2" />
                    <p>Interactive map will be available soon</p>
                    <p className="text-sm">Rustaveli Avenue 12, Tbilisi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold georgian-wine mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl georgian-gray">
              Here are answers to some common questions about our tours and services.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-georgian-cream rounded-xl p-6">
              <h3 className="text-lg font-serif font-bold georgian-wine mb-3">
                How far in advance should I book my tour?
              </h3>
              <p className="georgian-gray">
                We recommend booking at least 2-3 weeks in advance, especially during peak season (May-October). However, we can often accommodate last-minute requests based on availability.
              </p>
            </div>

            <div className="bg-georgian-cream rounded-xl p-6">
              <h3 className="text-lg font-serif font-bold georgian-wine mb-3">
                Do you provide transportation?
              </h3>
              <p className="georgian-gray">
                Yes, all our tours include comfortable transportation with experienced drivers. For custom tours, we can arrange various transportation options based on your preferences.
              </p>
            </div>

            <div className="bg-georgian-cream rounded-xl p-6">
              <h3 className="text-lg font-serif font-bold georgian-wine mb-3">
                Are meals included in the tours?
              </h3>
              <p className="georgian-gray">
                Most of our tours include traditional Georgian meals. Specific inclusions are listed in each tour description. We can accommodate dietary restrictions with advance notice.
              </p>
            </div>

            <div className="bg-georgian-cream rounded-xl p-6">
              <h3 className="text-lg font-serif font-bold georgian-wine mb-3">
                What languages do your guides speak?
              </h3>
              <p className="georgian-gray">
                Our guides are fluent in English, Georgian, and Russian. We can also arrange guides for other languages upon request.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
