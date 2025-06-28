import { Link } from 'wouter';
import { useLanguage } from '@/hooks/useLanguage';
import { getTranslation } from '@/lib/i18n';

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="bg-georgian-wine text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-6">Georgian Heritage</h3>
            <p className="text-gray-300 mb-6">
              {getTranslation('footer.description', language)}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="fab fa-tripadvisor"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">{getTranslation('nav.regions', language)}</h4>
            <ul className="space-y-3 text-gray-300">
              <li><Link href="/regions/kakheti" className="hover:text-white transition-colors">Kakheti</Link></li>
              <li><Link href="/regions/svaneti" className="hover:text-white transition-colors">Svaneti</Link></li>
              <li><Link href="/regions/samegrelo" className="hover:text-white transition-colors">Samegrelo</Link></li>
              <li><Link href="/regions/imereti" className="hover:text-white transition-colors">Imereti</Link></li>
              <li><Link href="/regions/racha" className="hover:text-white transition-colors">Racha</Link></li>
              <li><Link href="/regions/javakheti" className="hover:text-white transition-colors">Javakheti</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Experiences</h4>
            <ul className="space-y-3 text-gray-300">
              <li><Link href="/tours" className="hover:text-white transition-colors">Wine Tours</Link></li>
              <li><Link href="/tours" className="hover:text-white transition-colors">Culinary Classes</Link></li>
              <li><Link href="/tours" className="hover:text-white transition-colors">Cultural Tours</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Virtual Tours</a></li>
              <li><Link href="/store" className="hover:text-white transition-colors">Online Store</Link></li>
              <li><Link href="/tours" className="hover:text-white transition-colors">Custom Tours</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Team</a></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">{getTranslation('nav.blog', language)}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">{getTranslation('nav.contact', language)}</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-red-800 mt-12 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 Georgian Heritage. All rights reserved. | Crafted with love for Georgian culture.
          </p>
        </div>
      </div>
    </footer>
  );
}
