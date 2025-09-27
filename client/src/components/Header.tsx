import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ShoppingCart, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FlagLanguageSelector from '@/components/FlagLanguageSelector';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
import { getTranslation, Language } from '@/lib/i18n';
import { useQuery } from '@tanstack/react-query';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const { language, setLanguage } = useLanguage();
  const { user, isAuthenticated, isLoading } = useAuth();

  // Cart items count
  const { data: cartItems = [] } = useQuery({
    queryKey: ['/api/cart'],
    refetchInterval: 5000, // Refresh cart every 5 seconds
  });

  const cartCount = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);

  const navigation = [
    { href: '/', key: 'nav.home' },
    { href: '/regions', key: 'nav.regions' },
    { href: '/tours', key: 'nav.tours' },
    { href: '/store', key: 'nav.store' },
    { href: '/blog', key: 'nav.blog' },
    { href: '/contact', key: 'nav.contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location === '/';
    return location.startsWith(href);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-2xl font-serif font-bold georgian-wine cursor-pointer">
                  Georgian Heritage
                </h1>
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map(({ href, key }) => (
                <Link
                  key={href}
                  href={href}
                  className={`font-medium transition-colors ${
                    isActive(href)
                      ? 'georgian-wine'
                      : 'georgian-gray hover:georgian-wine'
                  }`}
                >
                  {getTranslation(key, language)}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <FlagLanguageSelector 
              triggerClassName="w-auto border-none bg-transparent georgian-gray px-2"
            />

            {/* Shopping Cart */}
            <Link href="/store">
              <Button variant="ghost" className="relative p-2 georgian-gray hover:georgian-wine">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-georgian-wine text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Authentication */}
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        {user?.profileImageUrl ? (
                          <img
                            className="h-8 w-8 rounded-full object-cover"
                            src={user.profileImageUrl}
                            alt="Profile"
                          />
                        ) : (
                          <User className="h-4 w-4" />
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuItem className="flex flex-col items-start">
                        <div className="text-sm font-medium">
                          {user?.firstName || user?.lastName 
                            ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
                            : 'Welcome!'}
                        </div>
                        {user?.email && (
                          <div className="text-xs text-muted-foreground">{user.email}</div>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => window.location.href = '/api/logout'}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="hidden md:flex items-center space-x-2">
                    <Link href="/login">
                      <Button variant="ghost" className="text-georgian-gray hover:text-georgian-wine">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button className="bg-georgian-wine hover:bg-georgian-wine/90 text-white">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="georgian-gray hover:georgian-wine"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navigation.map(({ href, key }) => (
                <Link
                  key={href}
                  href={href}
                  className={`block px-3 py-2 text-base font-medium transition-colors ${
                    isActive(href)
                      ? 'georgian-wine'
                      : 'georgian-gray hover:georgian-wine'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {getTranslation(key, language)}
                </Link>
              ))}
              
              {/* Mobile Authentication */}
              {!isLoading && (
                <div className="border-t pt-2 mt-2">
                  {isAuthenticated ? (
                    <>
                      <div className="px-3 py-2 text-sm font-medium text-georgian-wine">
                        {user?.firstName || user?.lastName 
                          ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
                          : 'Welcome!'}
                      </div>
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          window.location.href = '/api/logout';
                        }}
                        className="block w-full text-left px-3 py-2 text-base font-medium text-georgian-gray hover:text-georgian-wine"
                      >
                        <LogOut className="inline mr-2 h-4 w-4" />
                        Log out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block px-3 py-2 text-base font-medium text-georgian-gray hover:text-georgian-wine"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/register"
                        className="block px-3 py-2 text-base font-medium text-white bg-georgian-wine hover:bg-georgian-wine/90 rounded mx-3 text-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
