import { Star, Quote, CheckCircle } from 'lucide-react';
import { useState } from 'react';
// Individual Testimonial Card Component
const TestimonialCard = ({ 
  rating = 5,
  testimonial,
  name,
  title,
  avatar,
  delay = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative bg-white rounded-3xl p-8 border-2 border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
      style={{ 
        animationDelay: `${delay}ms`,
        borderColor: isHovered ? '#d9b451' : '#f3f4f6'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Shimmer */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-50 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" style={{ '--tw-via-opacity': '0.3' }}></div>
      </div>

      {/* Quote Icon */}
      <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
        <Quote size={32} style={{ color: '#170d5c' }} className="transform rotate-180" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Star Rating */}
        <div className="flex items-center mb-6 space-x-1">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              size={20}
              className={`transition-all duration-300 group-hover:scale-110`}
              style={{ 
                animationDelay: `${delay + (index * 100)}ms`,
                color: index < rating ? '#d9b451' : '#e5e7eb',
                fill: index < rating ? '#d9b451' : 'transparent'
              }}
            />
          ))}
        </div>

        {/* Testimonial Text */}
        <blockquote className="text-gray-700 text-lg leading-relaxed mb-8 group-hover:text-gray-800 transition-colors duration-300">
          "{testimonial}"
        </blockquote>

        {/* Customer Info */}
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <div className="relative">
            <div className="w-14 h-14 rounded-full overflow-hidden border-3 border-white shadow-lg transition-all duration-300 group-hover:scale-110" style={{ borderColor: isHovered ? '#d9b451' : '#ffffff' }}>
              <img 
                src={avatar} 
                alt={name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=170d5c&color=ffffff&size=56`;
                }}
              />
            </div>
            {/* Verified Badge */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#d9b451' }}>
              <CheckCircle size={14} className="text-white" />
            </div>
          </div>

          {/* Name and Title */}
          <div className="flex-1">
            <h4 className="font-bold text-lg transition-colors duration-300" style={{ color: '#170d5c' }}>
              {name}
            </h4>
            <p className="text-gray-500 text-sm group-hover:text-gray-600 transition-colors duration-300">
              {title}
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 transition-colors duration-300 opacity-0 group-hover:opacity-100" style={{ borderColor: '#d9b451' }}></div>
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 transition-colors duration-300 opacity-0 group-hover:opacity-100" style={{ borderColor: '#d9b451' }}></div>
    </div>
  );
};
export default TestimonialCard;