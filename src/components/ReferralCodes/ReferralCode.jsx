import React, { useState, useEffect } from 'react';
import { Copy, Share2, Sparkles, Users } from 'lucide-react';

function ReferralComponent() {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const referralCode = "FARR2024USER";

  useEffect(() => {
    setMounted(true);
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 blur-3xl rounded-full animate-pulse"></div>
          <div className="relative">
            <div className="relative inline-block">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4 leading-tight tracking-tight">
                Start Referring Today
              </h1>
              {/* Animated underline */}
              <div
                className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-full transition-all duration-1000 delay-500 ${
                  mounted ? 'w-1/2' : 'w-0'
                }`}
              />
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium mt-6">
              Share your unique referral code with friends and start earning rewards.
            </p>
          </div>
        </div>

        {/* Main Card */}
        <div className="relative group">
          {/* Animated background glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-500 animate-pulse"></div>
          
          {/* Card */}
          <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 sm:p-12 overflow-hidden">
            {/* Floating particles */}
            <div className="absolute top-4 right-4 text-blue-400/30 animate-bounce">
              <Sparkles size={24} />
            </div>
            <div className="absolute bottom-4 left-4 text-purple-400/30 animate-bounce" style={{ animationDelay: '0.5s' }}>
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
                  className={`group relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 ${
                    !isFlipped ? 'cursor-not-allowed' : ''
                  }`}
                >
                  {/* Button glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                  
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
                  className={`group relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 ${
                    !isFlipped ? 'cursor-not-allowed' : ''
                  }`}
                >
                  {/* Button glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                  
                  <div className="relative flex items-center gap-3">
                    <Copy size={20} className={`transition-transform duration-300 ${copied ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                  </div>
                  
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  
                  {/* Success ripple effect */}
                  {copied && (
                    <div className="absolute inset-0 bg-green-400/30 rounded-xl animate-ping"></div>
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
        <div className="text-center mt-8 text-gray-500">
          <p className="text-sm">
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