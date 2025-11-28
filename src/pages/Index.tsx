// src/pages/index.tsx (o dove si trova il tuo Index)
import { HeaderNav } from "@/components/header-nav";
import { HeroHome } from "@/components/Home/hero-home";
import { FeaturedProperties } from "@/components/Home/featured-properties"; // Assicurati che il percorso sia giusto

import { LocationsSection } from "@/components/Home/locations-section";

import { ServicesSection } from "@/components/Home/services-section";

import { AboutSection } from "@/components/Home/about-section";

import { FooterHome } from "@/components/Home/footer-home";

const Index = () => {
    return (
        <div className="min-h-screen">
            <HeaderNav />
            <HeroHome />
            <FeaturedProperties /> {/* <-- Questo ora caricherà i dati reali automaticamente */}
            <LocationsSection />
            <ServicesSection />
            <AboutSection />
            <FooterHome />
        </div>
    );
};

export default Index;