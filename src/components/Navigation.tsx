
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Globe, Menu, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavigationProps {
  onGetQuote: () => void;
}

export const Navigation = ({ onGetQuote }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('EN');

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'SI', name: 'සිංහල' },
    { code: 'TA', name: 'தமிழ்' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🌶️</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">Hot Dragon</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-red-600 font-medium">Home</button>
            <button onClick={() => scrollToSection('products')} className="text-gray-700 hover:text-red-600 font-medium">Products</button>
            <button onClick={() => scrollToSection('certifications')} className="text-gray-700 hover:text-red-600 font-medium">Certifications</button>
            <button onClick={() => scrollToSection('testimonials')} className="text-gray-700 hover:text-red-600 font-medium">Testimonials</button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-red-600 font-medium">Contact</button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  {language}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={onGetQuote}>
              Get Quote
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button onClick={() => scrollToSection('home')} className="block px-3 py-2 text-gray-700 hover:text-red-600 w-full text-left">Home</button>
              <button onClick={() => scrollToSection('products')} className="block px-3 py-2 text-gray-700 hover:text-red-600 w-full text-left">Products</button>
              <button onClick={() => scrollToSection('certifications')} className="block px-3 py-2 text-gray-700 hover:text-red-600 w-full text-left">Certifications</button>
              <button onClick={() => scrollToSection('testimonials')} className="block px-3 py-2 text-gray-700 hover:text-red-600 w-full text-left">Testimonials</button>
              <button onClick={() => scrollToSection('contact')} className="block px-3 py-2 text-gray-700 hover:text-red-600 w-full text-left">Contact</button>
              <div className="px-3 py-2">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white" onClick={onGetQuote}>
                  Get Quote
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
