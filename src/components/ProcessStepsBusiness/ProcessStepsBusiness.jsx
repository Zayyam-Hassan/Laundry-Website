import React, { useState, useEffect, useRef } from "react";
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";

const ProcessStepBusiness = ({
  title = "What Happens Next?",
  subtitle = "Here's what you can expect after submitting your inquiry.",
  columns = 3,
  steps = [
    {
      title: "Initial Review",
      description: "Our team reviews your submission within 24 hours and validates all requirements."
    },
    {
      title: "Analysis & Planning",
      description: "We conduct thorough analysis and create a customized strategy for your needs."
    },
    {
      title: "Implementation",
      description: "We execute the plan with regular updates and milestone tracking."
    }
  ],
}) => {
  // Animation states
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showUnderline, setShowUnderline] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const sectionRef = useRef(null);

  const [hoveredCard, setHoveredCard] = useState(null);

  // Intersection Observer to detect when user scrolls to this component
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          setIsVisible(true);
          
          // Start fade-in animations with delays
          setTimeout(() => setShowSubtitle(true), 300);
          setTimeout(() => setShowUnderline(true), 600);
          setTimeout(() => setShowSteps(true), 900);
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

  // Typewriter effect for title
  useEffect(() => {
    if (isVisible && titleIndex < title.length) {
      const timer = setTimeout(() => {
        setDisplayedTitle(title.slice(0, titleIndex + 1));
        setTitleIndex(titleIndex + 1);
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [titleIndex, isVisible, title]);

  // Determine grid classes based on columns prop
  const getGridClasses = () => {
    const columnMap = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3', 
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
      5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
      6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
    };
    return columnMap[columns] || 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
  };

  return (
    <div ref={sectionRef} className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16 mt-4">
          <div className="relative">
            <div className="relative inline-block">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight tracking-tight min-h-[3rem] flex items-center justify-center" style={{ color: '#170d5c' }}>
                {displayedTitle}
                <span 
                  className={`transition-all duration-300 ${isVisible && titleIndex < title.length ? 'animate-pulse' : 'opacity-0'}`} 
                  style={{ color: '#d9b451' }}
                >
                  |
                </span>
              </h1>
            </div>
            <p className={`text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium mt-6 transform transition-all duration-500`}
               style={{ 
                 opacity: showSubtitle ? 1 : 0,
                 transform: showSubtitle ? 'translateY(0)' : 'translateY(20px)'
               }}>
              {subtitle}
            </p>
            {/* Colored bar - moved after subtitle */}
            <div
              className={`mt-6 w-24 h-1 mx-auto rounded-full transition-all duration-500`}
              style={{ 
                background: 'linear-gradient(to right, #170d5c, #d9b451)',
                opacity: showUnderline ? 1 : 0,
                transform: showUnderline ? 'scaleX(1)' : 'scaleX(0)'
              }}
            />
          </div>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Connection Line - Hidden on mobile */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(to right, transparent, rgba(23, 13, 92, 0.2), transparent)' }}></div>
          
          {/* Steps Grid */}
          <div className={`grid ${getGridClasses()} gap-8 lg:gap-6 transition-all duration-1000 ease-out transform ${
            showSteps ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative transform transition-all duration-700 ease-out ${
                  showSteps 
                    ? "translate-y-0 opacity-100" 
                    : "translate-y-20 opacity-0"
                }`}
                style={{ 
                  transitionDelay: `${0.2 + index * 0.2}s` 
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card */}
                <div className="relative group h-full">
                  {/* Main card */}
                  <div className={`relative rounded-2xl p-8 lg:p-10 h-full shadow-lg transition-all duration-500 ease-out transform ${
                    hoveredCard === index 
                      ? 'scale-105 shadow-xl' 
                      : 'scale-100 hover:shadow-lg'
                  }`} style={{ background: '#170d5c' }}>
                    
                    {/* Floating number badge */}
                    <div className={`absolute -top-6 left-8 transition-all duration-500 ${
                      hoveredCard === index ? 'scale-110 -rotate-3' : 'scale-100 rotate-0'
                    }`}>
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full blur-md opacity-50" style={{ backgroundColor: '#d9b451' }}></div>
                        <div className="relative w-14 h-14 rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg" style={{ backgroundColor: '#d9b451' }}>
                          {index + 1}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="pt-6">
                      {/* Icon and title */}
                      <div className="flex items-center mb-6">
                        <div className={`transition-all duration-300 ${
                          hoveredCard === index ? 'scale-110 rotate-12' : 'scale-100 rotate-0'
                        }`}>
                          <CheckCircle className="w-7 h-7 mr-3" style={{ color: '#fff', background: '#d9b451', borderRadius: '9999px', padding: '4px' }} />
                        </div>
                        <h3 className="text-xl font-bold leading-tight" style={{ color: '#fff' }}>
                          {step.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="leading-relaxed" style={{ color: '#fff' }}>
                        {step.description}
                      </p>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full opacity-50" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}></div>
                    <div className="absolute bottom-4 left-4 w-6 h-6 rounded-full opacity-30" style={{ backgroundColor: 'rgba(217, 180, 81, 0.12)' }}></div>
                  </div>
                </div>

                {/* Connection arrow for larger screens */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-20 z-10">
                    <div className={`w-12 h-12 rounded-full bg-white shadow-lg border-2 flex items-center justify-center transition-all duration-500 ${
                      hoveredCard === index || hoveredCard === index + 1
                        ? 'scale-110 border-gray-300'
                        : 'scale-100'
                    }`} style={{ borderColor: '#d9b451' }}>
                      <ArrowRight className="w-5 h-5" style={{ color: '#170d5c' }} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessStepBusiness;