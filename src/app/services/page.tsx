/*
  SERVICES PAGE
  ─────────────
  Hero        — full-bleed parallax (same pattern as home hero)
  Tagline     — staircase word-fill (same pattern as BioSection)
  Why         — editorial intro: why H.Studio (pull-quote + paragraphs)
  Detail      — four services with in-depth descriptions (black bg)
  Footer      — shared component
*/

import type { Metadata } from 'next';
import ServicesHero    from './ServicesHero';
import ServicesTagline from './ServicesTagline';
import ServicesWhy     from './ServicesWhy';
import ServicesDetail  from './ServicesDetail';
import FooterSection   from '../FooterSection';

export const metadata: Metadata = {
  title: 'Services — Harvey Specter',
  description: 'Brand Discovery, Web Design & Dev, Marketing, and Photography. Strategy-led creative work for brands that demand more.',
};

export default function ServicesPage() {
  return (
    <main>
      <div className="relative z-10">
        <ServicesHero />
        <ServicesTagline />
        <ServicesWhy />
        <ServicesDetail />
      </div>
      <div className="sticky bottom-0">
        <FooterSection />
      </div>
    </main>
  );
}
