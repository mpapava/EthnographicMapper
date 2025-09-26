import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { getTranslation } from '@/lib/i18n';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@shared/schema';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { language } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const getName = () => {
    switch (language) {
      case 'ka': return product.nameKa || product.name;
      case 'ru': return product.nameRu || product.name;
      default: return product.name;
    }
  };

  const getDescription = () => {
    switch (language) {
      case 'ka': return product.descriptionKa || product.description;
      case 'ru': return product.descriptionRu || product.description;
      default: return product.description;
    }
  };

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      const sessionId = localStorage.getItem('sessionId') || 'anonymous';
      return apiRequest('POST', '/api/cart', {
        productId: product.id,
        quantity: 1
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      toast({
        title: "Added to Cart",
        description: `${getName()} has been added to your cart.`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCartMutation.mutate();
  };

  return (
    <Card className="bg-white rounded-xl shadow-lg overflow-hidden group">
      <img
        src={product.imageUrl}
        alt={getName()}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
        loading="lazy"
        decoding="async"
      />
      <CardContent className="p-4">
        <h3 className="text-lg font-serif font-bold georgian-wine mb-2">
          {getName()}
        </h3>
        <p className="text-sm georgian-gray mb-3">
          {getDescription()}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold georgian-wine">
            ${product.price}
          </span>
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock || addToCartMutation.isPending}
            className="bg-georgian-wine hover:bg-georgian-wine/90 text-white px-4 py-2 text-sm font-semibold"
          >
            {addToCartMutation.isPending ? 'Adding...' : getTranslation('common.addToCart', language)}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
