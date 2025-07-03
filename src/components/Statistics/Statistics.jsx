import React, { useState, useEffect, useRef } from 'react';
import { Package, Home, Users, Truck } from 'lucide-react';

const Statistics = () => {
  // Animation states
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const sectionRef = useRef(null);

  const [animatedValues, setAnimatedValues] = useState({
    kilos: 0,
    households: 0,
    staff: 0,
    vehicles: 0
  });

  const stats = [
    {
      id: 1,
      icon: Package,
      targetValue: 18.8,
      suffix: 'M+',
      label: 'Kilos Handled',
      gradient: 'from-yellow-500 to-yellow-600',
      shadowColor: 'shadow-yellow-500/30',
      glowColor: 'group-hover:shadow-yellow-500/50',
      bgPattern: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
      key: 'kilos',
      color: '#d9b451'
    },
    {
      id: 2,
      icon: Home,
      targetValue: 640,
      suffix: 'K+',
      label: 'Happy Households',
      gradient: 'from-blue-600 to-blue-700',
      shadowColor: 'shadow-blue-500/30',
      glowColor: 'group-hover:shadow-blue-500/50',
      bgPattern: 'bg-gradient-to-br from-blue-50 to-blue-100',
      key: 'households',
      color: '#170d5c'
    },
    {
      id: 3,
      icon: Users,
      targetValue: 200,
      suffix: '+',
      label: 'Expert Staff',
      gradient: 'from-yellow-500 to-yellow-600',
      shadowColor: 'shadow-yellow-500/30',
      glowColor: 'group-hover:shadow-yellow-500/50',
      bgPattern: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
      key: 'staff',
      color: '#d9b451'
    },
    {
      id: 4,
      icon: Truck,
      targetValue: 100,
      suffix: '+',
      label: 'Fleet Vehicles',
      gradient: 'from-blue-600 to-blue-700',
      shadowColor: 'shadow-blue-500/30',
      glowColor: 'group-hover:shadow-blue-500/50',
      bgPattern: 'bg-gradient-to-br from-blue-50 to-blue-100',
      key: 'vehicles',
      color: '#170d5c'
    }
  ];

  // Intersection Observer to detect when component is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          setIsVisible(true);
          
          // Start fade-in animations with delays
          setTimeout(() => setShowStats(true), 300);
          
          // Start number animation after fade-in completes (300ms + 1000ms fade duration + 200ms buffer)
          setTimeout(() => {
            const duration = 2000;
            const steps = 60;
            const stepDuration = duration / steps;

            let currentStep = 0;
            const interval = setInterval(() => {
              currentStep++;
              const progress = currentStep / steps;
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);

              setAnimatedValues({
                kilos: Math.round(18.8 * easeOutQuart * 10) / 10,
                households: Math.round(640 * easeOutQuart),
                staff: Math.round(200 * easeOutQuart),
                vehicles: Math.round(100 * easeOutQuart)
              });

              if (currentStep >= steps) {
                clearInterval(interval);
              }
            }, stepDuration);

            return () => clearInterval(interval);
          }, 1500); // Start after fade-in animation completes
        }
      },
      { 
        threshold: 0.2, // Trigger when 20% of component is visible
        rootMargin: '0px 0px -100px 0px' // Trigger 100px before component enters viewport
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const formatValue = (stat) => {
    const value = animatedValues[stat.key];
    if (stat.key === 'kilos') {
      return value.toFixed(1);
    }
    return value.toString();
  };

  return (
    <div ref={sectionRef} className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-8 sm:py-16">
      <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 lg:gap-8 transition-all duration-1000 ease-out transform ${
        showStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={stat.id}
              className={`group relative overflow-hidden rounded-lg sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-2xl transform hover:-translate-y-4 hover:scale-105 transition-all duration-500 ease-out cursor-pointer flex-1 min-w-0 w-full sm:max-w-xs lg:max-w-sm ${
                showStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                animationDelay: `${index * 200}ms`,
                background: `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)`,
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.3)',
                boxShadow: `0 25px 50px -12px ${stat.color}30, 0 0 0 1px ${stat.color}20`,
                transitionDelay: `${index * 200}ms`
              }}
            >
              {/* Animated background pattern */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                style={{ 
                  background: `linear-gradient(135deg, ${stat.color}10, ${stat.color}20)`
                }}
              ></div>
              
              {/* Floating particles effect */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-white/20 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{animationDelay: '0ms'}}></div>
                <div className="absolute top-1/4 -right-2 w-4 h-4 bg-white/20 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{animationDelay: '200ms'}}></div>
                <div className="absolute -bottom-2 left-1/4 w-6 h-6 bg-white/20 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{animationDelay: '400ms'}}></div>
              </div>

              {/* Glowing orb behind icon */}
              <div 
                className="absolute top-2 sm:top-4 left-2 sm:left-4 w-8 sm:w-12 h-8 sm:h-12 rounded-full blur-xl opacity-30 group-hover:opacity-50 group-hover:scale-150 transition-all duration-500"
                style={{ backgroundColor: stat.color }}
              ></div>
              
              {/* Icon container with 3D effect */}
              <div className="relative mb-2 sm:mb-4 z-10">
                <div 
                  className="w-8 sm:w-12 h-8 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 relative overflow-hidden"
                  style={{ 
                    background: `linear-gradient(135deg, ${stat.color}, ${stat.color}dd)`,
                    boxShadow: `0 25px 50px -12px ${stat.color}50`
                  }}
                >
                  {/* Icon shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <IconComponent className="w-4 sm:w-6 h-4 sm:h-6 text-white drop-shadow-lg relative z-10" strokeWidth={2.5} />
                </div>
              </div>
              
              {/* Animated stats display */}
              <div className="relative z-10 text-center">
                <div className="text-lg sm:text-2xl lg:text-3xl font-black bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                  <span className="inline-block tabular-nums">
                    {formatValue(stat)}
                  </span>
                  <span 
                    className="inline-block ml-1 bg-clip-text text-transparent"
                    style={{ 
                      background: `linear-gradient(135deg, ${stat.color}, ${stat.color}dd)`,
                      WebkitBackgroundClip: 'text'
                    }}
                  >
                    {stat.suffix}
                  </span>
                </div>
                <div className="text-gray-600 font-semibold text-xs sm:text-sm lg:text-base group-hover:text-gray-800 transition-colors duration-300 tracking-wide">
                  {stat.label}
                </div>
              </div>

              {/* Progress bar at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 overflow-hidden">
                <div 
                  className="h-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"
                  style={{ backgroundColor: stat.color }}
                ></div>
              </div>

              {/* Corner accent */}
              <div 
                className="absolute top-0 right-0 w-6 sm:w-12 h-6 sm:h-12 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                style={{
                  clipPath: 'polygon(100% 0%, 0% 100%, 100% 100%)',
                  backgroundColor: stat.color
                }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Statistics;