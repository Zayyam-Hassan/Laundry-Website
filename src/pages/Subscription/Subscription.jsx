import React from "react";
import FeatureForAll from "../../components/FeatureForAll/FeatureForAll";
import CardsSection from "../../components/CardsSection/CardsSection";
import PickupScheduleForm from "../../components/SubscribeNow/Subscribe";
import ProcessStepBusiness from "../../components/ProcessStepsBusiness/ProcessStepsBusiness";
import BookingPage from "../../components/BookingPage/BookingPage";
import { Calendar, Truck, Star, CheckCircle } from "lucide-react";
const Subscription = () => {
    const steps = [
    {
      title: "Confirmation Call",
      description: "Our team will call you within 2 hours to confirm your pickup details and answer any questions."
    },
    {
      title: "Professional Pickup",
      description: "Our uniformed staff will arrive at your scheduled time to collect your laundry with care."
    },
    {
      title: "Premium Service",
      description: "Experience our premium cleaning process and receive your fresh laundry within 48-72 hours."
    }
  ];
  return (
    <div>
      <FeatureForAll
        title="Start Your Premium Laundry Experience"
        subtitle="Fill out the form below to schedule your first pickup and join thousands of satisfied customers who trust FarrariGo for their laundry needs."
        highlightText="Free Pickup"
        highlightIcon={Truck}
        showFeatures={true}
        features={[
          {
            icon: Star,
            title: "Premium Quality",
            description:
              "Professional-grade cleaning with attention to every detail and fabric type",
          },
          {
            icon: Calendar,
            title: "Flexible Scheduling",
            description:
              "Choose pickup and delivery times that work with your busy lifestyle",
          },
          {
            icon: CheckCircle,
            title: "Satisfaction Guarantee",
            description:
              "100% satisfaction promise with free re-cleaning if you're not completely happy",
          },
        ]}
      />
      {/*<PickupScheduleForm />*/}
      <BookingPage/>
          <ProcessStepBusiness 
      title="What Happens Next?"
      subtitle="Here's what you can expect after submitting your inquiry."
      steps={steps}
    />
    </div>
  );
};

export default Subscription;
