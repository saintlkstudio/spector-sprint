'use client';

/*
  ABOUT BIO — editorial biography
  ────────────────────────────────
  New section, no home-page equivalent. Uses the same type tokens and
  spacing as the rest of the site but in a magazine-editorial composition:

  Desktop:
    [ Bio ] ——————————————————————————— 002
    Large italic pull-quote (full width)
    ─ rule ─
    Two-column grid  ←  paragraphs 1 + 2
    Paragraph 3  (full width, constrained reading measure)

  Mobile:
    Everything single-column. Pull-quote stays prominent.

  Animation: pull-quote and each text block fade-in and slide up on first
  scroll into view (GSAP ScrollTrigger, fires once).
*/

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const pullQuote =
  '"Design is never decoration. At its best it is the clearest, most honest expression of what you stand for."';

const para1 =
  'Harvey Specter grew up on the south side of Chicago, where reading a room was a survival skill before it became a professional one. That instinct — to understand people, context, and the unspoken — became the foundation of everything he builds. After graduating from the Art Institute of Chicago, he spent five years as senior art director at a global creative agency before founding H.Studio in 2016.';

const para2 =
  'The studio was built on a single conviction: that the best creative work is strategic before it is beautiful. H.Studio works with founders, challenger brands, and established names who want design that moves people and performs in the real world. From brand identity and visual systems to digital experiences and editorial photography, every project begins in the same place — understanding what is true.';

const para3 =
  'Today, H.Studio operates as a senior, intentionally small team. No juniors, no volume, no filler. Every project is led by Harvey personally, with a trusted network of specialists brought in when the scope demands it. The studio is selective by design: fewer clients, deeper engagement, and outcomes that last.';

export default function AboutBio() {
  const sectionRef    = useRef<HTMLElement>(null);
  const quoteRef      = useRef<HTMLParagraphElement>(null);
  const col1Ref       = useRef<HTMLParagraphElement>(null);
  const col2Ref       = useRef<HTMLParagraphElement>(null);
  const para3Ref      = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const targets = [quoteRef.current, col1Ref.current, col2Ref.current, para3Ref.current].filter(Boolean) as HTMLElement[];
    gsap.set(targets, { opacity: 0, y: 32 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 78%',
        once: true,
      },
    });

    tl.to(targets, {
      opacity: 1,
      y: 0,
      duration: 0.75,
      ease: 'power3.out',
      stagger: 0.14,
    });

    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  return (
    <section ref={sectionRef} id="bio" className="px-4 md:px-8 py-12 md:pt-[80px] md:pb-[120px] bg-white">

      {/* Header: [ Bio ] — rule — 002 */}
      <div className="flex items-center gap-6 mb-12 md:mb-[104px]">
        <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] shrink-0">
          [ Bio ]
        </p>
        <div className="flex-1 h-px bg-[#1f1f1f] opacity-20" />
        <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] shrink-0">
          002
        </p>
      </div>

      {/* Desktop: 2-col grid — quote left, paragraphs right.
          Mobile:  single column — quote then paragraphs stacked. */}
      <div className="flex flex-col md:grid md:grid-cols-2 md:items-center md:gap-16 gap-10">

        {/* Left column: pull-quote */}
        <p
          ref={quoteRef}
          className="font-light italic text-[22px] md:text-[32px] tracking-[-0.04em] leading-[1.2] text-[#1f1f1f] md:ml-8 md:-mt-[38px]"
        >
          {pullQuote}
        </p>

        {/* Right column: paragraphs */}
        <div className="flex flex-col gap-5">
          <p
            ref={col1Ref}
            className="font-normal text-[14px] text-[#1f1f1f] leading-[1.5] tracking-[-0.04em]"
          >
            {para1}
          </p>
          <p
            ref={col2Ref}
            className="font-normal text-[14px] text-[#1f1f1f] leading-[1.5] tracking-[-0.04em]"
          >
            {para2}
          </p>
          <p
            ref={para3Ref}
            className="font-normal text-[14px] text-[#1f1f1f] leading-[1.5] tracking-[-0.04em]"
          >
            {para3}
          </p>
        </div>

      </div>

    </section>
  );
}
