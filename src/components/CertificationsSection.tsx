
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Calendar, Building } from 'lucide-react';

export const CertificationsSection = () => {
  const { data: certifications, isLoading } = useQuery({
    queryKey: ['certifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('export_certifications')
        .select('*')
        .eq('is_active', true);
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Loading Certifications...</h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="certifications" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Quality Certifications
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our commitment to quality is backed by internationally recognized certifications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certifications?.map((cert) => (
            <Card key={cert.id} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{cert.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{cert.description}</p>
                </div>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center justify-center gap-2">
                    <Building className="w-4 h-4" />
                    <span>{cert.issuing_authority}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Valid until {new Date(cert.valid_until).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <Badge className="bg-green-100 text-green-800">
                    Active Certification
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
