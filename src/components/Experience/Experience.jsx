import React, { useState, useEffect, useRef } from 'react';

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [shouldStartAnimation, setShouldStartAnimation] = useState(false);
  const sectionRef = useRef(null);

  // Fade-in effect for subtitle and other elements
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showAnimatedLine, setShowAnimatedLine] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [showLoadingDots, setShowLoadingDots] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

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

  // Intersection Observer to detect when component is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
          setShouldStartAnimation(true);
          // Reset typewriter effect
          setDisplayedTitle('');
          setTitleIndex(0);
          
          // Start fade-in animations immediately
          setShowSubtitle(true);
          setShowAnimatedLine(true);
          setShowCards(true);
          setShowLoadingDots(true);
          setShowQuote(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Typewriter effect for title - only start when shouldStartAnimation is true
  useEffect(() => {
    const heading = "FarrariGo Experience";
    if (shouldStartAnimation && titleIndex < heading.length) {
      const timer = setTimeout(() => {
        setDisplayedTitle(heading.slice(0, titleIndex + 1));
        setTitleIndex(titleIndex + 1);
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [titleIndex, shouldStartAnimation]);

  const services = [
    {
      id: 1,
      title: "Signature Packaging",
      description: "Your garments return in elegant, eco-friendly packaging that reflects our commitment to quality and sustainability.",
      image: "https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg?auto=compress&cs=tinysrgb&w=600",
      gradient: "from-blue-600 to-blue-800",
      accent: "blue"
    },
    {
      id: 2,
      title: "Fragrance Options",
      description: "Choose from our curated selection of premium fragrances or opt for fragrance-free service tailored to your preference.",
      image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600",
      gradient: "from-yellow-500 to-yellow-600",
      accent: "golden"
    },
    {
      id: 3,
      title: "Uniformed Concierge Service",
      description: "Our professionally trained drivers provide white-glove pickup and delivery service with unmatched attention to detail.",
      image: "https://images.pexels.com/photos/7464230/pexels-photo-7464230.jpeg?auto=compress&cs=tinysrgb&w=600",
      gradient: "from-blue-700 to-yellow-500",
      accent: "blue"
    }
  ];

  const getAccentColors = (accent) => {
    const colors = {
      blue: {
        light: 'blue-50',
        medium: 'blue-100',
        dark: 'blue-600',
        text: 'blue-700'
      },
      golden: {
        light: 'yellow-50',
        medium: 'yellow-100',
        dark: 'yellow-500',
        text: 'yellow-600'
      }
    };
    return colors[accent];
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-br from-blue-100/40 to-blue-200/40 rounded-full blur-3xl animate-pulse"
          style={{
            top: `${20 + Math.sin(Date.now() / 3000) * 10}%`,
            left: `${15 + Math.cos(Date.now() / 4000) * 10}%`,
            animation: 'float 6s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute w-72 h-72 bg-gradient-to-br from-yellow-100/30 to-yellow-200/30 rounded-full blur-3xl animate-pulse"
          style={{
            bottom: `${20 + Math.cos(Date.now() / 3500) * 8}%`,
            right: `${20 + Math.sin(Date.now() / 4500) * 12}%`,
            animation: 'float 8s ease-in-out infinite reverse'
          }}
        />
        <div 
          className="absolute w-64 h-64 bg-gradient-to-br from-blue-100/25 to-yellow-100/25 rounded-full blur-3xl animate-pulse"
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight tracking-tight min-h-[4rem] flex items-center justify-center" style={{ color: '#170d5c' }}>
              {displayedTitle}
              <span 
                className={`transition-all duration-300 ${isVisible && titleIndex < "The FarrariGo Experience".length ? 'animate-pulse' : 'opacity-0'}`} 
                style={{ color: '#d9b451' }}
              >
                |
              </span>
            </h1>
          </div>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium mt-6 transform transition-all duration-500"
             style={{ 
               opacity: showSubtitle ? 1 : 0,
               transform: showSubtitle ? 'translateY(0)' : 'translateY(20px)'
             }}>
            Every detail is crafted to provide you with an unparalleled luxury laundry experience.
          </p>

          {/* Animated line */}
          <div 
            className={`mt-8 w-24 h-1 mx-auto rounded-full transition-all duration-500 ${showAnimatedLine ? 'scale-x-100' : 'scale-x-0'}`} 
            style={{ background: 'linear-gradient(to right, #170d5c, #d9b451)' }}
          ></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const colors = getAccentColors(service.accent);
            return (
              <div
                key={service.id}
                className={`group cursor-pointer transform transition-all duration-400 ease-out ${
                  showCards 
                    ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
                } ${
                  hoveredCard === service.id 
                    ? 'scale-105 -translate-y-3' 
                    : 'hover:scale-102 hover:-translate-y-2'
                }`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  transformOrigin: 'center'
                }}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card Container */}
                <div className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-yellow-400 backdrop-blur-sm">
                  {/* Image Container */}
                  <div className="relative overflow-hidden h-48 sm:h-56">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-yellow-100/30 to-transparent skew-x-12" />
                  </div>

                  {/* Content Container */}
                  <div className="p-6 relative z-20">
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 transition-all duration-300 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-medium transition-colors duration-300 text-sm lg:text-base">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Loading effect dots */}
        <div className={`mt-20 flex justify-center transform transition-all duration-500 ${
          showLoadingDots ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ 
                  animationDelay: `${i * 100}ms`,
                  background: i % 2 === 0 ? '#170d5c' : '#d9b451'
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Inspirational Quote */}
        <div className={`text-center mt-12 transform transition-all duration-500 ${
          showQuote ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <blockquote className="text-base sm:text-lg italic text-gray-600 max-w-2xl mx-auto">
            "Luxury is in each detail, and perfection is in the experience we deliver to every customer."
          </blockquote>
          <div className="mt-3 w-12 h-0.5 bg-gradient-to-r from-blue-600 to-yellow-500 mx-auto rounded-full" />
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