import React, { useState, useEffect, useRef } from "react";
import { Clock, CheckCircle, FileText } from "lucide-react";

const Tracking = ({
  title,
  subtitle,
  features = [],
  orderData,
  backgroundColor = "bg-gray-50",
  phoneCardColor = "bg-gradient-to-br from-blue-900 via-blue-800 to-yellow-600",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer to detect when component is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Typewriter effect for title
  useEffect(() => {
    if (isVisible && titleIndex < title.length) {
      const timer = setTimeout(() => {
        setDisplayedTitle(title.slice(0, titleIndex + 1));
        setTitleIndex(titleIndex + 1);
      }, 120); // Slightly slower for more dramatic effect
      return () => clearTimeout(timer);
    }
  }, [titleIndex, title, isVisible]);

  return (
    <div
      ref={sectionRef}
      className={`${backgroundColor} py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden`}
      style={{ background: 'linear-gradient(to bottom right, #f9fafb, #ffffff, rgba(23, 13, 92, 0.1))' }}
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100/40 to-blue-200/40 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-yellow-100/30 to-yellow-200/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-blue-100/25 to-yellow-100/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "3s" }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header Section */}
        <div
          className={`text-center mb-16 mt-4 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="relative inline-block">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight tracking-tight min-h-[4rem] flex items-center justify-center" style={{ color: '#170d5c' }}>
              {displayedTitle}
              <span 
                className={`transition-all duration-300 ${isVisible && titleIndex < title.length ? 'animate-pulse' : 'opacity-0'}`} 
                style={{ color: '#d9b451' }}
              >
                |
              </span>
            </h1>
          </div>

          <p
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium mt-6 transform transition-all duration-1000 delay-300"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
            }}
          >
            {subtitle}
          </p>

          {/* Animated line */}
          <div 
            className={`mt-8 w-24 h-1 mx-auto rounded-full transition-all duration-1000 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`} 
            style={{ background: 'linear-gradient(to right, #170d5c, #d9b451)' }}
          ></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Enhanced Features Section */}
          <div
            className={`space-y-5 transform transition-all duration-1000 delay-300 mx-auto lg:mx-0 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className={`group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] ${
                    hoveredFeature === index ? "translate-x-3" : ""
                  }`}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  style={{
                    animationDelay: `${index * 150}ms`,
                  }}
                >
                  {/* Feature Card with Glassmorphism Effect */}
                  <div className="relative backdrop-blur-sm bg-white/60 border border-gray-100 hover:border-yellow-400 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
                    <div className="relative flex items-start space-x-4">
                      {/* Enhanced Icon Container */}
                      <div className="flex-shrink-0 relative">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 transform group-hover:scale-110"
                          style={{ 
                            background: 'linear-gradient(135deg, rgba(23, 13, 92, 0.05), rgba(217, 180, 81, 0.05))'
                          }}
                        >
                          <IconComponent
                            className="w-7 h-7 transition-all duration-500 group-hover:scale-110"
                            style={{ color: '#6b7280' }}
                          />
                        </div>

                        {/* Floating Animation Dots */}
                        <div
                          className="absolute -top-1 -right-1 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-ping"
                          style={{ backgroundColor: '#d9b451' }}
                        ></div>
                      </div>

                      {/* Enhanced Content */}
                      <div className="flex-1 relative">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 transition-all duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed transition-all duration-300 text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>

                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-yellow-100/30 to-transparent skew-x-12"></div>
                  </div>
                </div>
              );
            })}

            {/* Additional Decorative Element */}
            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Phone Mockup Section - Enhanced */}
          <div
            className={`flex justify-center transform transition-all duration-1000 delay-500 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <div className="relative max-w-sm w-full">
              {/* Enhanced Phone Frame */}
              <div
                className="p-6 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 relative overflow-hidden"
                style={{ background: '#170d5c' }}
              >
                {/* Phone Screen */}
                <div className="bg-white rounded-2xl p-6 relative backdrop-blur-sm">
                  {/* Order Card */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {orderData?.currentOrderLabel}
                      </h3>
                      <span
                        className={`px-3 py-1 text-sm font-medium ${orderData?.statusColor} bg-green-100 rounded-full`}
                      >
                        {orderData?.status}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">
                          {orderData?.orderLabel} #{orderData?.orderId}
                        </span>
                        <span className="font-semibold text-gray-900">
                          {orderData?.itemCount} {orderData?.itemsLabel}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-1000 ease-out"
                          style={{ width: orderData?.progressWidth }}
                        ></div>
                      </div>

                      <p className="text-sm text-gray-600">
                        {orderData?.deliveryLabel}:{" "}
                        {orderData?.estimatedDelivery}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Floating Elements */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full animate-pulse shadow-lg"></div>
                <div
                  className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full opacity-80 animate-bounce shadow-lg"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>

              {/* Enhanced Background Decorative Elements */}
              <div className="absolute -z-10 top-4 left-4 w-20 h-20 bg-gradient-to-br from-blue-200/40 to-blue-300/40 rounded-full blur-sm animate-pulse"></div>
              <div
                className="absolute -z-10 bottom-4 right-4 w-16 h-16 bg-gradient-to-br from-yellow-200/40 to-yellow-300/40 rounded-full blur-sm animate-bounce"
                style={{ animationDelay: "2s" }}
              ></div>
              <div
                className="absolute -z-10 top-1/2 -left-8 w-12 h-12 bg-gradient-to-br from-blue-200/30 to-yellow-200/30 rounded-full blur-sm animate-pulse"
                style={{ animationDelay: "3s" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Loading effect dots */}
        <div className="mt-20 flex justify-center">
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ 
                  animationDelay: `${i * 200}ms`,
                  background: i % 2 === 0 ? '#170d5c' : '#d9b451'
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
