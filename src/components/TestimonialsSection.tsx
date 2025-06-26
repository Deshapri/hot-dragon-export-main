
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection = () => {
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_approved', true)
        .order('is_featured', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Loading Testimonials...</h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by spice importers and distributors worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.map((testimonial) => (
            <Card key={testimonial.id} className="relative hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="absolute top-4 right-4">
                  <Quote className="w-8 h-8 text-green-200" />
                </div>

                <div className="mb-6">
                  <div className="flex gap-1 mb-4">
                    {renderStars(testimonial.rating || 5)}
                  </div>
                  <p className="text-gray-700 leading-relaxed italic">
                    "{testimonial.message}"
                  </p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.customer_name}</p>
                  {testimonial.company_name && (
                    <p className="text-sm text-gray-600">{testimonial.company_name}</p>
                  )}
                  <p className="text-sm text-green-600 font-medium">{testimonial.country}</p>
                </div>

                {testimonial.is_featured && (
                  <div className="absolute top-4 left-4">
                    <div className="bg-red-600 text-white text-xs px-2 py-1 rounded">
                      Featured
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
