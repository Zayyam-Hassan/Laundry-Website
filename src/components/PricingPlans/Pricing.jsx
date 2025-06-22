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
  const [animateCards, setAnimateCards] = useState(false);

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
    setAnimateCards(true);
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
      relative rounded-3xl p-8 transition-all duration-700 ease-out cursor-pointer
      backdrop-blur-sm border-2 overflow-visible group
      transform-gpu will-change-transform flex flex-col h-full
    `;
    
    const hoverClasses = hoveredPlan === plan.id 
      ? 'scale-105 shadow-2xl shadow-blue-500/25' 
      : '';
    
    const otherCardsClasses = hoveredPlan && hoveredPlan !== plan.id 
      ? 'opacity-70 scale-95' 
      : '';

    const popularClasses = plan.popular 
      ? 'bg-gradient-to-br from-white via-yellow-50 to-amber-50 border-yellow-400 shadow-xl shadow-yellow-400/20' 
      : 'bg-white/90 border-gray-200 shadow-lg';

    const animationClasses = animateCards 
      ? `animate-fade-in-up` 
      : 'opacity-0';

    return `${baseClasses} ${hoverClasses} ${otherCardsClasses} ${popularClasses} ${animationClasses}`;
  };

  return (
    <div className={`relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 px-4 overflow-hidden ${className}`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}} />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#2c4494] via-[#3a5bb8] to-[#4c6cd6] bg-clip-text text-transparent mb-6">
            {title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto pt-8">
          {plansData.map((plan, index) => (
            <div
              key={plan.id}
              className={getPlanCardClasses(plan, index)}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
              onClick={() => handlePlanClick(plan)}
              style={{
                animationDelay: `${index * 200}ms`
              }}
            >
              {/* Animated Border Gradient */}
              <div className={`
                absolute inset-0 rounded-3xl p-0.5 transition-opacity duration-500
                ${plan.popular ? 'bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400' : 'bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400'}
                ${hoveredPlan === plan.id ? 'opacity-100' : 'opacity-0'}
              `}>
                <div className="w-full h-full bg-white rounded-3xl" />
              </div>

              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-8 py-3 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 animate-bounce">
                    <Crown size={18} className="fill-current" />
                    Most Popular
                    <Sparkles size={16} className="animate-pulse" />
                  </div>
                </div>
              )}

              {/* Discount Badge */}
              {showDiscounts && plan.discount && (
                <div className="absolute top-6 right-6 z-10">
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {plan.discount}
                  </div>
                </div>
              )}

              {/* Plan Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-[#2c4494] mb-4">
                    {plan.name}
                  </h3>
                  <div className="space-y-2">
                    {showDiscounts && plan.originalPrice && (
                      <div className="text-lg text-gray-400 line-through">
                        {currency}{plan.originalPrice}
                      </div>
                    )}
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#2c4494] to-[#4c6cd6] bg-clip-text text-transparent">
                        {currency}{plan.price}
                      </span>
                      <span className="text-gray-500 text-lg ml-2">
                        {plan.period}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature, featureIndex) => {
                    const IconComponent = feature.icon;
                    return (
                      <div
                        key={featureIndex}
                        className={`
                          flex items-center gap-4 transition-all duration-500
                          ${hoveredPlan === plan.id ? 'transform translate-x-2' : ''}
                        `}
                        style={{
                          transitionDelay: hoveredPlan === plan.id ? `${featureIndex * 100}ms` : '0ms'
                        }}
                      >
                        <div className={`
                          rounded-full p-3 transition-all duration-300 flex items-center justify-center
                          ${plan.popular ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-black' : 'bg-gradient-to-r from-blue-100 to-indigo-100 text-[#2c4494]'}
                          ${hoveredPlan === plan.id ? 'scale-110 shadow-lg' : ''}
                        `}>
                          <IconComponent size={18} />
                        </div>
                        <span className="text-gray-700 font-medium flex-1">
                          {feature.text}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* CTA Button - This will be pushed to bottom */}
                <div className="mt-auto">
                  <button
                    className={`
                      w-full py-4 px-6 rounded-2xl font-bold text-lg
                      transition-all duration-300 transform
                      ${plan.popular 
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-black hover:from-yellow-500 hover:to-orange-500' 
                        : 'bg-gradient-to-r from-[#2c4494] to-[#4c6cd6] text-white hover:from-[#3a5bb8] hover:to-[#5c7ae0]'
                      }
                      ${hoveredPlan === plan.id ? 'scale-105 shadow-xl' : ''}
                      hover:scale-105 hover:shadow-xl
                      flex items-center justify-center gap-3
                      group-hover:gap-4
                      ${selectedPlan === plan.id ? 'ring-4 ring-blue-300' : ''}
                    `}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlanClick(plan);
                    }}
                  >
                    {plan.buttonText}
                    <ArrowRight 
                      size={20} 
                      className={`
                        transition-all duration-300
                        ${hoveredPlan === plan.id ? 'translate-x-2' : ''}
                      `}
                    />
                  </button>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className={`
                absolute inset-0 rounded-3xl transition-opacity duration-500 pointer-events-none
                ${plan.popular 
                  ? 'bg-gradient-to-r from-yellow-400/10 via-orange-400/10 to-yellow-400/10' 
                  : 'bg-gradient-to-r from-blue-400/10 via-indigo-400/10 to-blue-400/10'
                }
                ${hoveredPlan === plan.id ? 'opacity-100' : 'opacity-0'}
              `} />
            </div>
          ))}
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

export default PricingPlans;