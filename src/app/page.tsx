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
      <HeroSection />
      <BioSection />
      <AboutSection />
      <FullBleedPhoto />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <NewsSection />
      <FooterSection />
    </main>
  );
}
