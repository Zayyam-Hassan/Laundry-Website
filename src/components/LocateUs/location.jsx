import React, { useState } from "react";

export default function FindOurLocation() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 blur-3xl rounded-full animate-pulse"></div>
          <div className="relative">
            <div className="relative inline-block">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4 leading-tight tracking-tight">
                Find Our Location
              </h1>
              {/* Animated underline */}
              <div
                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-full transition-all duration-1000 delay-500"
                style={{ width: "50%" }}
              />
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium mt-6">
              Visit our facility in Shuwaikh Industrial Area for in-person
              assistance.
            </p>
          </div>
        </div>

        {/* Map Container */}
        <div
          className={`bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-transform duration-300 ${
            isHovered ? "scale-105" : "scale-100"
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
      </div>
    </div>
  );
}
