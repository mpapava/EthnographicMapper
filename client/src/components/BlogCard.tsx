import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { useLanguage } from '@/hooks/useLanguage';
import { getTranslation } from '@/lib/i18n';
import type { BlogPost } from '@shared/schema';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { language } = useLanguage();

  const getTitle = () => {
    switch (language) {
      case 'ka': return post.titleKa || post.title;
      case 'ru': return post.titleRu || post.title;
      default: return post.title;
    }
  };

  const getExcerpt = () => {
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

  const getCategoryColor = () => {
    switch (post.category.toLowerCase()) {
      case 'traditions': return 'bg-georgian-gold/20 text-georgian-wine';
      case 'heritage': return 'bg-georgian-terracotta/20 text-georgian-wine';
      case 'architecture': return 'bg-green-100 text-georgian-wine';
      default: return 'bg-georgian-gold/20 text-georgian-wine';
    }
  };

  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden">
      <img
        src={post.imageUrl}
        alt={getTitle()}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-6">
        <div className="flex items-center mb-3">
          <Badge className={getCategoryColor()}>
            {post.category}
          </Badge>
          <span className="text-sm georgian-gray ml-3">
            {formatDate(post.publishedAt)}
          </span>
        </div>
        <h3 className="text-xl font-serif font-bold georgian-wine mb-3">
          {getTitle()}
        </h3>
        <p className="georgian-gray mb-4">
          {getExcerpt()}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="georgian-wine hover:georgian-terracotta font-semibold transition-colors inline-flex items-center"
        >
          {getTranslation('common.readMore', language)}
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardContent>
    </article>
  );
}
