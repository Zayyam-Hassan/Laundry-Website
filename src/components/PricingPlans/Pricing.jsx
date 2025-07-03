import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Crown, 
  Sparkles, 
  Zap, 
  Shield, 
  Clock, 
  Headphones, 
  Shirt, 
  Truck,
  Star,
  Infinity
} from 'lucide-react';

const PricingPlans = ({ 
  title = "Choose a Plan That Fits You",
  subtitle = "Flexible subscription plans designed for every lifestyle and budget.",
  plans = null,
  onPlanSelect = null,
  showDiscounts = false,
  currency = "KD",
  className = ""
}) => {
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
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

  // Default plans data if not provided
  const defaultPlans = [
    {
      id: 'essential',
      name: 'Essential',
      price: '25',
      originalPrice: '35',
      period: 'per month',
      discount: '29% OFF',
      features: [
        { text: '20 pieces per month', icon: Shirt },
        { text: 'Wash & fold service', icon: Zap },
        { text: 'Free pickup & delivery', icon: Truck },
        { text: 'Standard turnaround', icon: Clock },
        { text: 'Basic customer support', icon: Headphones }
      ],
      buttonText: 'Choose Essential',
      popular: false,
      highlight: false
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '45',
      originalPrice: '65',
      period: 'per month',
      discount: '31% OFF',
      features: [
        { text: '40 pieces per month', icon: Shirt },
        { text: 'All washing services', icon: Zap },
        { text: 'Priority pickup & delivery', icon: Truck },
        { text: 'Express turnaround', icon: Clock },
        { text: 'Dedicated support', icon: Headphones },
        { text: 'Stain removal included', icon: Shield }
      ],
      buttonText: 'Choose Premium',
      popular: true,
      highlight: true
    },
    {
      id: 'unlimited',
      name: 'Unlimited',
      price: '75',
      originalPrice: '120',
      period: 'per month',
      discount: '38% OFF',
      features: [
        { text: 'Unlimited pieces', icon: Infinity },
        { text: 'All premium services', icon: Crown },
        { text: 'Same-day delivery', icon: Truck },
        { text: 'Priority scheduling', icon: Clock },
        { text: '24/7 concierge', icon: Headphones },
        { text: 'Premium care included', icon: Sparkles },
        { text: 'Free dry cleaning', icon: Shield }
      ],
      buttonText: 'Choose Unlimited',
      popular: false,
      highlight: true
    }
  ];

  const plansToUse = plans || defaultPlans;

  return (
    <div ref={sectionRef} className={`min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div 
          className={`text-center mb-16 mt-4 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          <div className="relative inline-block">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight tracking-tight min-h-[4rem] flex items-center justify-center" style={{ color: '#170d5c' }}>
              {displayedTitle}
              <span 
                className={`transition-all duration-300 ${isVisible && titleIndex < title.length ? 'animate-pulse' : 'opacity-0'}`} 
                style={{ color: '#d9b451' }}
              >
                |
              </span>
            </h1>
          </div>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium mt-6 transform transition-all duration-1000 delay-300 min-h-[2rem]"
             style={{ 
               opacity: isVisible ? 1 : 0,
               transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
             }}>
            {displayedSubtitle}
          </p>

          {/* Animated underline - moved under subtitle */}
          <div 
            className={`mt-8 w-24 h-1 mx-auto rounded-full transition-all duration-1000 delay-500 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}
            style={{ background: 'linear-gradient(to right, #170d5c, #d9b451)' }}
          />
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plansToUse.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative group cursor-pointer transition-all duration-500 transform ${
                hoveredPlan === plan.id ? 'scale-105 -translate-y-2' : 'hover:scale-102'
              } ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
              onClick={() => {
                setSelectedPlan(plan.id);
                onPlanSelect && onPlanSelect(plan);
              }}
            >
              {/* Plan Card */}
              <div className={`relative p-8 rounded-3xl border-2 transition-all duration-500 min-h-[560px] ${
                plan.popular 
                  ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-yellow-100/50 shadow-2xl shadow-yellow-400/20' 
                  : plan.highlight 
                  ? 'border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100/50 shadow-xl shadow-blue-400/20' 
                  : 'border-gray-200 bg-white shadow-lg hover:shadow-xl'
              }`}>
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-bold mb-2 ${
                    plan.popular ? 'text-yellow-800' : plan.highlight ? 'text-blue-800' : 'text-gray-800'
                  }`}>
                    {plan.name}
                  </h3>
                  
                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold" style={{ color: '#170d5c' }}>
                        {currency} {plan.price}
                      </span>
                      <span className="text-gray-500 ml-2">{plan.period}</span>
                    </div>
                    {showDiscounts && plan.originalPrice && (
                      <div className="flex items-center justify-center mt-2">
                        <span className="text-gray-400 line-through mr-2">
                          {currency} {plan.originalPrice}
                        </span>
                        <span className="text-green-600 font-semibold text-sm">
                          {plan.discount}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => {
                    const FeatureIcon = feature.icon;
                    return (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          plan.popular ? 'bg-yellow-400 text-yellow-800' : plan.highlight ? 'bg-blue-400 text-blue-800' : 'bg-gray-200 text-gray-600'
                        }`}>
                          <FeatureIcon size={16} />
                        </div>
                        <span className="text-gray-700">{feature.text}</span>
                      </div>
                    );
                  })}
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-yellow-400 text-black hover:bg-yellow-500 shadow-lg shadow-yellow-400/30' 
                      : plan.highlight 
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/30' 
                      : 'bg-gray-800 text-white hover:bg-gray-900'
                  }`}
                >
                  {plan.buttonText}
                </button>

                {/* Glow Effect */}
                {hoveredPlan === plan.id && (
                  <div className={`absolute inset-0 rounded-3xl blur-xl opacity-30 animate-pulse ${
                    plan.popular ? 'bg-yellow-400' : plan.highlight ? 'bg-blue-400' : 'bg-gray-400'
                  }`}></div>
                )}
              </div>
            </div>
          ))}
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

export default PricingPlans;