import TestimonialCard from "../TestimonialsCard/TestimonialsCard";
import { useState, useEffect, useRef } from 'react';

const TestimonialsSection = ({ 
  title = "What Our Customers Say",
  subtitle = "Hear from families and professionals who trust our service.",
  className = "",
  containerClassName = "",
  showDecorations = true
}) => {
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showAnimatedLine, setShowAnimatedLine] = useState(false);
  const [showTestimonials, setShowTestimonials] = useState(false);
  const [showBottomDecoration, setShowBottomDecoration] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer to detect when component is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
          
          // Start fade-in animations immediately
          setShowSubtitle(true);
          setShowAnimatedLine(true);
          setShowTestimonials(true);
          setShowBottomDecoration(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Typewriter effect for title only
  useEffect(() => {
    if (isVisible && titleIndex < title.length) {
      const timer = setTimeout(() => {
        setDisplayedTitle(title.slice(0, titleIndex + 1));
        setTitleIndex(titleIndex + 1);
      }, 120); // Slightly slower for more dramatic effect
      return () => clearTimeout(timer);
    }
  }, [titleIndex, title, isVisible]);

  // Testimonials data directly in the component
  const testimonials = [
    {
      rating: 5,
      testimonial: "FarrariGo has transformed my weekly routine. The quality is exceptional and the convenience is unmatched.",
      name: "Sarah Al-Ahmad",
      title: "Verified Customer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c1f2?w=150&h=150&fit=crop&crop=face"
    },
    {
      rating: 5,
      testimonial: "Professional service with attention to detail. My business shirts have never looked better.",
      name: "Mohammed Hassan",
      title: "Verified Customer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      rating: 5,
      testimonial: "The subscription model works perfectly for our family. Reliable, premium quality every time.",
      name: "Fatima Al-Zahra",
      title: "Verified Customer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <div ref={sectionRef} className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden py-20 ${className}`} style={{ background: 'linear-gradient(to bottom right, #f9fafb, #ffffff, rgba(23, 13, 92, 0.1))' }}>
      {/* Subtle Background Elements */}
      {showDecorations && (
        <>
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgba(23, 13, 92, 0.1)' }}></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgba(217, 180, 81, 0.1)', animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgba(23, 13, 92, 0.1)', animationDelay: '2s' }}></div>
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                  backgroundColor: i % 2 === 0 ? 'rgba(23, 13, 92, 0.3)' : 'rgba(217, 180, 81, 0.3)'
                }}
              ></div>
            ))}
          </div>
        </>
      )}

      <div className={`relative z-10 container mx-auto px-6 ${containerClassName}`}>
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight tracking-tight min-h-[4rem] flex items-center justify-center" style={{ color: '#170d5c' }}>
            {displayedTitle}
            <span 
              className={`transition-all duration-300 ${isVisible && titleIndex < title.length ? 'animate-pulse' : 'opacity-0'}`} 
              style={{ color: '#d9b451' }}
            >
              |
            </span>
          </h1>
          <p className={`text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium mt-6 transform transition-all duration-500`}
             style={{ 
               opacity: showSubtitle ? 1 : 0,
               transform: showSubtitle ? 'translateY(0)' : 'translateY(20px)'
             }}>
            {subtitle}
          </p>
          <div 
            className={`mt-8 w-24 h-1 mx-auto rounded-full transition-all duration-500 ${showAnimatedLine ? 'scale-x-100' : 'scale-x-0'}`} 
            style={{ background: 'linear-gradient(to right, #170d5c, #d9b451)' }}
          ></div>
        </div>

        {/* Testimonials Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto transform transition-all duration-500`}
             style={{ 
               opacity: showTestimonials ? 1 : 0,
               transform: showTestimonials ? 'translateY(0)' : 'translateY(30px)'
             }}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              rating={testimonial.rating}
              testimonial={testimonial.testimonial}
              name={testimonial.name}
              title={testimonial.title}
              avatar={testimonial.avatar}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Bottom decoration */}
        {showDecorations && testimonials.length > 0 && (
          <div className={`mt-20 flex justify-center transform transition-all duration-500`}
               style={{ 
                 opacity: showBottomDecoration ? 1 : 0,
                 transform: showBottomDecoration ? 'translateY(0)' : 'translateY(20px)'
               }}>
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
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default TestimonialsSection;