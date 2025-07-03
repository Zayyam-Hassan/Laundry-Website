import Card from '../Card/Card';
import { useState, useEffect, useRef } from 'react';

const CardsSection = ({ 
  title,
  subtitle,
  cards = [],
  className = "",
  containerClassName = "",
  showDecorations = true,
  gridCols = "auto"
}) => {
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showAnimatedLine, setShowAnimatedLine] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [showLoadingDots, setShowLoadingDots] = useState(false);
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
          setShowCards(true);
          setShowLoadingDots(true);
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
    if (isVisible && title && titleIndex < title.length) {
      const timer = setTimeout(() => {
        setDisplayedTitle(title.slice(0, titleIndex + 1));
        setTitleIndex(titleIndex + 1);
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [titleIndex, title, isVisible]);

  const getGridClass = () => {
    if (gridCols !== "auto") {
      if (gridCols === "1") return "grid-cols-1";
      if (gridCols === "2") return "md:grid-cols-2";
      if (gridCols === "3") return "md:grid-cols-3";
      if (gridCols === "4") return "md:grid-cols-2 lg:grid-cols-4";
      return gridCols;
    }
    
    if (cards.length === 1) return "grid-cols-1";
    if (cards.length === 2) return "md:grid-cols-2";
    if (cards.length === 3) return "md:grid-cols-3";
    if (cards.length === 4) return "md:grid-cols-2 lg:grid-cols-4";
    if (cards.length >= 5) return "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    return "md:grid-cols-2";
  };

  return (
    <div ref={sectionRef} className={`min-h-screen bg-white relative overflow-hidden ${className}`}>
      {/* Subtle Background Elements */}
      {showDecorations && (
        <>
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl animate-pulse opacity-60" style={{ backgroundColor: 'rgba(23, 13, 92, 0.1)' }}></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse opacity-60" style={{ backgroundColor: 'rgba(217, 180, 81, 0.1)', animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl animate-pulse opacity-60" style={{ backgroundColor: 'rgba(23, 13, 92, 0.1)', animationDelay: '2s' }}></div>
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
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

      <div className={`relative z-10 container mx-auto px-6 py-20 ${containerClassName}`}>
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight tracking-tight min-h-[4rem] flex items-center justify-center" style={{ color: '#170d5c' }}>
                {displayedTitle}
                <span 
                  className={`transition-all duration-300 ${isVisible && titleIndex < title.length ? 'animate-pulse' : 'opacity-0'}`} 
                  style={{ color: '#d9b451' }}
                >
                  |
                </span>
              </h1>
            )}
            {subtitle && (
              <p className={`text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium mt-6 transform transition-all duration-500`}
                 style={{ 
                   opacity: showSubtitle ? 1 : 0,
                   transform: showSubtitle ? 'translateY(0)' : 'translateY(20px)'
                 }}>
                {subtitle}
              </p>
            )}
            {title && (
              <div 
                className={`mt-8 w-24 h-1 mx-auto rounded-full transition-all duration-500 ${showAnimatedLine ? 'scale-x-100' : 'scale-x-0'}`} 
                style={{ background: 'linear-gradient(to right, #170d5c, #d9b451)' }}
              ></div>
            )}
          </div>
        )}

        {/* Cards Grid */}
        <div className={`grid ${getGridClass()} gap-8 max-w-7xl mx-auto transform transition-all duration-500`}
             style={{ 
               opacity: showCards ? 1 : 0,
               transform: showCards ? 'translateY(0)' : 'translateY(30px)'
             }}>
          {cards.map((card, index) => (
            <div
              key={index}
              className="transform transition-all duration-400"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Card
                icon={card.icon}
                title={card.title}
                description={card.description}
                features={card.features}
                delay={index * 100}
                variant={card.variant}
              />
            </div>
          ))}
        </div>

        {/* Loading effect at the bottom */}
        <div className={`mt-16 flex justify-center transform transition-all duration-500`}
             style={{ 
               opacity: showLoadingDots ? 1 : 0,
               transform: showLoadingDots ? 'translateY(0)' : 'translateY(20px)'
             }}>
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ 
                  animationDelay: `${i * 100}ms`,
                  background: i % 2 === 0 ? '#fff' : '#d9b451'
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CardsSection;