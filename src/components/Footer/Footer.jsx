import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Twitter,
  Facebook,
  MessageSquare,
  Youtube,
} from "lucide-react";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#170d5c" }} className="text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* FarrariGo Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src="/logos/logo1.png"
                alt="FarrariGo Logo"
                className="h-10 w-auto"
              />
              <span className="ml-3 text-2xl font-bold">FarrariGo</span>
            </div>
            <p className="text-white text-sm">
              Kuwait's first premium, subscription-based laundry service.
              Elegant care. Exceptional convenience.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/farrarigo.kw?igsh=NXkxM21qN3Rncmw3"
                target="_blank"
                className="text-white hover:text-pink-500 transform hover:scale-125 transition-all duration-300"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.youtube.com/channel/UCzM4-ZeHwvD6F1ZRAbAkaUQ"
                target="_blank"
                className="text-white hover:text-sky-500 transform hover:scale-125 transition-all duration-300"
              >
                <Youtube size={20} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61577973271955"
                target="_blank"
                className="text-white hover:text-blue-600 transform hover:scale-125 transition-all duration-300"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3
              className="text-sm font-semibold tracking-wider uppercase"
              style={{ color: "#d9b451" }}
            >
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  to="/services"
                  className="relative text-base text-white transition-colors duration-300 hover:text-[#d9b451]"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  to="/fabrics"
                  className="relative text-base text-white transition-colors duration-300 hover:text-[#d9b451]"
                >
                  Fabric Care Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/process"
                  className="relative text-base text-white transition-colors duration-300 hover:text-[#d9b451]"
                >
                  Our Process
                </Link>
              </li>
              <li>
                <Link
                  to="/business"
                  className="relative text-base text-white transition-colors duration-300 hover:text-[#d9b451]"
                >
                  Business Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3
              className="text-sm font-semibold tracking-wider uppercase"
              style={{ color: "#d9b451" }}
            >
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  to="/"
                  className="relative text-base text-white transition-colors duration-300 hover:text-[#d9b451]"
                >
                  Blog (Upcoming)
                </Link>
              </li>
              <li>
                <Link
                  to="/giftcards"
                  className="relative text-base text-white transition-colors duration-300 hover:text-[#d9b451]"
                >
                  Gift Cards
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="relative text-base text-white transition-colors duration-300 hover:text-[#d9b451]"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="relative text-base text-white transition-colors duration-300 hover:text-[#d9b451]"
                >
                  Careers (Upcoming)
                </Link>
              </li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h3
              className="text-sm font-semibold tracking-wider uppercase"
              style={{ color: "#d9b451" }}
            >
              Get in Touch
            </h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start">
                <Phone
                  size={20}
                  className="flex-shrink-0 mt-1"
                  style={{ color: "#d9b451" }}
                />
                <a
                  href="https://wa.me/96599555045"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-3 text-base text-white hover:text-[#d9b451] transition-colors duration-300"
                >
                  +96599555045
                </a>
              </li>

              <li className="flex items-start">
                <Mail
                  size={20}
                  className="flex-shrink-0 mt-1"
                  style={{ color: "#d9b451" }}
                />
                <a
                  href="mailto:info@ferrarilife.com"
                  className="ml-3 text-base text-white hover:text-[#d9b451] transition-colors duration-300"
                >
                  info@ferrarilife.com
                </a>
              </li>

              <li className="flex items-start">
                <MapPin
                  size={20}
                  className="flex-shrink-0 mt-1"
                  style={{ color: "#d9b451" }}
                />
                <span className="ml-3 text-base text-white">
                  Industrial Area 3, Block D<br />
                  Shuwaikh, Kuwait
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Download App Section */}
        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col items-center text-center">
          <h3
            className="text-sm font-semibold tracking-wider uppercase"
            style={{ color: "#d9b451" }}
          >
            Download Our App
          </h3>
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <Link
              to="/app-store"
              className="bg-black text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-3 hover:bg-gray-800 transform hover:-translate-y-1 transition-all duration-300"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg"
                alt="App Store"
                className="h-8"
              />
              <div>
                <p className="text-xs">Download on the</p>
                <p className="text-xl font-semibold">App Store</p>
              </div>
            </Link>
            <Link
              to="/google-play"
              className="bg-black text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-3 hover:bg-gray-800 transform hover:-translate-y-1 transition-all duration-300"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-8"
              />
              <div>
                <p className="text-xs">GET IT ON</p>
                <p className="text-xl font-semibold">Google Play</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white">
          <p>
            &copy; {new Date().getFullYear()} FarrariGo. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <div className="flex items-center transition-colors duration-300 text-white hover:text-[#d9b451]">
              <MessageSquare size={16} className="mr-2 text-green-400" />
              <span
                className="relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-px after:transition-all after:duration-300 hover:after:w-full"
                style={{
                  "--tw-after-bg-opacity": "1",
                  "--tw-after-bg": "#d9b451",
                }}
              >
                Live Concierge Available 24/7
              </span>
            </div>
            <span className="mx-4">|</span>
            <Link
              to="/privacy-policy"
              target="_blank"
              className="relative transition-colors duration-300 text-white hover:text-[#d9b451]"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        <style jsx>{`
          .hover\\:after\\:w-full:hover::after {
            background-color: #d9b451 !important;
          }

          [style*="--after-bg"]::after {
            background-color: #d9b451 !important;
          }

          [style*="--tw-after-bg"]::after {
            background-color: #d9b451 !important;
          }
        `}</style>
      </div>
    </footer>
  );
};

export default Footer;
