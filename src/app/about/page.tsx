/*
  ABOUT PAGE
  ──────────
  Uses the home-page design language (type scale, spacing, colour tokens,
  GSAP patterns) but with deliberately different layouts and new content.

  Hero        — split-screen: portrait left / white copy right (≠ home hero)
  Bio         — editorial: pull-quote + 2-col paragraphs + third para (new)
  Manifesto   — staircase word-fill (same pattern, different copy)
  Full-Bleed  — shared pixel-reveal canvas
  Values      — black-bg principles (same pattern as Services, about-specific copy)
  Stats       — numbers grid, off-white bg
  Footer      — shared component
*/

import type { Metadata } from 'next';
import AboutHero      from './AboutHero';
import AboutBio       from './AboutBio';
import AboutManifesto from './AboutManifesto';
import FullBleedPhoto from '../FullBleedPhoto';
import AboutValues    from './AboutValues';
import AboutStats     from './AboutStats';
import FooterSection  from '../FooterSection';

export const metadata: Metadata = {
  title: 'About — Harvey Specter',
  description: 'Creative Director & Photographer. The story behind H.Studio.',
};

export default function AboutPage() {
  return (
    <main>
      <div className="relative z-10">
        <AboutHero />
        <AboutManifesto />
        <AboutBio />
        <FullBleedPhoto />
        <AboutValues />
        <AboutStats />
      </div>
      <div className="sticky bottom-0">
        <FooterSection />
      </div>
    </main>
  );
}
