import React, { useEffect, useState, useRef } from 'react';
import { Maximize2, Minimize2, Calendar, Sparkles } from 'lucide-react';

const BookingPage = () => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showUnderline, setShowUnderline] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  
  const containerRef = useRef(null);
  const popupContainerRef = useRef(null);
  const sectionRef = useRef(null);
  const scriptLoadedRef = useRef(false);
  
  const title = "Book Your Service";

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          setTimeout(() => setShowSubtitle(true), 300);
          setTimeout(() => setShowUnderline(true), 600);
          setTimeout(() => setShowBookingForm(true), 900);
        }
      },
      { 
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

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

  const initializeCleanCloud = (containerId, height) => {
    if (window.CleanCloudWebApp && document.getElementById(containerId)) {
      try {
        window.CleanCloudWebApp(`#${containerId}`, 37305, {
          width: 'auto',
          height: height,
          welcomeMessage: true,
          theme: {
            border: {
              visible: true,
              color: "#d9b451",
              width: 2,
            }
          }
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing CleanCloud:', error);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (scriptLoadedRef.current) {
      setTimeout(() => {
        initializeCleanCloud('myStoreContainer', isMaximized ? 900 : 700);
        if (isMaximized) {
          initializeCleanCloud('myStoreContainerPopup', 900);
        }
      }, 100);
      return;
    }

    const cssLink = document.createElement('link');
    cssLink.href = 'https://cleancloudapp.com/webapp/public/webapp/cleancloud.css';
    cssLink.rel = 'stylesheet';
    document.head.appendChild(cssLink);

    const script = document.createElement('script');
    script.src = 'https://cleancloudapp.com/webapp/public/webapp/cleancloud.js';
    script.type = 'text/javascript';
    
    script.onload = () => {
      scriptLoadedRef.current = true;
      setTimeout(() => {
        initializeCleanCloud('myStoreContainer', 700);
      }, 300);
    };
    
    script.onerror = () => {
      console.error('Failed to load CleanCloud script');
      setIsLoading(false);
    };
    
    document.head.appendChild(script);

    return () => {
      try {
        if (document.head.contains(cssLink)) {
          document.head.removeChild(cssLink);
        }
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      } catch (error) {
        console.error('Cleanup error:', error);
      }
    };
  }, []);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
    if (!isMaximized) {
      setTimeout(() => {
        initializeCleanCloud('myStoreContainerPopup', 900);
      }, 100);
    }
  };

  return (
    <div 
      ref={sectionRef}
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center" 
      style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header Section - Matching ProcessStepBusiness */}
        <div className="text-center mb-16 mt-4">
          <div className="relative">
            <div className="relative inline-block">
              <h1 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight tracking-tight min-h-[3rem] flex items-center justify-center" 
                style={{ color: '#170d5c' }}
              >
                {displayedTitle}
                <span 
                  className={`transition-all duration-300 ${isVisible && titleIndex < title.length ? 'animate-pulse' : 'opacity-0'}`} 
                  style={{ color: '#d9b451' }}
                >
                  |
                </span>
              </h1>
            </div>
            <p 
              className={`text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium mt-6 transform transition-all duration-500`}
              style={{ 
                opacity: showSubtitle ? 1 : 0,
                transform: showSubtitle ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              Schedule your appointment with ease and convenience
            </p>
            {/* Colored bar */}
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

        {/* Booking Form Container */}
        <div className={`relative transform transition-all duration-1000 ease-out ${
          showBookingForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          
          {/* Header with Maximize Button */}
          <div className="flex items-center justify-between mb-8 px-4">
            <div className="flex items-center space-x-4">
              <div 
                className="p-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: '#170d5c' }}
              >
                <Calendar className="w-8 h-8" style={{ color: '#d9b451' }} />
              </div>
              <div>
                <h2 className="text-2xl font-bold" style={{ color: '#170d5c' }}>
                  Booking System
                </h2>
                <p className="text-gray-600 text-sm font-medium">
                  Enhanced experience available
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-2 text-gray-600 text-sm">
                <Sparkles className="w-4 h-4" style={{ color: '#d9b451' }} />
                <span>Full Screen Mode</span>
              </div>
              <button
                onClick={toggleMaximize}
                className="group relative overflow-hidden px-6 py-3 rounded-xl font-semibold transition-all duration-500 ease-out transform hover:scale-105 shadow-lg hover:shadow-xl"
                style={{ 
                  backgroundColor: '#170d5c',
                  color: '#fff'
                }}
              >
                {/* Shimmer effect */}
                <div 
                  className="absolute inset-0 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"
                  style={{
                    background: 'linear-gradient(to right, transparent, rgba(217, 180, 81, 0.3), transparent)'
                  }}
                ></div>
                
                <div className="relative flex items-center space-x-2">
                  {isMaximized ? (
                    <>
                      <Minimize2 className="w-5 h-5" />
                      <span>Minimize</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-5 h-5" />
                      <span>Maximize</span>
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Main Booking Container */}
          <div className={`relative w-full mx-auto transition-all duration-500 ease-out rounded-2xl shadow-lg ${
            isMaximized 
              ? 'max-w-7xl p-8 shadow-2xl' 
              : 'max-w-5xl p-6'
          }`} style={{ backgroundColor: '#fff', border: '2px solid #d9b451' }}>
            
            {/* CleanCloud Container */}
            <div 
              ref={containerRef}
              id="myStoreContainer" 
              className={`w-full transition-all duration-500 ease-out relative ${
                isMaximized ? 'min-h-[900px]' : 'min-h-[700px]'
              }`}
            />
            
            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl z-10">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 border-4 rounded-full animate-spin" style={{ borderColor: '#d9b451', borderTopColor: 'transparent' }}></div>
                    <div className="absolute inset-0 w-12 h-12 border-4 rounded-full animate-spin" style={{ borderColor: '#170d5c', borderTopColor: 'transparent', animationDirection: 'reverse' }}></div>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold" style={{ color: '#170d5c' }}>Loading Booking System</p>
                    <p className="text-gray-600 text-sm mt-1">Please wait a moment...</p>
                  </div>
                </div>
              </div>
            )}

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full opacity-20" style={{ backgroundColor: '#d9b451' }}></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 rounded-full opacity-30" style={{ backgroundColor: '#170d5c' }}></div>
          </div>
        </div>

        {/* Popup Overlay */}
        {isMaximized && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300"
            onClick={toggleMaximize}
          />
        )}
        
        {/* Maximized Popup */}
        {isMaximized && (
          <div className="fixed inset-4 z-50 bg-white rounded-2xl shadow-2xl overflow-hidden" style={{ border: '2px solid #d9b451' }}>
            {/* Popup Header */}
            <div className="flex justify-between items-center p-6 border-b" style={{ backgroundColor: '#170d5c', borderColor: '#d9b451' }}>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: '#d9b451' }}>
                  <Calendar className="w-6 h-6" style={{ color: '#170d5c' }} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Enhanced Booking Experience</h2>
                  <p className="text-gray-200 text-sm">Full-screen booking interface</p>
                </div>
              </div>
              <button
                onClick={toggleMaximize}
                className="group px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                style={{ backgroundColor: '#d9b451', color: '#170d5c' }}
              >
                <div className="flex items-center space-x-2">
                  <Minimize2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Close</span>
                </div>
              </button>
            </div>
            
            {/* Popup Content */}
            <div className="p-6 h-full overflow-auto">
              <div 
                ref={popupContainerRef}
                id="myStoreContainerPopup" 
                className="w-full min-h-[calc(100vh-200px)]"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;