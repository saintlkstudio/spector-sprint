import HeroSection from './HeroSection';
import BioSection from './BioSection';
import AboutSection from './AboutSection';
import FullBleedPhoto from './FullBleedPhoto';
import ServicesSection from './ServicesSection';
import PortfolioSection from './PortfolioSection';
import TestimonialsSection from './TestimonialsSection';
import NewsSection from './NewsSection';
import FooterSection from './FooterSection';

export default function Home() {
  return (
    <main>
      {/* Content sits above the footer in stacking order */}
      <div className="relative z-10">
        <HeroSection />
        <BioSection />
        <AboutSection />
        <FullBleedPhoto />
        <ServicesSection />
        <PortfolioSection />
        <TestimonialsSection />
        <NewsSection />
      </div>

      {/* Footer is pinned to the bottom on desktop — content scrolls over it */}
      <div className="sticky bottom-0">
        <FooterSection />
      </div>
    </main>
  );
}
