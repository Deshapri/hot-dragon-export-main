
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company_name: '',
    country: '',
    inquiry_type: '',
    message: '',
    preferred_language: 'en'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('customer_leads')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Inquiry Submitted Successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company_name: '',
        country: '',
        inquiry_type: '',
        message: '',
        preferred_language: 'en'
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to start your bulk order? Contact us for samples, quotes, and partnership opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">Send us an Inquiry</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Full Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <Input
                    placeholder="Company Name"
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Country *"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    required
                  />
                  <Select
                    value={formData.inquiry_type}
                    onValueChange={(value) => setFormData({ ...formData, inquiry_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Inquiry Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bulk_order">Bulk Order</SelectItem>
                      <SelectItem value="samples">Request Samples</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="general">General Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Textarea
                  placeholder="Your Message *"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  required
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  {isSubmitting ? 'Submitting...' : 'Send Inquiry'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-red-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600">export@hotdragonchili.com</p>
                      <p className="text-gray-600">sales@hotdragonchili.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-red-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-gray-600">+94 78 581 3895</p>
                      <p className="text-gray-600">+94 11 234 5678</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-red-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Address</p>
                      <p className="text-gray-600">
                        Meda Kadigamuwa, Ihala Kadigamuwa<br />
                        Central Province, Sri Lanka
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-red-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Business Hours</p>
                      <p className="text-gray-600">Mon - Fri: 8:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Saturday: 8:00 AM - 2:00 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose Hot Dragon?</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Year-round greenhouse cultivation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Internationally certified quality
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Reliable global shipping
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Competitive wholesale pricing
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    24/7 customer support
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
