import React, { useState, useEffect, useRef } from 'react';
import { Copy, Share2, Sparkles, Users } from 'lucide-react';

function ReferralComponent() {
  // Animation states
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showUnderline, setShowUnderline] = useState(false);
  const [showMainCard, setShowMainCard] = useState(false);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const sectionRef = useRef(null);

  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const referralCode = "FARR2024USER";

  useEffect(() => {
    setMounted(true);
  }, []);

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
          setTimeout(() => setShowMainCard(true), 900);
          setTimeout(() => setShowAdditionalInfo(true), 1200);
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
    if (isVisible && titleIndex < "Start Referring Today".length) {
      const timer = setTimeout(() => {
        setDisplayedTitle("Start Referring Today".slice(0, titleIndex + 1));
        setTitleIndex(titleIndex + 1);
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [titleIndex, isVisible]);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const message = `Hey! Use my referral code ${referralCode} to get started and earn rewards! 🎉`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-20 px-6 relative overflow-hidden flex items-center justify-center">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgba(23, 13, 92, 0.1)' }}></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgba(217, 180, 81, 0.1)', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgba(23, 13, 92, 0.1)', animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12 relative mt-4">
          <div className="relative">
            <div className="relative inline-block">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight tracking-tight min-h-[3rem] flex items-center justify-center" style={{ color: '#170d5c' }}>
                {displayedTitle}
                <span 
                  className={`transition-all duration-300 ${isVisible && titleIndex < "Start Referring Today".length ? 'animate-pulse' : 'opacity-0'}`} 
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
              Share your unique referral code with friends and start earning rewards.
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

        {/* Main Card */}
        <div className={`relative group transform transition-all duration-500`}
             style={{ 
               opacity: showMainCard ? 1 : 0,
               transform: showMainCard ? 'translateY(0)' : 'translateY(30px)'
             }}>
          {/* Animated background glow */}
          <div className="absolute -inset-1 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-500 animate-pulse" style={{ backgroundColor: 'rgba(23, 13, 92, 0.1)' }}></div>
          
          {/* Card */}
          <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 sm:p-12 overflow-hidden">
            {/* Floating particles */}
            <div className="absolute top-4 right-4 animate-bounce" style={{ color: 'rgba(23, 13, 92, 0.3)' }}>
              <Sparkles size={24} />
            </div>
            <div className="absolute bottom-4 left-4 animate-bounce" style={{ color: 'rgba(217, 180, 81, 0.3)', animationDelay: '0.5s' }}>
              <Users size={20} />
            </div>

            {/* Content */}
            <div className="text-center space-y-8">
              {/* Referral Code Label */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Your Referral Code
                </p>
                
                {/* Code Display with Flip Animation */}
                <div className="relative h-32">
                  {!isFlipped ? (
                    /* Hidden State */
                    <div 
                      className="bg-gradient-to-r from-slate-100 to-gray-100 rounded-xl p-6 border border-gray-200 shadow-inner h-full flex items-center justify-center group hover:from-blue-50 hover:to-indigo-50 hover:border-blue-200 transition-all duration-300 cursor-pointer transform hover:scale-105"
                      onClick={handleFlip}
                    >
                      <div className="text-center space-y-4">
                        <div className="flex justify-center space-x-2">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <div
                              key={i}
                              className="w-3 h-3 bg-gray-400 rounded-full animate-pulse group-hover:bg-blue-400 transition-colors"
                              style={{ animationDelay: `${i * 0.1}s` }}
                            />
                          ))}
                        </div>
                        <p className="text-lg font-semibold text-gray-600 group-hover:text-blue-600 transition-colors">
                          Click to Reveal Your Code
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* Revealed State */
                    <div 
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 shadow-inner h-full flex items-center justify-center relative overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300"
                      onClick={handleFlip}
                    >
                      {/* Animated background particles */}
                      <div className="absolute inset-0 opacity-20">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-2 h-2 bg-blue-500 rounded-full animate-ping"
                            style={{
                              left: `${10 + (i * 7)}%`,
                              top: `${20 + (i % 3) * 20}%`,
                              animationDelay: `${i * 0.2}s`,
                              animationDuration: '2s'
                            }}
                          />
                        ))}
                      </div>
                      
                      <div className="text-center space-y-3 relative z-10">
                        <div className="text-4xl sm:text-5xl font-bold text-blue-900 tracking-wider font-mono animate-bounce">
                          {referralCode}
                        </div>
                        <p className="text-sm text-blue-600 font-medium flex items-center justify-center gap-2">
                          🎉 <span className="animate-pulse">Code Revealed!</span> 🎉
                        </p>
                        <p className="text-xs text-blue-400">
                          Click to hide again
                        </p>
                      </div>

                      {/* Success glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-indigo-400/10 rounded-xl animate-pulse"></div>
                      
                      {/* Celebration confetti effect */}
                      <div className="absolute inset-0 pointer-events-none">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping"
                            style={{
                              left: `${20 + i * 15}%`,
                              top: `${10 + (i % 2) * 60}%`,
                              animationDelay: `${i * 0.3}s`,
                              animationDuration: '1.5s'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Flip instruction */}
                <p className="text-xs text-gray-400 animate-pulse">
                  {isFlipped ? '🔓 Code is now visible - you can copy or share it!' : '👆 Tap the area above to unlock your referral code'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-500 ${
                isFlipped ? 'opacity-100 transform translate-y-0' : 'opacity-40 transform translate-y-4 pointer-events-none'
              }`}>
                {/* WhatsApp Share Button */}
                <button
                  onClick={handleWhatsAppShare}
                  disabled={!isFlipped}
                  className={`group relative overflow-hidden text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 ${
                    !isFlipped ? 'cursor-not-allowed' : ''
                  }`}
                  style={{ backgroundColor: '#25D366' }}
                >
                  {/* Button glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" style={{ backgroundColor: '#25D366' }}></div>
                  
                  <div className="relative flex items-center gap-3">
                    <Share2 size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                    <span>Share via WhatsApp</span>
                  </div>
                  
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </button>

                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  disabled={!isFlipped}
                  className={`group relative overflow-hidden text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 ${
                    !isFlipped ? 'cursor-not-allowed' : ''
                  }`}
                  style={{ backgroundColor: '#d9b451' }}
                >
                  {/* Button glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" style={{ backgroundColor: '#d9b451' }}></div>
                  
                  <div className="relative flex items-center gap-3">
                    <Copy size={20} className={`transition-transform duration-300 ${copied ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                  </div>
                  
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  
                  {/* Success ripple effect */}
                  {copied && (
                    <div className="absolute inset-0 rounded-xl animate-ping" style={{ backgroundColor: 'rgba(217, 180, 81, 0.3)' }}></div>
                  )}
                </button>
              </div>

              {/* Success Message */}
              {copied && isFlipped && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 animate-fadeIn">
                  <p className="text-green-800 font-medium flex items-center justify-center gap-2">
                    ✅ <span>Referral code copied to clipboard!</span> 🚀
                  </p>
                </div>
              )}
            </div>

            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-2xl"></div>
              <div className="absolute top-4 left-4 w-12 h-12 border-2 border-blue-300 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
              <div className="absolute bottom-8 right-8 w-8 h-8 border-2 border-purple-300 rounded-full animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }}></div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className={`text-center mt-8 transform transition-all duration-500`}
             style={{ 
               opacity: showAdditionalInfo ? 1 : 0,
               transform: showAdditionalInfo ? 'translateY(0)' : 'translateY(30px)'
             }}>
          <p className="text-sm" style={{ color: '#170d5c' }}>
            Earn rewards for every successful referral • Terms and conditions apply
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}

export default ReferralComponent;