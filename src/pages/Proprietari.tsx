import { HeaderNav } from "@/components/header-nav";
import { HeroSection } from "@/components/Proprietari/hero-section";
import { BenefitsSection } from "@/components/Proprietari/benefits-section";
import { HowItWorksSection } from "@/components/Proprietari/how-it-works";
import { SocialProofSection } from "@/components/Proprietari/social-proof";
import { ContactForm } from "@/components/Proprietari/contact-form";
import { Footer } from "@/components/footer";
import { useEffect } from "react";

const Proprietari = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <HeaderNav />
      <HeroSection />
      <BenefitsSection />
      <HowItWorksSection />
      <SocialProofSection />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Proprietari;
