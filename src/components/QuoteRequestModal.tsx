
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface QuoteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct?: {
    id: string;
    name: string;
    price_lkr: number;
    price_usd: number;
  };
}

export const QuoteRequestModal = ({ isOpen, onClose, selectedProduct }: QuoteRequestModalProps) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    companyName: '',
    country: '',
    quantity: '',
    currency: 'USD',
    shippingAddress: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderNumber = `QR-${Date.now()}`;
      const unitPrice = formData.currency === 'USD' ? selectedProduct?.price_usd || 0 : selectedProduct?.price_lkr || 0;
      const totalAmount = unitPrice * parseInt(formData.quantity);

      const { error } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
          customer_name: formData.customerName,
          customer_email: formData.customerEmail,
          customer_phone: formData.customerPhone,
          product_id: selectedProduct?.id,
          quantity: parseInt(formData.quantity),
          currency: formData.currency,
          unit_price: unitPrice,
          total_amount: totalAmount,
          order_status: 'processing',
          payment_status: 'pending',
          shipping_address: {
            company: formData.companyName,
            country: formData.country,
            address: formData.shippingAddress
          },
          notes: formData.notes
        });

      if (error) throw error;

      toast({
        title: "Quote Request Submitted",
        description: "We'll get back to you with a detailed quote within 24 hours.",
      });

      // Reset form
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        companyName: '',
        country: '',
        quantity: '',
        currency: 'USD',
        shippingAddress: '',
        notes: ''
      });
      onClose();
    } catch (error) {
      console.error('Error submitting quote request:', error);
      toast({
        title: "Error",
        description: "Failed to submit quote request. Please try again.",
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
          <DialogTitle>Request Quote - {selectedProduct?.name}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customerName">Full Name *</Label>
              <Input
                id="customerName"
                value={formData.customerName}
                onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="customerEmail">Email Address *</Label>
              <Input
                id="customerEmail"
                type="email"
                value={formData.customerEmail}
                onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customerPhone">Phone Number</Label>
              <Input
                id="customerPhone"
                value={formData.customerPhone}
                onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label htmlFor="quantity">Quantity (kg) *</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="currency">Preferred Currency</Label>
            <Select value={formData.currency} onValueChange={(value) => setFormData({...formData, currency: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="LKR">LKR (රු)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="shippingAddress">Shipping Address</Label>
            <Textarea
              id="shippingAddress"
              value={formData.shippingAddress}
              onChange={(e) => setFormData({...formData, shippingAddress: e.target.value})}
              placeholder="Enter your complete shipping address"
            />
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Any specific requirements or questions?"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1 bg-red-600 hover:bg-red-700">
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Submit Quote Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
