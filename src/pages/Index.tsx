
import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { ProductShowcase } from '@/components/ProductShowcase';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { ContactSection } from '@/components/ContactSection';
import { CertificationsSection } from '@/components/CertificationsSection';
import { Footer } from '@/components/Footer';
import { QuoteRequestModal } from '@/components/QuoteRequestModal';
import { SampleRequestModal } from '@/components/SampleRequestModal';

const Index = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<any>(null);

  const handleRequestQuote = (product?: any) => {
    setSelectedProductForQuote(product);
    setIsQuoteModalOpen(true);
  };

  const handleRequestSamples = () => {
    setIsSampleModalOpen(true);
  };

  const handleViewProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navigation onGetQuote={() => handleRequestQuote()} />
      <HeroSection 
        onRequestSamples={handleRequestSamples}
        onViewProducts={handleViewProducts}
      />
      <ProductShowcase onRequestQuote={handleRequestQuote} />
      <CertificationsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      
      <QuoteRequestModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        selectedProduct={selectedProductForQuote}
      />
      
      <SampleRequestModal
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
      />
    </div>
  );
};

export default Index;
