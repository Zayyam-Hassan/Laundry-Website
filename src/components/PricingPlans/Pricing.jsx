import React, { useState, useEffect } from 'react';
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
      id: 'luxury',
      name: 'Luxury',
      price: '75',
      originalPrice: '99',
      period: 'per month',
      discount: '24% OFF',
      features: [
        { text: 'Unlimited pieces', icon: Infinity },
        { text: 'All premium services', icon: Star },
        { text: 'Same-day service available', icon: Zap },
        { text: '24/7 support', icon: Headphones },
        { text: 'White-glove service', icon: Shield },
        { text: 'Custom care instructions', icon: CheckCircle2 },
        { text: 'Wardrobe consultation', icon: Crown }
      ],
      buttonText: 'Choose Luxury',
      popular: false,
      highlight: false
    }
  ];

  const plansData = plans || defaultPlans;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan.id);
    if (onPlanSelect) {
      onPlanSelect(plan);
    } else {
      // Default behavior - redirect to subscribe page
      window.location.href = `/subscribe?plan=${plan.id}`;
    }
  };

  const getPlanCardClasses = (plan, index) => {
    const baseClasses = `
      relative rounded-2xl p-3 transition-all duration-300 ease-out cursor-pointer
      backdrop-blur-sm border overflow-visible group
      transform-gpu will-change-transform flex flex-col h-full
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
    `;
    
    const hoverClasses = hoveredPlan === plan.id 
      ? 'scale-[1.02] shadow-2xl' 
      : '';
    
    const otherCardsClasses = hoveredPlan && hoveredPlan !== plan.id 
      ? 'opacity-90 scale-[0.99]' 
      : '';

    const popularClasses = plan.popular 
      ? 'bg-gradient-to-br from-white via-yellow-50 to-amber-50 border-yellow-300 shadow-lg shadow-yellow-400/20' 
      : 'bg-white/90 border-gray-200 shadow-md';

    return `${baseClasses} ${hoverClasses} ${otherCardsClasses} ${popularClasses}`;
  };

  return (
    <div className={`relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-16 px-4 overflow-hidden ${className}`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '0s' }}
        />
        <div 
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '2s' }} 
        />
        <div 
          className="absolute top-1/2 left-1/2 w-56 h-56 bg-gradient-to-r from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '4s' }} 
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div 
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          <div className="relative inline-block">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4 leading-tight tracking-tight">
              {title}
            </h1>
            {/* Animated underline */}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-full transition-all duration-1000 delay-500"
                 style={{ width: isVisible ? '50%' : '0%' }} />
          </div>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium mt-6 transform transition-all duration-1000 delay-300"
             style={{ 
               opacity: isVisible ? 1 : 0,
               transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
             }}>
            {subtitle}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plansData.map((plan, index) => (
            <div
              key={plan.id}
              className={getPlanCardClasses(plan, index)}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
              onClick={() => handlePlanClick(plan)}
              style={{
                transitionDelay: `${index * 150}ms`,
                zIndex: hoveredPlan === plan.id ? 10 : 1
              }}
            >
              {/* Animated Border Gradient */}
              <div className={`
                absolute inset-0 rounded-2xl p-[1px] transition-all duration-300 ease-out
                ${plan.popular ? 'bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400' : 'bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400'}
                ${hoveredPlan === plan.id ? 'opacity-80' : 'opacity-0'}
              `}>
                <div className="w-full h-full bg-white rounded-[15px]" />
              </div>

              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 -left-2 z-20">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
                    <Crown size={16} className="fill-current" />
                    Most Popular
                    <Sparkles size={14} />
                  </div>
                </div>
              )}

              {/* Discount Badge */}
              {showDiscounts && plan.discount && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-sm">
                    {plan.discount}
                  </div>
                </div>
              )}

              {/* Floating Particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute rounded-full transition-opacity duration-300 ease-out ${
                      plan.popular 
                        ? 'bg-yellow-400/60' 
                        : 'bg-blue-400/60'
                    }`}
                    style={{
                      width: `${Math.random() * 4 + 2}px`,
                      height: `${Math.random() * 4 + 2}px`,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      opacity: hoveredPlan === plan.id ? 0.8 : 0,
                      transform: hoveredPlan === plan.id 
                        ? `translate(${Math.sin(Date.now() / 1000 + i) * 10}px, ${Math.cos(Date.now() / 1000 + i) * 10}px)` 
                        : 'translate(0, 0)',
                      transition: 'all 0.3s ease-out'
                    }}
                  />
                ))}
              </div>

              {/* Plan Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Plan Header */}
                <div className="text-center mb-3">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 transition-colors duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-800 group-hover:to-indigo-700 group-hover:bg-clip-text">
                    {plan.name}
                  </h3>
                  <div className="space-y-1">
                    {showDiscounts && plan.originalPrice && (
                      <div className="text-sm text-gray-400 line-through">
                        {currency}{plan.originalPrice}
                      </div>
                    )}
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                        {currency}{plan.price}
                      </span>
                      <span className="text-gray-500 text-sm ml-1">
                        {plan.period}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-4 flex-grow">
                  {plan.features.map((feature, featureIndex) => {
                    const IconComponent = feature.icon;
                    return (
                      <div
                        key={featureIndex}
                        className={`
                          flex items-center gap-3 transition-all duration-300 ease-out
                          p-1.5 rounded-lg
                          ${hoveredPlan === plan.id ? 'transform translate-x-1 bg-white/40 shadow-sm' : 'transform translate-x-0'}
                        `}
                        style={{
                          transitionDelay: hoveredPlan === plan.id ? `${featureIndex * 30}ms` : '0ms'
                        }}
                      >
                        <div className={`
                          rounded-full p-2 transition-all duration-300 ease-out flex items-center justify-center
                          ${plan.popular 
                            ? 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-yellow-700' 
                            : 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700'
                          }
                          ${hoveredPlan === plan.id ? 'scale-105 shadow-sm' : 'scale-100'}
                        `}>
                          <IconComponent size={16} />
                        </div>
                        <span className="text-gray-700 text-sm font-medium flex-1">
                          {feature.text}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* CTA Button */}
                <div className="mt-auto">
                  <button
                    className={`
                      w-full py-3 px-4 rounded-xl font-bold text-sm
                      transition-all duration-300 ease-out transform
                      ${plan.popular 
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-black hover:from-yellow-500 hover:to-orange-500' 
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                      }
                      ${hoveredPlan === plan.id ? 'scale-[1.02] shadow-lg' : 'scale-100'}
                      flex items-center justify-center gap-2
                      ${selectedPlan === plan.id ? 'ring-2 ring-blue-300' : ''}
                    `}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlanClick(plan);
                    }}
                  >
                    {plan.buttonText}
                    <ArrowRight 
                      size={16} 
                      className={`
                        transition-transform duration-300 ease-out
                        ${hoveredPlan === plan.id ? 'translate-x-1' : 'translate-x-0'}
                      `}
                    />
                  </button>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className={`
                absolute inset-0 rounded-2xl transition-opacity duration-300 ease-out pointer-events-none
                ${plan.popular 
                  ? 'bg-gradient-to-r from-yellow-400/5 via-orange-400/5 to-yellow-400/5' 
                  : 'bg-gradient-to-r from-blue-400/5 via-indigo-400/5 to-blue-400/5'
                }
                ${hoveredPlan === plan.id ? 'opacity-100' : 'opacity-0'}
              `} />

              {/* Shimmer Effect */}
              <div className={`
                absolute inset-0 -translate-x-full transition-transform duration-700 ease-out
                bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none
                ${hoveredPlan === plan.id ? 'translate-x-full' : '-translate-x-full'}
              `} />
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PricingPlans;