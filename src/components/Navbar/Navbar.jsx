import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  BookOpen,
  Settings,
} from "lucide-react";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isGiftCardEnabled, setIsGiftCardEnabled] = useState(false);
  const location = useLocation();

  // Helper function to check if link is active
  const isActiveLink = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // Check if any services page is active
  const isServicesActive = () => {
    return (
      isActiveLink("/services") ||
      isActiveLink("/fabrics") ||
      isActiveLink("/process")
    );
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      if (!event.target.closest(".services-dropdown")) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-gray-50 shadow-lg" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img
              className="h-10 w-auto"
              src="/logos/logo1.png"
              alt="FarrariGo"
            />
            <span
              className="ml-2 text-xl font-bold"
              style={{ color: "#170d5c" }}
            >
              FarrariGo
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md ${
                isActiveLink("/")
                  ? "border-b-2 bg-gray-100"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              style={
                isActiveLink("/")
                  ? {
                      color: "#170d5c",
                      borderBottomColor: "#d9b451",
                    }
                  : {
                      color: "#6b7280",
                    }
              }
              onMouseEnter={(e) =>
                !isActiveLink("/") && (e.target.style.color = "#170d5c")
              }
              onMouseLeave={(e) =>
                !isActiveLink("/") && (e.target.style.color = "#6b7280")
              }
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div className="relative services-dropdown">
              <button
                onClick={toggleServices}
                className={`px-3 py-2 text-sm font-medium flex items-center transition-all duration-200 rounded-md group ${
                  isServicesActive()
                    ? "border-b-2 bg-gray-100"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                style={
                  isServicesActive()
                    ? {
                        color: "#170d5c",
                        borderBottomColor: "#d9b451",
                      }
                    : {
                        color: "#6b7280",
                      }
                }
                onMouseEnter={(e) =>
                  !isServicesActive() && (e.target.style.color = "#170d5c")
                }
                onMouseLeave={(e) =>
                  !isServicesActive() && (e.target.style.color = "#6b7280")
                }
              >
                Services
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                    isServicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-0 mt-2 w-64 bg-gray-50 rounded-xl shadow-2xl border border-gray-200 transform transition-all duration-300 ${
                  isServicesOpen
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="p-4">
                  {/* Our Services */}
                  <Link
                    to="/services"
                    className={`flex items-center p-3 rounded-lg transition-all duration-200 group ${
                      isActiveLink("/services")
                        ? "bg-gray-100 border-l-4"
                        : "hover:bg-gray-100"
                    }`}
                    style={
                      isActiveLink("/services")
                        ? {
                            borderLeftColor: "#170d5c",
                          }
                        : {}
                    }
                  >
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
                      style={{
                        background:
                          "linear-gradient(to bottom right, #170d5c, #2d1b69)",
                      }}
                    >
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div className="ml-3">
                      <h3
                        className={`text-sm font-semibold transition-colors duration-200`}
                        style={{
                          color: isActiveLink("/services")
                            ? "#170d5c"
                            : "#111827",
                        }}
                      >
                        Our Services
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Premium laundry solutions
                      </p>
                    </div>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <ChevronDown className="h-4 w-4 text-gray-400 rotate-[-90deg]" />
                    </div>
                  </Link>

                  {/* Fabric Care Guide */}
                  <Link
                    to="/fabrics"
                    className={`flex items-center p-3 rounded-lg transition-all duration-200 group mt-2 ${
                      isActiveLink("/fabrics")
                        ? "bg-gray-100 border-l-4"
                        : "hover:bg-gray-100"
                    }`}
                    style={
                      isActiveLink("/fabrics")
                        ? {
                            borderLeftColor: "#d9b451",
                          }
                        : {}
                    }
                  >
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
                      style={{
                        background:
                          "linear-gradient(to bottom right, #d9b451, #c49b42)",
                      }}
                    >
                      <BookOpen className="h-5 w-5 text-white" />
                    </div>
                    <div className="ml-3">
                      <h3
                        className={`text-sm font-semibold transition-colors duration-200`}
                        style={{
                          color: isActiveLink("/fabrics")
                            ? "#d9b451"
                            : "#111827",
                        }}
                      >
                        Fabric Care Guide
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Expert tips for maintenance
                      </p>
                    </div>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <ChevronDown className="h-4 w-4 text-gray-400 rotate-[-90deg]" />
                    </div>
                  </Link>

                  {/* Our Process */}
                  <Link
                    to="/process"
                    className={`flex items-center p-3 rounded-lg transition-all duration-200 group mt-2 ${
                      isActiveLink("/process")
                        ? "bg-gray-100 border-l-4"
                        : "hover:bg-gray-100"
                    }`}
                    style={
                      isActiveLink("/process")
                        ? {
                            borderLeftColor: "#170d5c",
                          }
                        : {}
                    }
                  >
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
                      style={{
                        background:
                          "linear-gradient(to bottom right, #170d5c, #2d1b69)",
                      }}
                    >
                      <Settings className="h-5 w-5 text-white" />
                    </div>
                    <div className="ml-3">
                      <h3
                        className={`text-sm font-semibold transition-colors duration-200`}
                        style={{
                          color: isActiveLink("/process")
                            ? "#170d5c"
                            : "#111827",
                        }}
                      >
                        Our Process
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        How we deliver quality
                      </p>
                    </div>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <ChevronDown className="h-4 w-4 text-gray-400 rotate-[-90deg]" />
                    </div>
                  </Link>
                </div>

                {/* Bottom section with CTA */}
                <div className="bg-gray-100 p-3 rounded-b-xl border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-2">
                      Need help choosing?
                    </p>
                    <Link
                      to="/contact"
                      className="inline-flex items-center px-3 py-1.5 text-white text-xs font-medium rounded-lg transition-all duration-200 hover:scale-105"
                      style={{ backgroundColor: "#d9b451" }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#c49b42")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#d9b451")
                      }
                    >
                      Get Expert Advice
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link
              to="/business"
              className={`px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md ${
                isActiveLink("/business")
                  ? "border-b-2 bg-gray-100"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              style={
                isActiveLink("/business")
                  ? {
                      color: "#170d5c",
                      borderBottomColor: "#d9b451",
                    }
                  : {
                      color: "#6b7280",
                    }
              }
              onMouseEnter={(e) =>
                !isActiveLink("/business") && (e.target.style.color = "#170d5c")
              }
              onMouseLeave={(e) =>
                !isActiveLink("/business") && (e.target.style.color = "#6b7280")
              }
            >
              Business
            </Link>

            <Link
              to="/contact"
              className={`px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md ${
                isActiveLink("/contact")
                  ? "border-b-2 bg-gray-100"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              style={
                isActiveLink("/contact")
                  ? {
                      color: "#170d5c",
                      borderBottomColor: "#d9b451",
                    }
                  : {
                      color: "#6b7280",
                    }
              }
              onMouseEnter={(e) =>
                !isActiveLink("/contact") && (e.target.style.color = "#170d5c")
              }
              onMouseLeave={(e) =>
                !isActiveLink("/contact") && (e.target.style.color = "#6b7280")
              }
            >
              Contact
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to={isGiftCardEnabled ? "/giftcards" : "#"}
              className={`px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md ${
                !isGiftCardEnabled
                  ? "opacity-50 cursor-not-allowed"
                  : isActiveLink("/giftcards")
                  ? "border-b-2 bg-gray-100"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              style={
                !isGiftCardEnabled
                  ? { color: "#9ca3af" }
                  : isActiveLink("/giftcards")
                  ? { color: "#170d5c", borderBottomColor: "#d9b451" }
                  : { color: "#6b7280" }
              }
              onClick={
                !isGiftCardEnabled ? (e) => e.preventDefault() : undefined
              }
              onMouseEnter={
                !isGiftCardEnabled
                  ? undefined
                  : (e) =>
                      !isActiveLink("/giftcards") &&
                      (e.target.style.color = "#170d5c")
              }
              onMouseLeave={
                !isGiftCardEnabled
                  ? undefined
                  : (e) =>
                      !isActiveLink("/giftcards") &&
                      (e.target.style.color = "#6b7280")
              }
            >
              Gift Cards
            </Link>
            <Link
              to="/subscription"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 text-white`}
              style={{
                backgroundColor: isActiveLink("/subscription")
                  ? "#c49b42"
                  : "#d9b451",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#c49b42")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = isActiveLink("/subscription")
                  ? "#c49b42"
                  : "#d9b451")
              }
            >
              Book Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 focus:outline-none transition-colors duration-200"
              style={{ color: "#6b7280" }}
              onMouseEnter={(e) => (e.target.style.color = "#170d5c")}
              onMouseLeave={(e) => (e.target.style.color = "#6b7280")}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 shadow-lg">
          <Link
            to="/"
            className={`block px-3 py-2 text-base font-medium rounded-r-md ${
              isActiveLink("/")
                ? "bg-gray-100 border-l-4"
                : "text-gray-600 hover:bg-gray-100 hover:border-l-4 border-l-4 border-transparent transition-all duration-200"
            }`}
            style={
              isActiveLink("/")
                ? {
                    color: "#170d5c",
                    borderLeftColor: "#d9b451",
                  }
                : {
                    color: "#6b7280",
                  }
            }
          >
            Home
          </Link>

          {/* Mobile Services Section */}
          <div className="space-y-2">
            <div
              className={`px-3 py-2 text-base font-medium border-l-4 ${
                isServicesActive() ? "bg-gray-100" : ""
              }`}
              style={
                isServicesActive()
                  ? {
                      color: "#170d5c",
                      borderLeftColor: "#d9b451",
                    }
                  : {
                      color: "#6b7280",
                      borderLeftColor: "transparent",
                    }
              }
            >
              Services
            </div>

            {/* Our Services Mobile */}
            <Link
              to="/services"
              className={`block px-6 py-3 text-sm font-medium rounded-md transition-all duration-200 flex items-center ${
                isActiveLink("/services")
                  ? "bg-gray-100 border-l-4"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              style={
                isActiveLink("/services")
                  ? {
                      color: "#170d5c",
                      borderLeftColor: "#170d5c",
                    }
                  : {
                      color: "#6b7280",
                    }
              }
            >
              <Sparkles className="h-4 w-4 mr-3" style={{ color: "#170d5c" }} />
              Our Services
            </Link>

            {/* Fabric Care Guide Mobile */}
            <Link
              to="/fabrics"
              className={`block px-6 py-3 text-sm font-medium rounded-md transition-all duration-200 flex items-center ${
                isActiveLink("/fabrics")
                  ? "bg-gray-100 border-l-4"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              style={
                isActiveLink("/fabrics")
                  ? {
                      color: "#170d5c",
                      borderLeftColor: "#d9b451",
                    }
                  : {
                      color: "#6b7280",
                    }
              }
            >
              <BookOpen className="h-4 w-4 mr-3" style={{ color: "#d9b451" }} />
              Fabric Care Guide
            </Link>

            {/* Our Process Mobile */}
            <Link
              to="/process"
              className={`block px-6 py-3 text-sm font-medium rounded-md transition-all duration-200 flex items-center ${
                isActiveLink("/process")
                  ? "bg-gray-100 border-l-4"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              style={
                isActiveLink("/process")
                  ? {
                      color: "#170d5c",
                      borderLeftColor: "#170d5c",
                    }
                  : {
                      color: "#6b7280",
                    }
              }
            >
              <Settings className="h-4 w-4 mr-3" style={{ color: "#170d5c" }} />
              Our Process
            </Link>
          </div>

          <Link
            to="/business"
            className={`block px-3 py-2 text-base font-medium transition-all duration-200 ${
              isActiveLink("/business")
                ? "bg-gray-100 border-l-4"
                : "text-gray-600 hover:bg-gray-100 hover:border-l-4"
            }`}
            style={
              isActiveLink("/business")
                ? {
                    color: "#170d5c",
                    borderLeftColor: "#d9b451",
                  }
                : {
                    color: "#6b7280",
                  }
            }
          >
            Business
          </Link>

          <Link
            to="/contact"
            className={`block px-3 py-2 text-base font-medium transition-all duration-200 ${
              isActiveLink("/contact")
                ? "bg-gray-100 border-l-4"
                : "text-gray-600 hover:bg-gray-100 hover:border-l-4"
            }`}
            style={
              isActiveLink("/contact")
                ? {
                    color: "#170d5c",
                    borderLeftColor: "#d9b451",
                  }
                : {
                    color: "#6b7280",
                  }
            }
          >
            Contact
          </Link>

          <Link
            to={isGiftCardEnabled ? "/giftcards" : "#"}
            className={`block px-3 py-2 text-base font-medium transition-all duration-200 ${
              !isGiftCardEnabled
                ? "opacity-50 cursor-not-allowed"
                : isActiveLink("/giftcards")
                ? "bg-gray-100 border-l-4"
                : "text-gray-600 hover:bg-gray-100 hover:border-l-4"
            }`}
            style={
              !isGiftCardEnabled
                ? { color: "#9ca3af" }
                : isActiveLink("/giftcards")
                ? { color: "#170d5c", borderLeftColor: "#d9b451" }
                : { color: "#6b7280" }
            }
            onClick={!isGiftCardEnabled ? (e) => e.preventDefault() : undefined}
          >
            Gift Cards
          </Link>
          <Link
            to="/subscription"
            className={`block px-3 py-2 text-base font-medium rounded-md mt-4 transition-colors duration-200 text-white`}
            style={{
              backgroundColor: isActiveLink("/subscription")
                ? "#c49b42"
                : "#d9b451",
            }}
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
