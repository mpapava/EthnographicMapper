import { useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Link } from 'wouter';
import { useLanguage } from '@/hooks/useLanguage';
import type { BlogPost } from '@shared/schema';

export default function Blog() {
  const { slug } = useParams<{ slug?: string }>();
  const { language } = useLanguage();

  const { data: blogPosts = [], isLoading: postsLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
  });

  const { data: currentPost, isLoading: postLoading } = useQuery<BlogPost>({
    queryKey: [`/api/blog/${slug}`],
    enabled: !!slug,
  });

  const getTitle = (post: BlogPost) => {
    switch (language) {
      case 'ka': return post.titleKa || post.title;
      case 'ru': return post.titleRu || post.title;
      default: return post.title;
    }
  };

  const getContent = (post: BlogPost) => {
    switch (language) {
      case 'ka': return post.contentKa || post.content;
      case 'ru': return post.contentRu || post.content;
      default: return post.content;
    }
  };

  const getExcerpt = (post: BlogPost) => {
    switch (language) {
      case 'ka': return post.excerptKa || post.excerpt;
      case 'ru': return post.excerptRu || post.excerpt;
      default: return post.excerpt;
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString(language === 'ka' ? 'ka-GE' : language === 'ru' ? 'ru-RU' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'traditions': return 'bg-georgian-gold/20 text-georgian-wine';
      case 'heritage': return 'bg-georgian-terracotta/20 text-georgian-wine';
      case 'architecture': return 'bg-green-100 text-georgian-wine';
      default: return 'bg-georgian-gold/20 text-georgian-wine';
    }
  };

  const categories = [...new Set(blogPosts.map(post => post.category))];
  const relatedPosts = slug && currentPost 
    ? blogPosts.filter(post => post.category === currentPost.category && post.slug !== slug).slice(0, 3)
    : [];

  // Single blog post view
  if (slug) {
    if (postLoading) {
      return (
        <>
          <Header />
          <div className="min-h-screen bg-georgian-cream">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <Skeleton className="h-8 w-32 mb-8" />
              <Skeleton className="h-12 w-full mb-4" />
              <Skeleton className="h-4 w-48 mb-8" />
              <Skeleton className="h-64 w-full mb-8" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
          <Footer />
        </>
      );
    }

    if (!currentPost) {
      return (
        <>
          <Header />
          <div className="min-h-screen bg-georgian-cream flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-serif font-bold georgian-wine mb-4">Article Not Found</h1>
              <p className="georgian-gray mb-6">The article you're looking for doesn't exist.</p>
              <Link href="/blog">
                <Button className="bg-georgian-wine hover:bg-georgian-wine/90 text-white">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
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
          <title>{getTitle(currentPost)} - Georgian Heritage Blog</title>
          <meta name="description" content={getExcerpt(currentPost)} />
        </Helmet>

        <Header />

        <article className="py-16 bg-georgian-cream min-h-screen">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm mb-8">
              <Link href="/" className="georgian-gray hover:georgian-wine transition-colors">
                Home
              </Link>
              <span className="georgian-gray">/</span>
              <Link href="/blog" className="georgian-gray hover:georgian-wine transition-colors">
                Blog
              </Link>
              <span className="georgian-gray">/</span>
              <span className="georgian-wine font-medium">{getTitle(currentPost)}</span>
            </div>

            {/* Article Header */}
            <header className="text-center mb-12">
              <Badge className={getCategoryColor(currentPost.category)} variant="secondary">
                {currentPost.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-serif font-bold georgian-wine mt-4 mb-6">
                {getTitle(currentPost)}
              </h1>
              <div className="flex items-center justify-center space-x-6 text-sm georgian-gray">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  {formatDate(currentPost.publishedAt)}
                </div>
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Georgian Heritage Team
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="mb-12">
              <img
                src={currentPost.imageUrl}
                alt={getTitle(currentPost)}
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none georgian-gray">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <p className="text-xl leading-relaxed mb-8 georgian-gray italic">
                  {getExcerpt(currentPost)}
                </p>
                <div className="whitespace-pre-wrap text-lg leading-relaxed">
                  {getContent(currentPost)}
                </div>
              </div>
            </div>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <section className="mt-16">
                <h2 className="text-3xl font-serif font-bold georgian-wine mb-8 text-center">
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              </section>
            )}

            {/* Back to Blog */}
            <div className="text-center mt-12">
              <Link href="/blog">
                <Button className="bg-georgian-wine hover:bg-georgian-wine/90 text-white">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Button>
              </Link>
            </div>
          </div>
        </article>

        <Footer />
      </>
    );
  }

  // Blog listing view
  return (
    <>
      <Helmet>
        <title>Blog - Georgian Heritage</title>
        <meta name="description" content="Explore stories, traditions, and insights about Georgian culture, heritage, and ethnographic regions." />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="relative h-64 bg-gradient-to-r from-georgian-wine to-georgian-terracotta">
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Stories & Traditions
            </h1>
            <p className="text-lg md:text-xl font-light">
              Discover the rich tapestry of Georgian culture and heritage
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button variant="default" className="bg-georgian-wine text-white">
              All Stories
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant="outline"
                className="georgian-wine hover:bg-georgian-wine hover:text-white"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-georgian-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {postsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-48 w-full rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-serif font-bold georgian-wine mb-4">No Stories Found</h3>
              <p className="georgian-gray">
                Check back soon for new stories and insights about Georgian culture.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-georgian-wine text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Subscribe to our newsletter to receive the latest stories and cultural insights from Georgia.
          </p>
          <Button
            className="bg-white text-georgian-wine hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
            onClick={() => window.location.href = '/contact'}
          >
            Contact Us
          </Button>
        </div>
      </section>

      <Footer />
    </>
  );
}
