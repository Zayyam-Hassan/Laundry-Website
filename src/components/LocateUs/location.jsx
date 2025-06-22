import React, { useState } from 'react';

export default function FindOurLocation() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Find Our Location
          </h1>
          <p className="text-gray-600 text-lg">
            Visit our facility in Shuwaikh Industrial Area for in-person assistance.
          </p>
        </div>

        {/* Map Container */}
        <div 
          className={`bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-transform duration-300 ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative h-96">
            {/* Google Maps Embed */}
            <iframe
              src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY_HERE&q=Shuwaikh Industrial Area, Kuwait&zoom=15"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Address Information */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="text-center">
            <h3 className="font-semibold text-blue-900 mb-3 text-lg">Our Address</h3>
            <div className="text-gray-600 space-y-1">
              <div>Industrial Area 3, Block D</div>
              <div>Street 58/59, Reef Square Building</div>
              <div className="font-medium text-blue-900">Shuwaikh, Kuwait</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}