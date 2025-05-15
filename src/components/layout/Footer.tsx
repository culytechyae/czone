import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">CZone UAE</h3>
            <p className="text-blue-100 text-sm">
             Chart Your Course for Success with Offshore Business Setup in Dubai and the UAE
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="https://czoneuae.com/services/" className="text-blue-100 hover:text-white transition">Our Services</a></li>
              <li><a href="https://czoneuae.com/service/free-zone-business-setup/" className="text-blue-100 hover:text-white transition">Free Zones</a></li>
              <li><a href="https://czoneuae.com/service/mainland-business-setup/" className="text-blue-100 hover:text-white transition">Mainland</a></li>
              <li><a href="https://czoneuae.com/service/offshore-business-setup/" className="text-blue-100 hover:text-white transition">Offshore</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-blue-100">Email: info@czoneuae.com</li>
              <li className="text-blue-100">Phone: +971 507 049 225</li>
              <li className="text-blue-100">Address:B206, Saraya Avenue, Al Garhoud, Dubai, United Arab Emirates.</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-800 mt-8 pt-4 text-center text-sm text-blue-200">
          <p>© {new Date().getFullYear()} CZone UAE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};