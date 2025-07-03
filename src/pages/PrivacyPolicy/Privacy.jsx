import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, Shield, Eye, Lock, Share2, Database, UserCheck, Mail, Phone } from 'lucide-react';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showUnderline, setShowUnderline] = useState(false);
  const [showSections, setShowSections] = useState(false);
  const [showLoadingDots, setShowLoadingDots] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    document.title = "Privacy Policy - FarrariGo";
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          setIsVisible(true);
          setTimeout(() => setShowSubtitle(true), 300);
          setTimeout(() => setShowUnderline(true), 600);
          setTimeout(() => setShowSections(true), 900);
          setTimeout(() => setShowLoadingDots(true), 1200);
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, [hasAnimated]);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const sections = [
    {
      id: 'information-collect',
      title: 'Information We Collect',
      icon: <Database className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 rounded-xl border border-slate-600">
            <h4 className="font-semibold text-white mb-3 flex items-center">
              <UserCheck className="w-4 h-4 mr-2 text-blue-400" />
              Information You Provide
            </h4>
            <p className="text-slate-300 mb-4">
              You may provide personal data by filling out forms on our Site or App, contacting us via phone, email, or social media, or participating in surveys or promotions.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Name', 'Address', 'Email', 'Phone number'].map((item) => (
                <div key={item} className="bg-slate-700 px-3 py-2 rounded-lg border border-slate-600 text-sm font-medium text-slate-200 hover:bg-slate-600 transition-colors">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 rounded-xl border border-slate-600">
            <h4 className="font-semibold text-white mb-3 flex items-center">
              <Eye className="w-4 h-4 mr-2 text-purple-400" />
              Information We Collect Automatically
            </h4>
            <p className="text-slate-300 mb-4">
              When using our Site or App, we may automatically collect technical and usage data such as:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'IP address',
                'Browser and device information',
                'Time zone',
                'Page views and clickstream data',
                'Interaction data (scrolls, clicks)',
                'Error reports and load times'
              ].map((item) => (
                <div key={item} className="bg-slate-700 px-3 py-2 rounded-lg border border-slate-600 text-sm text-slate-200 hover:bg-slate-600 transition-colors">
                  • {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'how-we-use',
      title: 'How We Use Your Data',
      icon: <Lock className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <p className="text-slate-300">
            We process your data based on one or more of the following legal grounds:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-emerald-900/50 p-4 rounded-xl border border-emerald-700">
              <div className="text-emerald-300 font-semibold">Performance of Contract</div>
            </div>
            <div className="bg-blue-900/50 p-4 rounded-xl border border-blue-700">
              <div className="text-blue-300 font-semibold">Legal Compliance</div>
            </div>
            <div className="bg-orange-900/50 p-4 rounded-xl border border-orange-700">
              <div className="text-orange-300 font-semibold">Legitimate Interests</div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border border-slate-600 rounded-xl overflow-hidden">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-white">Purpose</th>
                  <th className="px-6 py-4 text-left font-semibold text-white">Data Type</th>
                  <th className="px-6 py-4 text-left font-semibold text-white">Legal Basis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-600">
                <tr className="hover:bg-slate-700 transition-colors">
                  <td className="px-6 py-4 text-slate-200">Registering a new customer</td>
                  <td className="px-6 py-4 text-slate-300">Identity, Contact</td>
                  <td className="px-6 py-4 text-slate-300">Performance of contract</td>
                </tr>
                <tr className="hover:bg-slate-700 transition-colors">
                  <td className="px-6 py-4 text-slate-200">Providing services, managing payments</td>
                  <td className="px-6 py-4 text-slate-300">Identity, Contact, Transaction</td>
                  <td className="px-6 py-4 text-slate-300">Performance of contract; Legitimate interest</td>
                </tr>
                <tr className="hover:bg-slate-700 transition-colors">
                  <td className="px-6 py-4 text-slate-200">Service notifications and feedback</td>
                  <td className="px-6 py-4 text-slate-300">Identity, Contact, Profile</td>
                  <td className="px-6 py-4 text-slate-300">Contract; Legal obligation</td>
                </tr>
                <tr className="hover:bg-slate-700 transition-colors">
                  <td className="px-6 py-4 text-slate-200">Site security and support</td>
                  <td className="px-6 py-4 text-slate-300">Identity, Technical</td>
                  <td className="px-6 py-4 text-slate-300">Legitimate interest; Legal obligation</td>
                </tr>
                <tr className="hover:bg-slate-700 transition-colors">
                  <td className="px-6 py-4 text-slate-200">Marketing and recommendations</td>
                  <td className="px-6 py-4 text-slate-300">Identity, Usage, Profile</td>
                  <td className="px-6 py-4 text-slate-300">Legitimate interest</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    },
    {
      id: 'data-sharing',
      title: 'Data Sharing',
      icon: <Share2 className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">We may share your data with:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Service providers (delivery partners, payment processors)',
              'IT and analytics support teams',
              'Legal or regulatory authorities when required',
              'Partners during business sale or restructure'
            ].map((item, index) => (
              <div key={index} className="bg-slate-800 p-4 rounded-lg border border-slate-600 hover:bg-slate-700 hover:shadow-lg transition-all">
                <div className="text-slate-200">• {item}</div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'your-rights',
      title: 'Your Rights',
      icon: <Shield className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">You have the right to:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Request access to your personal data',
              'Request corrections to inaccurate data',
              'Object to or restrict data processing',
              'Request deletion of your data',
              'Withdraw consent for marketing',
              'Request data portability'
            ].map((right, index) => (
              <div key={index} className="bg-blue-900/30 p-4 rounded-lg border border-blue-700 hover:bg-blue-900/50 transition-colors">
                <div className="text-blue-300 font-medium">✓ {right}</div>
              </div>
            ))}
          </div>
          <div className="bg-[#170d5c] text-white p-6 rounded-xl mt-6">
            <h4 className="font-semibold mb-2 text-[#d9b451]">Exercise Your Rights</h4>
            <p className="mb-4">To exercise these rights, contact us at:</p>
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-3 rounded-lg border border-slate-600">
              <strong className="text-white">Info@farrarigo.com</strong>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div ref={sectionRef} className="min-h-screen bg-gradient-to-br from-[#170d5c] via-white to-[#d9b451]/10 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgba(23, 13, 92, 0.10)' }}></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgba(217, 180, 81, 0.10)', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgba(23, 13, 92, 0.10)', animationDelay: '2s' }}></div>
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
                backgroundColor: i % 2 === 0 ? 'rgba(23, 13, 92, 0.3)' : 'rgba(217, 180, 81, 0.3)'
              }}
            />
          ))}
        </div>
      </div>
      {/* Header */}
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
              <Shield className="w-8 h-8 text-[#170d5c]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight tracking-tight min-h-[4rem] flex items-center justify-center animate-fadein" style={{ color: '#170d5c', letterSpacing: '0.04em' }}>
              Privacy Notice
            </h1>
            {showUnderline && (
              <div
                className="mx-auto h-1 rounded-full transition-all duration-1000 delay-500 animate-expand"
                style={{ width: '60%', background: 'linear-gradient(to right, #170d5c, #d9b451)' }}
              />
            )}
            {showSubtitle && (
              <p className="text-xl text-gray-700 max-w-2xl mx-auto animate-fadein-delay">
                Your privacy matters to us. Learn how we collect, use, and protect your personal information.
              </p>
            )}
            <div className="mt-8 inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm font-medium text-[#170d5c]">Last updated: January 2025</span>
            </div>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 relative z-10">
        {/* Introduction */}
        <div className={`bg-[#170d5c] rounded-2xl shadow-2xl border-2 border-[#170d5c]/20 p-8 mb-8 animate-fadein-delay`} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s cubic-bezier(.23,1.02,.57,1.01)' }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#d9b451' }}>Our Commitment to Your Privacy</h2>
          <div className="prose max-w-none">
            <p className="text-white leading-relaxed">
              Farrari Laundries respects your privacy and is committed to protecting your personal data. 
              This privacy notice outlines how we handle your personal information, your rights, and how 
              the law protects you when you use our services through:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-4 rounded-xl border border-slate-600">
                <div className="font-semibold text-white">🌐 Website</div>
                <div className="text-slate-200 text-sm">Farrarigo.com</div>
              </div>
              <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-4 rounded-xl border border-slate-600">
                <div className="font-semibold text-white">📱 Mobile Apps</div>
                <div className="text-slate-200 text-sm">iOS & Android apps</div>
              </div>
              <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-4 rounded-xl border border-slate-600">
                <div className="font-semibold text-white">💻 Platform</div>
                <div className="text-slate-200 text-sm">Web & mobile platform</div>
              </div>
              <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-4 rounded-xl border border-slate-600">
                <div className="font-semibold text-white">🧺 Services</div>
                <div className="text-slate-200 text-sm">Laundry & dry cleaning</div>
              </div>
            </div>
          </div>
        </div>
        {/* Expandable Sections */}
        <div className="space-y-4">
          {sections.map((section, idx) => (
            <div key={section.id} className={`bg-[#170d5c] rounded-2xl shadow-2xl border-2 border-[#d9b451]/20 overflow-hidden hover:shadow-3xl hover:border-[#d9b451]/40 transition-all animate-fadein-delay`} style={{ opacity: showSections ? 1 : 0, transform: showSections ? 'translateY(0)' : 'translateY(30px)', transitionDelay: `${idx * 100}ms`, transition: 'all 0.7s cubic-bezier(.23,1.02,.57,1.01)' }}>
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-8 py-6 text-left hover:bg-[#d9b451]/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#d9b451] focus:ring-inset"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 bg-[#d9b451]/10 rounded-full mr-4 border border-[#d9b451]/30">
                      <div className="text-[#d9b451]">
                        {section.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold" style={{ color: '#d9b451' }}>{section.title}</h3>
                  </div>
                  <div className="flex-shrink-0">
                    {activeSection === section.id ? (
                      <ChevronDown className="w-5 h-5 text-white" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-white" />
                    )}
                  </div>
                </div>
              </button>
              <DropdownContent isOpen={activeSection === section.id} className="dropdown-content px-8 border-t border-[#d9b451]/30 bg-[#170d5c]/90 animate-fadein-delay">
                <div className="text-white">{section.content}</div>
              </DropdownContent>
            </div>
          ))}
        </div>
        {/* Additional Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {/* Marketing */}
          <div className="bg-[#170d5c] rounded-2xl shadow-2xl border-2 border-[#d9b451]/20 p-6 animate-fadein-delay" style={{ opacity: showSections ? 1 : 0, transform: showSections ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s cubic-bezier(.23,1.02,.57,1.01)' }}>
            <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: '#d9b451' }}>
              <Mail className="w-5 h-5 mr-2 text-white" />
              Marketing Communications
            </h3>
            <p className="text-white text-sm mb-4">
              You may receive marketing communications from us if you have used our services and have not opted out.
            </p>
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-4 rounded-lg border border-slate-600">
              <p className="text-slate-200 text-sm font-medium">
                You can withdraw consent or opt out at any time via email or unsubscribe links.
              </p>
            </div>
          </div>
          {/* Security */}
          <div className="bg-[#170d5c] rounded-2xl shadow-2xl border-2 border-[#d9b451]/20 p-6 animate-fadein-delay" style={{ opacity: showSections ? 1 : 0, transform: showSections ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s cubic-bezier(.23,1.02,.57,1.01)' }}>
            <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: '#d9b451' }}>
              <Lock className="w-5 h-5 mr-2 text-white" />
              Data Security
            </h3>
            <p className="text-white text-sm mb-4">
              Your data is stored securely on our systems or our trusted partners' systems with appropriate protection measures.
            </p>
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-4 rounded-lg border border-slate-600">
              <p className="text-slate-200 text-sm font-medium">
                Keep your access credentials confidential for maximum security.
              </p>
            </div>
          </div>
        </div>
        {/* Contact Information */}
        <div className="bg-[#170d5c] text-white rounded-2xl shadow-2xl p-8 mt-12 border-2 border-[#d9b451]/30 animate-fadein-delay" style={{ opacity: showSections ? 1 : 0, transform: showSections ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s cubic-bezier(.23,1.02,.57,1.01)' }}>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Need Help or Have Questions?</h2>
            <p className="text-white/80">We're here to help you understand your privacy rights</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-full mb-4 border border-white/20">
                <Mail className="w-6 h-6 text-[#d9b451]" />
              </div>
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-white/80">Info@farrarigo.com</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-full mb-4 border border-white/20">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-white/80">+965 97588886</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-full mb-4 border border-white/20">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Visit Us</h3>
              <p className="text-white/80">Shuwaikh, Kuwait</p>
            </div>
          </div>
        </div>
        {/* Footer Note */}
        <div className="text-center mt-12 p-6 bg-[#170d5c] rounded-xl border-2 border-[#d9b451]/20 animate-fadein-delay" style={{ opacity: showSections ? 1 : 0, transform: showSections ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s cubic-bezier(.23,1.02,.57,1.01)' }}>
          <p className="text-white text-sm">
            <strong className="text-[#d9b451]">Policy Updates:</strong> We may update this policy occasionally. All changes will be posted on this page. 
            Please check back regularly for updates.
          </p>
        </div>
        {/* Animated loading dots at the bottom */}
        <div className={`mt-20 flex justify-center transform transition-all duration-500 ${showLoadingDots ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ 
                  animationDelay: `${i * 100}ms`,
                  background: i % 2 === 0 ? '#170d5c' : '#d9b451'
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      {/* Animations and styles */}
      <style jsx>{`
        @keyframes fadein {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadein-delay {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes expand {
          from { width: 0; }
          to { width: 60%; }
        }
        .animate-fadein {
          animation: fadein 1s cubic-bezier(0.4,0,0.2,1) both;
        }
        .animate-fadein-delay {
          animation: fadein-delay 1.2s cubic-bezier(0.4,0,0.2,1) both;
        }
        .animate-expand {
          animation: expand 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

function DropdownContent({ isOpen, children, className = '' }) {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState('0px');

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setMaxHeight((contentRef.current.scrollHeight + 100) + 'px');
    } else {
      setMaxHeight('0px');
    }
  }, [isOpen, children]);

  return (
    <div
      className={className}
      ref={wrapperRef}
      style={{
        maxHeight,
        opacity: isOpen ? 1 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.7s cubic-bezier(.23,1.02,.57,1.01), opacity 0.5s cubic-bezier(.23,1.02,.57,1.01), padding 0.5s',
        paddingTop: isOpen ? '1.5rem' : '0',
        paddingBottom: isOpen ? '2.5rem' : '0',
        willChange: 'max-height, opacity',
      }}
      aria-hidden={isOpen ? 'false' : 'true'}
    >
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  );
}

export default PrivacyPolicy;