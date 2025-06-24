import React, { useState } from 'react';
import { MessageCircleQuestion, Lightbulb, Info } from 'lucide-react';

const FAQ = () => {
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



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 blur-3xl rounded-full animate-pulse"></div>
          <div className="relative">
            <div className="relative inline-block">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4 leading-tight tracking-tight">
                Frequently Asked Questions
              </h1>
              {/* Animated underline */}
              <div
                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-full transition-all duration-1000 delay-500"
                style={{ width: "60%" }}
              />
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium mt-6">
              Quick answers to common questions about our services.
            </p>
          </div>
        </div>



        {/* FAQ Items */}
        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <div
              key={faq.id}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100/50 overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-blue-100/30 hover:border-blue-200/60 hover:-translate-y-1 group"
            >
              <div className="p-6 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                      <MessageCircleQuestion className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors duration-300 leading-tight mb-3">
                      {faq.question}
                    </h3>
                    <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                      {faq.category}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 ml-14">
                  <div className="h-px bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 mb-4 group-hover:from-blue-300 group-hover:via-indigo-300 group-hover:to-purple-300 transition-all duration-300"></div>
                  <p className="text-gray-700 leading-relaxed font-medium text-lg group-hover:text-gray-800 transition-colors duration-300">
                    {faq.answer}
                  </p>
                </div>
              </div>
              
              {/* Animated bottom accent */}
              <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>

        {/* FAQ Count */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full border border-blue-200 shadow-sm hover:shadow-md hover:bg-white/80 transition-all duration-300">
            <span className="text-sm font-semibold text-gray-700">
              {faqData.length} Frequently Asked Questions
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;