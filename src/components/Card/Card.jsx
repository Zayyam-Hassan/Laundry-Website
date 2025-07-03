import React, { useState } from 'react';

// Individual Card Component
const Card = ({ 
  icon: Icon, 
  title, 
  description, 
  features = [],
  delay = 0,
  variant = 'default'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getCardStyles = () => {
    const baseStyles = "group relative overflow-hidden rounded-2xl p-8 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl h-80 flex flex-col";
    return `${baseStyles} bg-[#170d5c]`;
  };

  return (
    <div 
      className={getCardStyles()}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Golden Shine Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-100 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" style={{ '--tw-via-opacity': '0.6' }}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Icon Container */}
        <div className="relative mb-3 flex-shrink-0">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300" style={{ 
            background: '#d9b451'
          }}>
            <Icon 
              size={28} 
              className="transition-all duration-300"
              style={{ color: '#fff' }}
            />
          </div>
          {/* Floating particles */}
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" style={{ backgroundColor: '#fff' }}></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500" style={{ backgroundColor: '#d9b451' }}></div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold mb-2 transition-all duration-300 flex-shrink-0 line-clamp-2" style={{ color: '#fff' }}>
          {title}
        </h3>

        {/* Description */}
        <p className="transition-colors duration-300 mb-3 leading-relaxed flex-grow line-clamp-4 text-sm" style={{ color: '#fff' }}>
          {description}
        </p>

        {/* Features List */}
        {features && features.length > 0 && (
          <div className="space-y-1.5 flex-shrink-0">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 group/feature">
                <div className="w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 group-hover/feature:scale-110 flex-shrink-0" style={{ 
                  backgroundColor: '#fff',
                  color: '#170d5c'
                }}>
                  <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="transition-colors duration-300 text-xs line-clamp-1" style={{ color: '#fff' }}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;