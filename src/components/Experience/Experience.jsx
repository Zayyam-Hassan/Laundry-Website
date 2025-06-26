import React, { useState, useEffect } from 'react';

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const services = [
    {
      id: 1,
      title: "Signature Packaging",
      description: "Your garments return in elegant, eco-friendly packaging that reflects our commitment to quality and sustainability.",
      image: "https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg?auto=compress&cs=tinysrgb&w=600",
      gradient: "from-emerald-500 to-teal-600",
      accent: "emerald"
    },
    {
      id: 2,
      title: "Fragrance Options",
      description: "Choose from our curated selection of premium fragrances or opt for fragrance-free service tailored to your preference.",
      image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600",
      gradient: "from-purple-500 to-pink-600",
      accent: "purple"
    },
    {
      id: 3,
      title: "Uniformed Concierge Service",
      description: "Our professionally trained drivers provide white-glove pickup and delivery service with unmatched attention to detail.",
      image: "https://images.pexels.com/photos/7464230/pexels-photo-7464230.jpeg?auto=compress&cs=tinysrgb&w=600",
      gradient: "from-blue-500 to-indigo-600",
      accent: "blue"
    }
  ];

  const getAccentColors = (accent) => {
    const colors = {
      emerald: {
        light: 'emerald-50',
        medium: 'emerald-100',
        dark: 'emerald-600',
        text: 'emerald-700'
      },
      purple: {
        light: 'purple-50',
        medium: 'purple-100',
        dark: 'purple-600',
        text: 'purple-700'
      },
      blue: {
        light: 'blue-50',
        medium: 'blue-100',
        dark: 'blue-600',
        text: 'blue-700'
      }
    };
    return colors[accent];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full blur-3xl animate-pulse"
          style={{
            top: `${20 + Math.sin(Date.now() / 3000) * 10}%`,
            left: `${15 + Math.cos(Date.now() / 4000) * 10}%`,
            animation: 'float 6s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute w-72 h-72 bg-gradient-to-br from-emerald-100/30 to-teal-100/30 rounded-full blur-3xl animate-pulse"
          style={{
            bottom: `${20 + Math.cos(Date.now() / 3500) * 8}%`,
            right: `${20 + Math.sin(Date.now() / 4500) * 12}%`,
            animation: 'float 8s ease-in-out infinite reverse'
          }}
        />
        <div 
          className="absolute w-64 h-64 bg-gradient-to-br from-pink-100/25 to-rose-100/25 rounded-full blur-3xl animate-pulse"
          style={{
            top: `${60 + Math.sin(Date.now() / 2800) * 6}%`,
            right: `${35 + Math.cos(Date.now() / 3200) * 8}%`,
            animation: 'float 7s ease-in-out infinite'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div 
          className={`text-center mb-16 mt-4 transform transition-all duration-1200 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          <div className="relative inline-block">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4 leading-tight tracking-tight">
              The FarrariGo Experience
            </h1>
            {/* Animated underline */}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-full transition-all duration-1000 delay-500"
                 style={{ width: isVisible ? '50%' : '0%' }} />
          </div>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium mt-6 transform transition-all duration-1000 delay-300"
             style={{ 
               opacity: isVisible ? 1 : 0,
               transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
             }}>
            Every detail is crafted to provide you with an 
            <span className="bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent font-semibold"> unparalleled luxury </span>
            laundry experience.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const colors = getAccentColors(service.accent);
            return (
              <div
                key={service.id}
                className={`group cursor-pointer transform transition-all duration-700 ease-out ${
                  isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-24 opacity-0'
                } ${
                  hoveredCard === service.id 
                    ? 'scale-105 -translate-y-3' 
                    : 'hover:scale-102 hover:-translate-y-2'
                }`}
                style={{ 
                  transitionDelay: `${index * 250}ms`,
                  transformOrigin: 'center'
                }}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card Container */}
                <div className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200 backdrop-blur-sm">
                  {/* Dynamic Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-${colors.light}/60 via-${colors.light}/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10`} />
                  
                  {/* Animated Border Glow */}
                  <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${service.gradient} p-[2px] -z-10`}>
                    <div className="w-full h-full bg-white rounded-3xl" />
                  </div>
                  
                  {/* Image Container */}
                  <div className="relative overflow-hidden h-48 sm:h-56">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    
                    {/* Dynamic Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Floating Particles */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className={`absolute top-6 right-6 w-3 h-3 bg-${colors.dark} rounded-full opacity-0 group-hover:opacity-100 animate-bounce transition-all duration-500`} 
                           style={{ animationDelay: '0.2s' }} />
                      <div className={`absolute top-12 right-12 w-2 h-2 bg-${colors.dark} rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-all duration-700`} 
                           style={{ animationDelay: '0.8s' }} />
                      <div className={`absolute bottom-8 left-6 w-2.5 h-2.5 bg-${colors.dark} rounded-full opacity-0 group-hover:opacity-100 animate-bounce transition-all duration-600`} 
                           style={{ animationDelay: '1.2s' }} />
                    </div>

                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                  </div>

                  {/* Content Container */}
                  <div className="p-6 relative z-20">
                    <h3 className={`text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:text-${colors.text} transition-all duration-300 leading-tight`}>
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-medium group-hover:text-gray-700 transition-colors duration-300 text-sm lg:text-base">
                      {service.description}
                    </p>
                    
                    {/* Animated Progress Line */}
                    <div className="mt-6 relative">
                      <div className={`h-0.5 w-0 bg-gradient-to-r ${service.gradient} rounded-full group-hover:w-16 transition-all duration-700 ease-out`} />
                      <div className={`absolute top-0 left-0 h-0.5 w-0 bg-gradient-to-r ${service.gradient} rounded-full opacity-50 group-hover:w-12 transition-all duration-500 delay-200`} />
                    </div>
                  </div>

                  {/* Bottom Accent Animation */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center`} />
                  
                  {/* Corner Accents */}
                  <div className={`absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-${colors.medium} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className={`absolute bottom-0 left-0 w-0 h-0 border-r-[20px] border-r-transparent border-b-[20px] border-b-${colors.medium} opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Bottom Decorative Elements */}
        <div className="mt-16 flex justify-center space-x-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className={`rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 transform transition-all duration-1000 ${
                isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
              style={{ 
                width: `${6 + index * 1.5}px`,
                height: `${6 + index * 1.5}px`,
                transitionDelay: `${1200 + index * 150}ms`,
                animation: isVisible ? `pulse 3s infinite ${index * 0.4}s, float 4s ease-in-out infinite ${index * 0.6}s` : 'none'
              }}
            />
          ))}
        </div>

        {/* Inspirational Quote */}
        <div className={`text-center mt-12 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '1800ms' }}>
          <blockquote className="text-base sm:text-lg italic text-gray-600 max-w-2xl mx-auto">
            "Luxury is in each detail, and perfection is in the experience we deliver to every customer."
          </blockquote>
          <div className="mt-3 w-12 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
        </div>
      </div>

      {/* Custom Styles for Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(45deg); }
          100% { transform: translateX(200%) skewX(45deg); }
        }

        .group:hover .shimmer-effect {
          animation: shimmer 1.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Experience;