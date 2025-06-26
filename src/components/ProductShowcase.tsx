
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flame, MapPin, Calendar, Award } from 'lucide-react';
import { ProductDetailModal } from './ProductDetailModal';

interface ProductShowcaseProps {
  onRequestQuote: (product: any) => void;
}

export const ProductShowcase = ({ onRequestQuote }: ProductShowcaseProps) => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('available', true);
      
      if (error) throw error;
      return data;
    },
  });

  const getSpiceLevelColor = (level: string) => {
    switch (level) {
      case 'mild': return 'bg-yellow-100 text-yellow-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'hot': return 'bg-red-100 text-red-800';
      case 'extra_hot': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSpiceIcon = (level: string) => {
    const count = level === 'mild' ? 1 : level === 'medium' ? 2 : level === 'hot' ? 3 : 4;
    return Array(count).fill('🌶️').join('');
  };

  const handleViewDetails = (product: any) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Loading Products...</h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="products" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Premium Chili Varieties
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Carefully cultivated using modern greenhouse techniques for consistent quality and year-round availability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products?.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={product.image_url || "https://images.unsplash.com/photo-1583837645809-cde0ad4df2d1?w=400&h=300&fit=crop"}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className={getSpiceLevelColor(product.spice_level)}>
                      {getSpiceIcon(product.spice_level)} {product.spice_level?.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">{product.name}</CardTitle>
                  <p className="text-gray-600 text-sm line-clamp-3">{product.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-green-700">LKR {product.price_lkr?.toLocaleString()}</p>
                      <p className="text-lg text-gray-600">USD ${product.price_usd}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Per {product.weight_kg}kg</p>
                      <p className="text-sm font-medium text-green-600">{product.stock_quantity} kg available</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{product.origin_region}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{product.harvest_season}</span>
                    </div>
                  </div>

                  {product.certifications && product.certifications.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Award className="w-4 h-4" />
                        <span>Certifications:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {product.certifications.map((cert, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-4">
                    <Button 
                      className="flex-1 bg-red-600 hover:bg-red-700"
                      onClick={() => onRequestQuote(product)}
                    >
                      Get Quote
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleViewDetails(product)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ProductDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        product={selectedProduct}
        onRequestQuote={onRequestQuote}
      />
    </>
  );
};
