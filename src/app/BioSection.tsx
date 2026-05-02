'use client';

/*
  BIO / TAGLINE SECTION
  ─────────────────────
  Desktop: editorial staircase — each line of the phrase sits at a different
           horizontal indent, creating a cascading typographic composition.
           Font: Inter Light 96px (6.67vw so it scales with the viewport).

  Mobile:  everything centred, 32px text, "001" label sits above the first line.

  Animation: GSAP ScrollTrigger word-fill scrub — each word starts light grey
             and fills to black in sequence as the section scrolls into view.
*/

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Playfair Display Italic ampersand
function Ampersand() {
  return (
    <span
      data-word
      className="italic font-normal inline-block"
      style={{ fontFamily: 'var(--font-playfair)' }}
    >
      &amp;
    </span>
  );
}

// Splits a string into individually animated word spans
function Words({ text }: { text: string }) {
  const words = text.trim().split(/\s+/);
  return (
    <>
      {words.map((word, i) => (
        <span key={i}>
          {i > 0 && ' '}
          <span data-word className="inline-block">{word}</span>
        </span>
      ))}
    </>
  );
}

export default function BioSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const words = gsap.utils.toArray<HTMLElement>('[data-word]', section);
    if (!words.length) return;

    // Start all words in light grey
    gsap.set(words, { color: '#c8c8c8' });

    // Each word fills to black in sequence, scrubbed to scroll position
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 35%',
        scrub: 1.5,
      },
    });

    words.forEach(word => {
      tl.to(word, { color: '#000000', duration: 1, ease: 'none' }, '<0.06');
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="px-4 md:px-8 py-12 md:py-[120px] bg-white">
      <div className="flex flex-col gap-6 w-full">

        {/* ── Header: label + rule ───────────────────────────── */}
        <div className="flex flex-col gap-3 items-end w-full">
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] text-right">
            [ 8+ years in industry ]
          </p>
          <div className="h-px w-full bg-[#1f1f1f]" />
        </div>

        {/* ── Staircase text ─────────────────────────────────── */}
        <div className="flex flex-col gap-2 w-full">

          {/* Line 1 — "A creative director   /" + counter */}
          <div data-creative-director className="flex flex-col items-center gap-3 md:flex-row md:items-start md:gap-3 uppercase">
            <p className="order-first md:order-last font-mono text-[14px] text-[#1f1f1f] leading-[1.1] shrink-0">
              001
            </p>
            <p className="order-last md:order-first font-light text-[32px] md:text-[6.67vw] tracking-[-0.08em] leading-[0.84] whitespace-pre">
              <Words text="A creative director" />{'   '}<span data-word className="inline-block">/</span>
            </p>
          </div>

          {/* Line 2 — "Photographer" */}
          <div className="w-full flex justify-center md:justify-start md:pl-[14.86vw]">
            <p className="font-light text-[32px] md:text-[6.67vw] tracking-[-0.08em] leading-[0.84] uppercase whitespace-nowrap">
              <Words text="Photographer" />
            </p>
          </div>

          {/* Line 3 — "Born & raised" */}
          <div className="w-full flex justify-center md:justify-start md:pl-[42.36vw]">
            <p className="font-light text-[32px] md:text-[6.67vw] tracking-[-0.08em] leading-[0.84] uppercase whitespace-nowrap">
              <span data-word className="inline-block">Born</span>{' '}
              <Ampersand />{' '}
              <span data-word className="inline-block">raised</span>
            </p>
          </div>

          {/* Line 4 — "on the south side" */}
          <div className="w-full flex justify-center md:justify-start">
            <p className="font-light text-[32px] md:text-[6.67vw] tracking-[-0.08em] leading-[0.84] uppercase whitespace-nowrap">
              <Words text="on the south side" />
            </p>
          </div>

          {/* Line 5 — "of chicago." + label */}
          <div className="relative w-full flex flex-col items-center gap-3 md:items-start md:gap-0 md:pl-[42.08vw]">
            <p className="font-light text-[32px] md:text-[6.67vw] tracking-[-0.08em] leading-[0.84] uppercase whitespace-nowrap">
              <Words text="of chicago." />
            </p>
            <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] whitespace-nowrap md:absolute md:top-full md:left-[78.4%] md:mt-1">
              [ creative freelancer ]
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
