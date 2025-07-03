import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

const ProcessSteps = ({
  title = "How It Works",
  subtitle = "Simple steps to get your laundry done with premium care.",
  steps = [
    {
      title: "Schedule Pickup",
      description: "Book your pickup time through our app or website. We'll come to your door.",
      icon: CheckCircle,
      color: "blue"
    },
    {
      title: "We Collect",
      description: "Our team collects your laundry and transports it to our facility.",
      icon: ArrowRight,
      color: "green"
    },
    {
      title: "Expert Care",
      description: "Your garments receive premium treatment with specialized care.",
      icon: Sparkles,
      color: "purple"
    },
    {
      title: "Quality Check",
      description: "Every item is inspected to ensure it meets our high standards.",
      icon: CheckCircle,
      color: "yellow"
    },
    {
      title: "Deliver Back",
      description: "We deliver your fresh, clean laundry right back to your door.",
      icon: ArrowRight,
      color: "pink"
    }
  ],
  theme = "dark"
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [displayedSubtitle, setDisplayedSubtitle] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [isTitleComplete, setIsTitleComplete] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer to detect when component is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
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
    } else if (isVisible && titleIndex >= title.length) {
      setIsTitleComplete(true);
    }
  }, [titleIndex, title, isVisible]);

  // Remove typewriter effect for subtitle - just use fade-in
  useEffect(() => {
    if (isVisible) {
      setDisplayedSubtitle(subtitle);
    }
  }, [isVisible, subtitle]);

  // Auto-advance steps
  useEffect(() => {
    if (isVisible) {
      const timer = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [isVisible, steps.length]);

  const themes = {
    dark: {
      bg: "bg-gradient-to-br from-gray-900 via-blue-900 to-blue-800",
      accent: "from-blue-400 to-blue-600",
      text: "text-white",
      subtitle: "text-gray-300"
    },
    light: {
      bg: "bg-gradient-to-br from-blue-50 via-white to-blue-100",
      accent: "from-blue-600 to-blue-700",
      text: "text-gray-900",
      subtitle: "text-gray-600"
    }
  };

  const currentTheme = themes[theme] || themes.dark;

  return (
    <div ref={sectionRef} className="min-h-screen relative overflow-hidden py-20" style={{ background: 'linear-gradient(135deg, #170d5c 0%, #0f0a3a 50%, #170d5c 100%)' }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full blur-xl animate-pulse" style={{ backgroundColor: 'rgba(217, 180, 81, 0.2)' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full blur-xl animate-pulse delay-1000" style={{ backgroundColor: 'rgba(23, 13, 92, 0.2)' }}></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full blur-xl animate-pulse delay-500" style={{ backgroundColor: 'rgba(217, 180, 81, 0.2)' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Compact Header */}
        <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative inline-block">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight tracking-tight min-h-[4rem] flex items-center justify-center text-white">
              {displayedTitle}
              <span 
                className={`transition-all duration-300 ${isVisible && titleIndex < title.length ? 'animate-pulse' : 'opacity-0'}`} 
                style={{ color: '#d9b451' }}
              >
                |
              </span>
            </h1>
            <div className={`absolute -inset-1 opacity-20 blur-xl rounded-lg`} style={{ background: 'linear-gradient(to right, #170d5c, #d9b451)' }}></div>
          </div>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light min-h-[2rem] text-gray-300">
            {displayedSubtitle}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div
                key={index}
                className={`relative group cursor-pointer transition-all duration-500 transform ${
                  isActive ? 'scale-105 -translate-y-2' : 'hover:scale-102'
                } ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onClick={() => setCurrentStep(index)}
              >
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-400 to-gray-600 transform -translate-y-1/2">
                    <div 
                      className={`h-full transition-all duration-1000 ${
                        isCompleted ? 'w-full' : 'w-0'
                      }`}
                      style={{ background: 'linear-gradient(to right, #170d5c, #d9b451)' }}
                    ></div>
                  </div>
                )}

                {/* Step Card */}
                <div className={`relative p-6 rounded-2xl border-2 transition-all duration-500 min-h-[280px] ${
                  isActive 
                    ? 'border-yellow-400 bg-yellow-400/10 shadow-2xl shadow-yellow-400/20' 
                    : isCompleted 
                    ? 'border-green-400 bg-green-400/10' 
                    : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                }`}>
                  {/* Step Number */}
                  <div className={`absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                    isActive 
                      ? 'bg-yellow-400 text-black' 
                      : isCompleted 
                      ? 'bg-green-400 text-white' 
                      : 'bg-gray-700 text-gray-300'
                  }`}>
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 ${
                    isActive 
                      ? 'bg-yellow-400/20 text-yellow-400' 
                      : isCompleted 
                      ? 'bg-green-400/20 text-green-400' 
                      : 'bg-gray-700/50 text-gray-400'
                  }`}>
                    {Icon ? (
                      <Icon size={32} className={`transition-all duration-500 ${isActive ? 'animate-pulse' : ''}`} />
                    ) : (
                      <CheckCircle size={32} className={`transition-all duration-500 ${isActive ? 'animate-pulse' : ''}`} />
                    )}
                  </div>

                  {/* Content */}
                  <h3 className={`text-xl font-bold mb-2 transition-all duration-500 ${
                    isActive 
                      ? 'text-yellow-400' 
                      : isCompleted 
                      ? 'text-green-400' 
                      : 'text-gray-300'
                  }`}>
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>

                  {/* Glow Effect */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/20 to-yellow-400/10 blur-xl animate-pulse"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Loading effect at the bottom */}
        {isVisible && (
          <div className="mt-16 flex justify-center">
            <div className="flex space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ 
                    animationDelay: `${i * 200}ms`,
                    background: i % 2 === 0 ? '#170d5c' : '#d9b451'
                  }}
                ></div>
              ))}
            </div>
          </div>
        )}
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

export default ProcessSteps;