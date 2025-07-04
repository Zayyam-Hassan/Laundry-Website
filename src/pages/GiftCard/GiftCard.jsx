import React from 'react'
import GiftCardForm from '../../components/GiftCardForm/GiftCardForm'
import FeatureForAll from '../../components/FeatureForAll/FeatureForAll'
import CardsSection from '../../components/CardsSection/CardsSection'
import ReferralComponent from '../../components/ReferralCodes/ReferralCode'
import ProcessStepBusiness from '../../components/ProcessStepsBusiness/ProcessStepsBusiness'
import {Gift,Heart,Users,Sparkles,Infinity} from 'lucide-react'
const GiftCard = () => {
    const referralCards = [
    {
      icon: Gift,
      title: "Give KD 10, Get KD 10",
      description: "Both you and your friend receive KD 10 credit when they make their first order.",
      variant: "gradient"
    },
    {
      icon: Users,
      title: "Unlimited Referrals",
      description: "No limit on how many friends you can refer. More referrals = more rewards!",
      variant: "neon"
    },
    {
      icon: Infinity,
      title: "Instant Credits",
      description: "Credits are automatically applied to your account once your friend completes their first order.",
      variant: "glow"
    }
  ];
    const referralSteps = [
  {
    title: "Share Your Code",
    description: "Send your unique referral code to friends and family."
  },
  {
    title: "Friend Signs Up",
    description: "They create an account using your referral code."
  },
  {
    title: "First Order Placed",
    description: "Your friend completes their first laundry order."
  },
  {
    title: "Both Get Rewarded",
    description: "You both receive KD 10 credit automatically."
  }
];

  return (
    <div>
        <FeatureForAll
  title="Gift Cards & Referrals"
  subtitle="Share the gift of premium laundry care with friends and family. Perfect for any occasion, our gift cards bring convenience and luxury to those you care about."
  highlightText="Digital & Physical Cards"
  highlightIcon={Gift}
  showFeatures={true}
  features={[
    {
      icon: Heart,
      title: "Perfect for Any Occasion",
      description: "Birthdays, holidays, housewarmings, or just showing you care"
    },
    {
      icon: Users,
      title: "Referral Rewards",
      description: "Earn credits when friends sign up using your referral code"
    },
    {
      icon: Sparkles,
      title: "Flexible Denominations",
      description: "Choose from preset amounts or create custom gift card values"
    }
  ]}
/>

      <GiftCardForm/>

      <ReferralComponent/>
          <CardsSection
      title="Referral Rewards Program"
      subtitle="Share FarrarIGo with friends and family. When they sign up and make their first order, you both receive KD 10 credit!"
      cards={referralCards}
      gridCols="3"
      className="bg-gradient-to-b from-white to-blue-50"
    />
       <ProcessStepBusiness
      title="How Referrals Work"
      subtitle="Simple steps to earn rewards by sharing FarrariGo."
      steps={referralSteps}
      columns={4}
    />
    </div>
  )
}
export default GiftCard
