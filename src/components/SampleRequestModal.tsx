
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface SampleRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SampleRequestModal = ({ isOpen, onClose }: SampleRequestModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    country: '',
    shippingAddress: '',
    message: '',
    selectedProducts: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const { data: products } = useQuery({
    queryKey: ['products-for-samples'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, spice_level')
        .eq('available', true);
      
      if (error) throw error;
      return data;
    },
  });

  const handleProductSelection = (productId: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        selectedProducts: [...formData.selectedProducts, productId]
      });
    } else {
      setFormData({
        ...formData,
        selectedProducts: formData.selectedProducts.filter(id => id !== productId)
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('customer_leads')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company_name: formData.companyName,
          country: formData.country,
          inquiry_type: 'samples',
          message: `Sample Request - Products: ${formData.selectedProducts.join(', ')}\n\nShipping Address: ${formData.shippingAddress}\n\nMessage: ${formData.message}`,
          status: 'new'
        });

      if (error) throw error;

      toast({
        title: "Sample Request Submitted",
        description: "We'll prepare your samples and contact you with shipping details within 2-3 business days.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        companyName: '',
        country: '',
        shippingAddress: '',
        message: '',
        selectedProducts: []
      });
      onClose();
    } catch (error) {
      console.error('Error submitting sample request:', error);
      toast({
        title: "Error",
        description: "Failed to submit sample request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Request Product Samples</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="country">Country *</Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => setFormData({...formData, country: e.target.value})}
              required
            />
          </div>

          <div>
            <Label>Select Products for Samples *</Label>
            <div className="space-y-2 mt-2 max-h-32 overflow-y-auto border rounded p-3">
              {products?.map((product) => (
                <div key={product.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={product.id}
                    checked={formData.selectedProducts.includes(product.id)}
                    onCheckedChange={(checked) => handleProductSelection(product.id, checked as boolean)}
                  />
                  <Label htmlFor={product.id} className="text-sm">
                    {product.name} ({product.spice_level?.toUpperCase()})
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="shippingAddress">Shipping Address *</Label>
            <Textarea
              id="shippingAddress"
              value={formData.shippingAddress}
              onChange={(e) => setFormData({...formData, shippingAddress: e.target.value})}
              placeholder="Enter your complete shipping address"
              required
            />
          </div>

          <div>
            <Label htmlFor="message">Additional Information</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="Any specific requirements or questions about the samples?"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || formData.selectedProducts.length === 0} 
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Submit Sample Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
