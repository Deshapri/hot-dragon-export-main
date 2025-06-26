
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Globe, Truck } from 'lucide-react';

interface HeroSectionProps {
  onRequestSamples: () => void;
  onViewProducts: () => void;
}

export const HeroSection = ({ onRequestSamples, onViewProducts }: HeroSectionProps) => {
  return (
    <section id="home" className="relative bg-gradient-to-r from-green-800 to-green-600 text-white">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Premium Sri Lankan
                <span className="text-red-400 block">Chili Peppers</span>
                for Export
              </h1>
              <p className="text-xl text-green-100 leading-relaxed">
                Greenhouse-cultivated hot chili peppers with exceptional quality and consistent heat levels. 
                Trusted by international spice importers worldwide.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                onClick={onRequestSamples}
              >
                Request Samples
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-green-800"
                onClick={onViewProducts}
              >
                View Products
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <Award className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <p className="text-sm font-medium">Certified Organic</p>
              </div>
              <div className="text-center">
                <Globe className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                <p className="text-sm font-medium">Global Export</p>
              </div>
              <div className="text-center">
                <Truck className="w-8 h-8 mx-auto mb-2 text-green-400" />
                <p className="text-sm font-medium">Reliable Delivery</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white p-8 rounded-2xl shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1583837645809-cde0ad4df2d1?w=600&h=400&fit=crop"
                alt="Premium chili peppers"
                className="w-full h-80 object-cover rounded-lg"
              />
              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Starting from</span>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-800">LKR 10,000</p>
                    <p className="text-lg text-gray-600">USD $30</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">Per 25kg bulk package</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
