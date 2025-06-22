import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Shield, Eye, Lock, Share2, Database, UserCheck, Mail, Phone } from 'lucide-react';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState(null);

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
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl mt-6">
            <h4 className="font-semibold mb-2">Exercise Your Rights</h4>
            <p className="mb-4">To exercise these rights, contact us at:</p>
            <div className="bg-white/20 p-3 rounded-lg">
              <strong>Info@farrarigo.com</strong>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 ">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Privacy Notice
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Your privacy matters to us. Learn how we collect, use, and protect your personal information.
            </p>
            <div className="mt-8 inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm font-medium text-slate-200">Last updated: January 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Introduction */}
        <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Our Commitment to Your Privacy</h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-300 leading-relaxed">
              Farrari Laundries respects your privacy and is committed to protecting your personal data. 
              This privacy notice outlines how we handle your personal information, your rights, and how 
              the law protects you when you use our services through:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 p-4 rounded-xl border border-blue-700">
                <div className="font-semibold text-white">🌐 Website</div>
                <div className="text-slate-300 text-sm">Farrarigo.com</div>
              </div>
              <div className="bg-gradient-to-r from-emerald-900/50 to-green-900/50 p-4 rounded-xl border border-emerald-700">
                <div className="font-semibold text-white">📱 Mobile Apps</div>
                <div className="text-slate-300 text-sm">iOS & Android apps</div>
              </div>
              <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-4 rounded-xl border border-purple-700">
                <div className="font-semibold text-white">💻 Platform</div>
                <div className="text-slate-300 text-sm">Web & mobile platform</div>
              </div>
              <div className="bg-gradient-to-r from-orange-900/50 to-yellow-900/50 p-4 rounded-xl border border-orange-700">
                <div className="font-semibold text-white">🧺 Services</div>
                <div className="text-slate-300 text-sm">Laundry & dry cleaning</div>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Sections */}
        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden hover:shadow-3xl hover:border-slate-600 transition-all">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-8 py-6 text-left hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-900/50 rounded-full mr-4 border border-blue-700">
                      <div className="text-blue-400">
                        {section.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white">{section.title}</h3>
                  </div>
                  <div className="flex-shrink-0">
                    {activeSection === section.id ? (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </div>
              </button>
              
              {activeSection === section.id && (
                <div className="px-8 pb-8 border-t border-slate-700 bg-slate-800/50">
                  <div className="pt-6">
                    {section.content}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {/* Marketing */}
          <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-blue-400" />
              Marketing Communications
            </h3>
            <p className="text-slate-300 text-sm mb-4">
              You may receive marketing communications from us if you have used our services and have not opted out.
            </p>
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-700">
              <p className="text-blue-300 text-sm font-medium">
                You can withdraw consent or opt out at any time via email or unsubscribe links.
              </p>
            </div>
          </div>

          {/* Security */}
          <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Lock className="w-5 h-5 mr-2 text-emerald-400" />
              Data Security
            </h3>
            <p className="text-slate-300 text-sm mb-4">
              Your data is stored securely on our systems or our trusted partners' systems with appropriate protection measures.
            </p>
            <div className="bg-emerald-900/30 p-4 rounded-lg border border-emerald-700">
              <p className="text-emerald-300 text-sm font-medium">
                Keep your access credentials confidential for maximum security.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-2xl shadow-2xl p-8 mt-12 border border-slate-600">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Need Help or Have Questions?</h2>
            <p className="text-slate-300">We're here to help you understand your privacy rights</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-full mb-4 border border-white/20">
                <Mail className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-slate-300">Info@farrarigo.com</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-full mb-4 border border-white/20">
                <Phone className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-slate-300">+965 97588886</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-full mb-4 border border-white/20">
                <Database className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="font-semibold mb-2">Visit Us</h3>
              <p className="text-slate-300">Shuwaikh, Kuwait</p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 p-6 bg-slate-800 rounded-xl border border-slate-700">
          <p className="text-slate-300 text-sm">
            <strong className="text-white">Policy Updates:</strong> We may update this policy occasionally. All changes will be posted on this page. 
            Please check back regularly for updates.
          </p>
        </div>
      </div>
    </div>
  );
};
export default PrivacyPolicy;