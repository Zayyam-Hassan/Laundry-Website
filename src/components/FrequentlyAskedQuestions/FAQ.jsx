import React, { useState, useEffect, useRef } from 'react';
import { MessageCircleQuestion, Lightbulb, Info } from 'lucide-react';

const FAQ = () => {
  // Animation states
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showUnderline, setShowUnderline] = useState(false);
  const [showFAQItems, setShowFAQItems] = useState(false);
  const [showFAQCount, setShowFAQCount] = useState(false);
  const sectionRef = useRef(null);

  // FAQ data structure - easily appendable array
  const [faqData, setFaqData] = useState([
    {
      id: 1,
      question: "What areas do you serve?",
      answer: "We provide pickup and delivery services throughout Kuwait City, Hawalli, Ahmadi, and surrounding areas.",
      category: "service"
    },
    {
      id: 2,
      question: "How do I schedule a pickup?",
      answer: "You can schedule pickups through our mobile app, website, or by calling our customer service team.",
      category: "booking"
    },
    {
      id: 3,
      question: "What is your turnaround time?",
      answer: "Standard turnaround is 48-72 hours. We also offer express same-day service for urgent requests.",
      category: "service"
    },
    {
      id: 4,
      question: "What payment methods do you accept?",
      answer: "We accept cash, credit cards, debit cards, and mobile payment options including K-Net and Apple Pay.",
      category: "payment"
    },
    {
      id: 5,
      question: "Do you offer dry cleaning services?",
      answer: "Yes, we provide comprehensive dry cleaning services for delicate fabrics, suits, dresses, and specialty items.",
      category: "service"
    },
    {
      id: 6,
      question: "Is there a minimum order requirement?",
      answer: "Our minimum order is 5 KD for regular pickup and delivery. Express services may have different minimums.",
      category: "pricing"
    }
  ]);

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
          setTimeout(() => setShowFAQItems(true), 900);
          setTimeout(() => setShowFAQCount(true), 1200);
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
    if (isVisible && titleIndex < "Frequently Asked Questions".length) {
      const timer = setTimeout(() => {
        setDisplayedTitle("Frequently Asked Questions".slice(0, titleIndex + 1));
        setTitleIndex(titleIndex + 1);
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [titleIndex, isVisible]);

  return (
    <div ref={sectionRef} className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-20 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgba(23, 13, 92, 0.1)' }}></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgba(217, 180, 81, 0.1)', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgba(23, 13, 92, 0.1)', animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 relative mt-4">
          <div className="relative">
            <div className="relative inline-block">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight tracking-tight min-h-[3rem] flex items-center justify-center" style={{ color: '#170d5c' }}>
                {displayedTitle}
                <span 
                  className={`transition-all duration-300 ${isVisible && titleIndex < "Frequently Asked Questions".length ? 'animate-pulse' : 'opacity-0'}`} 
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
              Quick answers to common questions about our services.
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

        {/* FAQ Items */}
        <div className={`space-y-6 transform transition-all duration-500`}
             style={{ 
               opacity: showFAQItems ? 1 : 0,
               transform: showFAQItems ? 'translateY(0)' : 'translateY(30px)'
             }}>
          {faqData.map((faq, index) => (
            <div
              key={faq.id}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-blue-100/30 hover:border-gray-300/60 hover:-translate-y-1 group"
            >
              <div className="p-6 hover:bg-gradient-to-r hover:from-gray-50/50 hover:to-blue-50/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg" style={{ backgroundColor: 'rgba(23, 13, 92, 0.1)' }}>
                      <MessageCircleQuestion className="w-5 h-5" style={{ color: '#170d5c' }} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold leading-tight mb-3 group-hover:transition-colors duration-300" style={{ color: '#170d5c' }}>
                      {faq.question}
                    </h3>
                    <span className="inline-block px-4 py-1.5 text-xs font-semibold rounded-full shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300" style={{ backgroundColor: 'rgba(217, 180, 81, 0.1)', color: '#d9b451' }}>
                      {faq.category}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 ml-14">
                  <div className="h-px mb-4 group-hover:transition-all duration-300" style={{ background: 'linear-gradient(to right, rgba(23, 13, 92, 0.2), rgba(217, 180, 81, 0.2))' }}></div>
                  <p className="text-gray-700 leading-relaxed font-medium text-lg group-hover:text-gray-800 transition-colors duration-300">
                    {faq.answer}
                  </p>
                </div>
              </div>
              
              {/* Animated bottom accent */}
              <div className="h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ background: 'linear-gradient(to right, #170d5c, #d9b451)' }}></div>
            </div>
          ))}
        </div>

        {/* FAQ Count */}
        <div className={`mt-8 text-center transform transition-all duration-500`}
             style={{ 
               opacity: showFAQCount ? 1 : 0,
               transform: showFAQCount ? 'translateY(0)' : 'translateY(30px)'
             }}>
          <div className="inline-flex items-center px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full border shadow-sm hover:shadow-md hover:bg-white/80 transition-all duration-300" style={{ borderColor: 'rgba(23, 13, 92, 0.2)' }}>
            <span className="text-sm font-semibold" style={{ color: '#170d5c' }}>
              {faqData.length} Frequently Asked Questions
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;