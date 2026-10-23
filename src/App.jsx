import React, { useState } from 'react';
import SiteHeader from './components/SiteHeader';
import MobileMenuOverlay from './components/MobileMenuOverlay';
import HeroSection from './components/HeroSection';
import HowTheLoopCloses from './components/HowTheLoopCloses';
import OurProducts from './components/OurProducts';
import WhyMasader from './components/WhyMasader';
import SustainabilityCertifications from './components/SustainabilityCertifications';
import WhereItGoes from './components/WhereItGoes';
import NewsInsights from './components/NewsInsights';
import FinalCta from './components/FinalCta';
import Footer from './components/Footer';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#091D0D] text-[#EFF5ED]">
      {/* 1. Site Header (Section 3 of CONTENT_SPEC.md) */}
      <SiteHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* 2. Mobile Menu Overlay (Section 4 of CONTENT_SPEC.md) */}
      <MobileMenuOverlay isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* 3. Main Content Container (#mx-main for Accessibility Skip Link) */}
      <main id="mx-main" className="mx-main">
        {/* Phase 1: Section 1 / 5.1: Hero Section */}
        <HeroSection />

        {/* Phase 2: Section 2 / 5.2: How The Loop Closes */}
        <HowTheLoopCloses />

        {/* Phase 2: Section 3 / 5.3: Our Products */}
        <OurProducts />

        {/* Phase 3: Section 4 / 5.4: Why Masader */}
        <WhyMasader />

        {/* Phase 3: Section 5 / 5.5: Sustainability & Certifications */}
        <SustainabilityCertifications />

        {/* Phase 3: Section 6 / 5.6: Where It Goes */}
        <WhereItGoes />

        {/* Phase 4: Section 7 / 5.7: News & Insights */}
        <NewsInsights />

        {/* Phase 4: Section 8 / 5.8: Final Call to Action */}
        <FinalCta />

        {/* Phase 4: Section 9 / 5.9: Footer */}
        <Footer />
      </main>
    </div>
  );
}
