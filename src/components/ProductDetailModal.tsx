
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Award, Flame } from 'lucide-react';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    description: string;
    image_url: string;
    price_lkr: number;
    price_usd: number;
    stock_quantity: number;
    spice_level: string;
    weight_kg: number;
    origin_region: string;
    harvest_season: string;
    certifications: string[];
  } | null;
  onRequestQuote: (product: any) => void;
}

export const ProductDetailModal = ({ isOpen, onClose, product, onRequestQuote }: ProductDetailModalProps) => {
  if (!product) return null;

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img
              src={product.image_url || "https://images.unsplash.com/photo-1583837645809-cde0ad4df2d1?w=600&h=400&fit=crop"}
              alt={product.name}
              className="w-full h-80 object-cover rounded-lg"
            />
            
            <div className="mt-4">
              <Badge className={getSpiceLevelColor(product.spice_level)}>
                {getSpiceIcon(product.spice_level)} {product.spice_level?.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Pricing</h3>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-green-700">LKR {product.price_lkr?.toLocaleString()}</p>
                <p className="text-xl text-gray-600">USD ${product.price_usd}</p>
                <p className="text-sm text-gray-500">Per {product.weight_kg}kg package</p>
                <p className="text-sm font-medium text-green-600">{product.stock_quantity} kg available</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{product.origin_region}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{product.harvest_season}</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Heat Level: {product.spice_level?.replace('_', ' ')}</span>
              </div>
            </div>

            {product.certifications && product.certifications.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Award className="w-4 h-4" />
                  <span>Certifications:</span>
                </div>
                <div className="flex flex-wrap gap-2">
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
                onClick={() => onRequestQuote(product)}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                Request Quote
              </Button>
              <Button variant="outline" onClick={onClose} className="flex-1">
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
