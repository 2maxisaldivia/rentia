import BenefitsSection from '../components/BenefitsSection';
import FeaturesSection from '../components/FeaturesSection';
import ForWhoSection from '../components/ForWhoSection';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import CTASection from '../components/CTASection';
import FooterSection from '../components/FooterSection';

export default function LandingPage() {
  return (
    <>
      <Header />
      <HeroSection />
      <BenefitsSection />
      <FeaturesSection />
      <ForWhoSection />
      <CTASection />
      <FooterSection />
    </>
  );
}
