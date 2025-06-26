
import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🌶️</span>
              </div>
              <span className="ml-3 text-xl font-bold">Hot Dragon</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Premium Sri Lankan chili pepper exporter specializing in greenhouse-cultivated 
              hot chilies for international markets.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#home" className="hover:text-white">Home</a></li>
              <li><a href="#products" className="hover:text-white">Products</a></li>
              <li><a href="#certifications" className="hover:text-white">Certifications</a></li>
              <li><a href="#testimonials" className="hover:text-white">Testimonials</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Products</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Hot Dragon Premium</a></li>
              <li><a href="#" className="hover:text-white">Dragon Fire Red</a></li>
              <li><a href="#" className="hover:text-white">Golden Dragon Mild</a></li>
              <li><a href="#" className="hover:text-white">Custom Blends</a></li>
              <li><a href="#" className="hover:text-white">Bulk Packaging</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-red-400" />
                <span>Meda Kadigamuwa, Ihala Kadigamuwa, Sri Lanka</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-400" />
                <span>+94 78 581 3895</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-400" />
                <span>champika1019.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 R.M.Kalana Champika Deshapriya. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Export Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
