import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, FileText } from 'lucide-react';

const Tracking = ({
  title,
  subtitle,
  features = [],
  orderData,
  backgroundColor = "bg-gray-50",
  phoneCardColor = "bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900"
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`${backgroundColor} py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden`}>
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header Section */}
        <div 
          className={`text-center mb-12 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4">
            {title}
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Enhanced Features Section */}
          <div 
            className={`space-y-5 transform transition-all duration-1000 delay-300 mx-auto lg:mx-0 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}
          >
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index} 
                  className={`group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] ${
                    hoveredFeature === index ? 'translate-x-3' : ''
                  }`}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  style={{
                    animationDelay: `${index * 150}ms`
                  }}
                >
                  {/* Feature Card with Glassmorphism Effect */}
                  <div className="relative backdrop-blur-sm bg-white/60 border border-white/20 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
                    {/* Animated Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${
                      index === 0 ? 'from-blue-400 to-cyan-400' :
                      index === 1 ? 'from-green-400 to-emerald-400' :
                      'from-purple-400 to-pink-400'
                    }`}></div>
                    
                    {/* Hover Border Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative flex items-start space-x-4">
                      {/* Enhanced Icon Container */}
                      <div className="flex-shrink-0 relative">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3 ${
                          index === 0 ? 'bg-gradient-to-br from-blue-100 to-cyan-100 group-hover:from-blue-200 group-hover:to-cyan-200' :
                          index === 1 ? 'bg-gradient-to-br from-green-100 to-emerald-100 group-hover:from-green-200 group-hover:to-emerald-200' :
                          'bg-gradient-to-br from-purple-100 to-pink-100 group-hover:from-purple-200 group-hover:to-pink-200'
                        }`}>
                          <IconComponent className={`w-7 h-7 ${feature.color} transition-all duration-500 group-hover:scale-110`} />
                        </div>
                        
                        {/* Floating Animation Dots */}
                        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-ping ${
                          index === 0 ? 'bg-blue-400' :
                          index === 1 ? 'bg-green-400' :
                          'bg-purple-400'
                        }`}></div>
                      </div>
                      
                      {/* Enhanced Content */}
                      <div className="flex-1 relative">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-indigo-700 group-hover:bg-clip-text">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed transition-all duration-300 group-hover:text-gray-700 text-sm">
                          {feature.description}
                        </p>
                        
                        {/* Progress Bar Animation */}
                        <div className="mt-3 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-700 ease-out"></div>
                      </div>
                    </div>
                    
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                  </div>
                </div>
              );
            })}
            
            {/* Additional Decorative Element */}
            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Phone Mockup Section - Enhanced */}
          <div 
            className={`flex justify-center transform transition-all duration-1000 delay-500 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}
          >
            <div className="relative max-w-sm w-full">
              {/* Enhanced Phone Frame */}
              <div className={`${phoneCardColor} p-6 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 relative overflow-hidden`}>
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Phone Screen */}
                <div className="bg-white rounded-2xl p-6 relative backdrop-blur-sm">
                  {/* Order Card */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {orderData?.currentOrderLabel}
                      </h3>
                      <span className={`px-3 py-1 text-sm font-medium ${orderData?.statusColor} bg-green-100 rounded-full`}>
                        {orderData?.status}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">{orderData?.orderLabel} #{orderData?.orderId}</span>
                        <span className="font-semibold text-gray-900">{orderData?.itemCount} {orderData?.itemsLabel}</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-1000 ease-out" 
                          style={{ width: orderData?.progressWidth }}
                        ></div>
                      </div>
                      
                      <p className="text-sm text-gray-600">
                        {orderData?.deliveryLabel}: {orderData?.estimatedDelivery}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Floating Elements */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full opacity-80 animate-bounce shadow-lg" style={{ animationDelay: '1s' }}></div>
              </div>
              
              {/* Enhanced Background Decorative Elements */}
              <div className="absolute -z-10 top-4 left-4 w-20 h-20 bg-gradient-to-br from-purple-200/40 to-pink-200/40 rounded-full blur-sm animate-pulse"></div>
              <div className="absolute -z-10 bottom-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-200/40 to-indigo-200/40 rounded-full blur-sm animate-bounce" style={{ animationDelay: '2s' }}></div>
              <div className="absolute -z-10 top-1/2 -left-8 w-12 h-12 bg-gradient-to-br from-cyan-200/30 to-teal-200/30 rounded-full blur-sm animate-pulse" style={{ animationDelay: '3s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;