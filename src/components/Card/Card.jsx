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
    const baseStyles = "group relative overflow-hidden rounded-2xl p-8 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl";
    
    switch (variant) {
      case 'gradient':
        return `${baseStyles} bg-white border-2 border-blue-100 hover:border-blue-200 hover:shadow-blue-100/20`;
      case 'glow':
        return `${baseStyles} bg-white border-2 border-emerald-100 hover:border-emerald-200 hover:shadow-emerald-100/20`;
      case 'neon':
        return `${baseStyles} bg-white border-2 border-purple-100 hover:border-purple-200 hover:shadow-purple-100/20`;
      default:
        return `${baseStyles} bg-white border-2 border-gray-100 hover:border-gray-200 hover:shadow-gray-100/20`;
    }
  };

  const getIconStyles = () => {
    switch (variant) {
      case 'gradient':
        return "text-blue-600 group-hover:text-blue-700";
      case 'glow':
        return "text-emerald-600 group-hover:text-emerald-700";
      case 'neon':
        return "text-purple-600 group-hover:text-purple-700";
      default:
        return "text-indigo-600 group-hover:text-indigo-700";
    }
  };

  const getIconBgStyles = () => {
    switch (variant) {
      case 'gradient':
        return "bg-gradient-to-br from-blue-50 to-blue-100 group-hover:from-blue-100 group-hover:to-blue-200";
      case 'glow':
        return "bg-gradient-to-br from-emerald-50 to-emerald-100 group-hover:from-emerald-100 group-hover:to-emerald-200";
      case 'neon':
        return "bg-gradient-to-br from-purple-50 to-purple-100 group-hover:from-purple-100 group-hover:to-purple-200";
      default:
        return "bg-gradient-to-br from-indigo-50 to-indigo-100 group-hover:from-indigo-100 group-hover:to-indigo-200";
    }
  };

  const getTitleGradient = () => {
    switch (variant) {
      case 'gradient':
        return "group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-800";
      case 'glow':
        return "group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-emerald-800";
      case 'neon':
        return "group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-purple-800";
      default:
        return "group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-indigo-800";
    }
  };

  const getAccentColor = () => {
    switch (variant) {
      case 'gradient':
        return "bg-blue-500";
      case 'glow':
        return "bg-emerald-500";
      case 'neon':
        return "bg-purple-500";
      default:
        return "bg-indigo-500";
    }
  };

  return (
    <div 
      className={getCardStyles()}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Shimmer Background */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-50 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon Container */}
        <div className="relative mb-6">
          <div className={`w-16 h-16 rounded-2xl ${getIconBgStyles()} flex items-center justify-center group-hover:scale-110 transition-all duration-300`}>
            <Icon 
              size={32} 
              className={`${getIconStyles()} transition-all duration-300 ${isHovered ? 'animate-pulse' : ''}`}
            />
          </div>
          {/* Floating particles */}
          <div className={`absolute -top-1 -right-1 w-3 h-3 ${getAccentColor()} rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300`}></div>
          <div className={`absolute -bottom-1 -left-1 w-2 h-2 ${getAccentColor()} rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500`}></div>
        </div>

        {/* Title */}
        <h3 className={`text-2xl font-bold text-gray-800 mb-4 group-hover:text-transparent group-hover:bg-clip-text ${getTitleGradient()} transition-all duration-300`}>
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 mb-6 leading-relaxed">
          {description}
        </p>

        {/* Features List */}
        {features.length > 0 && (
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center space-x-3 opacity-90 group-hover:opacity-100 transition-all duration-300"
                style={{ animationDelay: `${delay + (index * 100)}ms` }}
              >
                <div className={`w-2 h-2 rounded-full ${getAccentColor()} group-hover:scale-125 transition-transform duration-300`}></div>
                <span className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300 text-sm">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Corner decoration */}
      <div className={`absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-gray-200 group-hover:border-gray-400 transition-colors duration-300`}></div>
      <div className={`absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-gray-200 group-hover:border-gray-400 transition-colors duration-300`}></div>
    </div>
  );
};
export default Card;