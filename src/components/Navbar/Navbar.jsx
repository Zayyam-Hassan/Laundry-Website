import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Sparkles, BookOpen, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle services dropdown
  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  // Close services dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.services-dropdown')) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img
              className="h-10 w-auto"
              src="/logos/logo1.png"
              alt="FarrariGo"
            />
            <span className="ml-2 text-xl font-bold text-blue-900">FarrariGo</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-black border-b-2 border-yellow-400 px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-yellow-50 rounded-md">Home</Link>
            
            {/* Services Dropdown */}
            <div className="relative services-dropdown">
              <button
                onClick={toggleServices}
                className="text-gray-600 hover:text-black px-3 py-2 text-sm font-medium flex items-center transition-all duration-200 hover:bg-yellow-50 rounded-md group"
              >
                Services
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              <div className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 transform transition-all duration-300 ${isServicesOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
                <div className="p-4">
                  {/* Our Services */}
                  <Link to="/services" className="flex items-center p-3 rounded-lg hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50 transition-all duration-200 group">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">Our Services</h3>
                      <p className="text-xs text-gray-500 mt-1">Premium laundry solutions</p>
                    </div>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <ChevronDown className="h-4 w-4 text-gray-400 rotate-[-90deg]" />
                    </div>
                  </Link>

                  {/* Fabric Care Guide */}
                  <Link to="/fabric-care-guide" className="flex items-center p-3 rounded-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200 group mt-2">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <BookOpen className="h-5 w-5 text-white" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-200">Fabric Care Guide</h3>
                      <p className="text-xs text-gray-500 mt-1">Expert tips for maintenance</p>
                    </div>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <ChevronDown className="h-4 w-4 text-gray-400 rotate-[-90deg]" />
                    </div>
                  </Link>

                  {/* Our Process */}
                  <Link to="/our-process" className="flex items-center p-3 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200 group mt-2">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Settings className="h-5 w-5 text-white" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-200">Our Process</h3>
                      <p className="text-xs text-gray-500 mt-1">How we deliver quality</p>
                    </div>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <ChevronDown className="h-4 w-4 text-gray-400 rotate-[-90deg]" />
                    </div>
                  </Link>
                </div>
                
                {/* Bottom section with CTA */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-b-xl border-t border-gray-100">
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-2">Need help choosing?</p>
                    <Link to="/expert-advice" className="inline-flex items-center px-3 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-black text-xs font-medium rounded-lg transition-all duration-200 hover:scale-105">
                      Get Expert Advice
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/business" className="text-gray-600 hover:text-black px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-yellow-50 rounded-md">Business</Link>
            <Link to="/blog" className="text-gray-600 hover:text-black px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-yellow-50 rounded-md">Blog</Link>
            <Link to="/contact" className="text-gray-600 hover:text-black px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-yellow-50 rounded-md">Contact</Link>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/gift-cards" className="text-gray-600 hover:text-black px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-yellow-50 rounded-md">Gift Cards</Link>
            <Link to="/subscribe" className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg">
              Subscribe Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-black focus:outline-none transition-colors duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          <Link to="/" className="block px-3 py-2 text-base font-medium text-black border-l-4 border-yellow-400 bg-yellow-50 rounded-r-md">Home</Link>
          
          {/* Mobile Services Section */}
          <div className="space-y-2">
            <div className="px-3 py-2 text-base font-medium text-gray-600 border-l-4 border-transparent">Services</div>
            
            {/* Our Services Mobile */}
            <Link to="/services" className="block px-6 py-3 text-sm font-medium text-gray-600 hover:text-black hover:bg-yellow-50 rounded-md transition-all duration-200 flex items-center">
              <Sparkles className="h-4 w-4 mr-3 text-blue-500" />
              Our Services
            </Link>
            
            {/* Fabric Care Guide Mobile */}
            <Link to="/fabric-care-guide" className="block px-6 py-3 text-sm font-medium text-gray-600 hover:text-black hover:bg-green-50 rounded-md transition-all duration-200 flex items-center">
              <BookOpen className="h-4 w-4 mr-3 text-green-500" />
              Fabric Care Guide
            </Link>
            
            {/* Our Process Mobile */}
            <Link to="/our-process" className="block px-6 py-3 text-sm font-medium text-gray-600 hover:text-black hover:bg-purple-50 rounded-md transition-all duration-200 flex items-center">
              <Settings className="h-4 w-4 mr-3 text-purple-500" />
              Our Process
            </Link>
          </div>
          
          <Link to="/business" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-black hover:border-l-4 hover:border-yellow-400 transition-all duration-200">Business</Link>
          <Link to="/blog" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-black hover:border-l-4 hover:border-yellow-400 transition-all duration-200">Blog</Link>
          <Link to="/contact" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-black hover:border-l-4 hover:border-yellow-400 transition-all duration-200">Contact</Link>
          <Link to="/gift-cards" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-black hover:border-l-4 hover:border-yellow-400 transition-all duration-200">Gift Cards</Link>
          <Link to="/subscribe" className="block px-3 py-2 text-base font-medium bg-yellow-400 text-black rounded-md mt-4 hover:bg-yellow-500 transition-colors duration-200">Subscribe Now</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;