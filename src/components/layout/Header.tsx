import React from 'react';
import { Building2 } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Building2 className="h-8 w-8 text-blue-900" />
          <div>
            <h1 className="text-xl font-bold text-blue-900">CZone UAE</h1>
            <p className="text-sm text-gray-500">Business Setup Calculator</p>
          </div>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="https://czoneuae.com/about-us/" className="text-gray-600 hover:text-blue-900 transition">About Us</a>
          <a href="https://czoneuae.com/services/" className="text-gray-600 hover:text-blue-900 transition">Services</a>
          <a href="https://czoneuae.com/service/business-setup-services/" className="text-gray-600 hover:text-blue-900 transition">Business</a>
          <a href="https://czoneuae.com/contact-us/" className="text-gray-600 hover:text-blue-900 transition">Contact</a>
        </nav>
        <button className="md:hidden">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};