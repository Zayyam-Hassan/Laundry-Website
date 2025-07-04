import React from "react";

import FeatureForAll from "../../components/FeatureForAll/FeatureForAll";
import GetInTouchForm from "../../components/ContactUs/contactUs";
import FAQ from "../../components/FrequentlyAskedQuestions/FAQ";
import {Clock,Users,MessageCircle} from "lucide-react"
const Contact = () => {
  return (
    <div>
      <FeatureForAll
        title="Contact Us"
        subtitle="We're here to help with any questions about our premium laundry services. Get in touch with our friendly team."
        highlightText="Live Chat Available 24/7"
        highlightIcon={MessageCircle}
        showFeatures={true}
        features={[
          {
            icon: MessageCircle,
            title: "Instant Support",
            description:
              "Real-time assistance through live chat, phone, and messaging platforms",
          },
          {
            icon: Users,
            title: "Dedicated Account Manager",
            description:
              "Personal point of contact for business clients and premium service members",
          },
          {
            icon: Clock,
            title: "Quick Response Time",
            description:
              "Average response time under 2 minutes for urgent inquiries and support",
          },
        ]}
        theme={{
          highlightColor: "text-green-400",
        }}
      />
      <GetInTouchForm/>
      <FAQ/>
    </div>
  );
};

export default Contact;
