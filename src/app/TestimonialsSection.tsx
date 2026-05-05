'use client';

/*
  TESTIMONIALS SECTION
  ─────────────────────
  Desktop: giant "Testimonials" word centered in a tall section; 4 testimonial
           cards are scattered around it at different rotations using absolute
           positioning. The % left values are computed from the Figma pixel
           positions (e.g. 676 / 1440 = 46.94 %).

  Mobile:  "Testimonials" header at top, then a full-width swipe slider —
           one card visible at a time, with dot indicators below.
*/

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

// Logo images for each reviewer (company logos from the Figma)
const logos = {
  lukas:  'https://www.figma.com/api/mcp/asset/9949f3ec-b2f0-4729-9722-bbf48bdd9ea1',
  marko:  'https://www.figma.com/api/mcp/asset/6ee55584-3de5-44bf-a071-49de47e5e57d',
  sarah:  'https://www.figma.com/api/mcp/asset/f82ceeab-14cc-4177-8508-123459aba2f7',
  sofia:  'https://www.figma.com/api/mcp/asset/a7d872d5-38a7-4f03-9b1d-afecf1ee6788',
};

const testimonials = [
  {
    key: 'lukas',
    quote:
      'Professional, precise, and incredibly fast at handling complex product visualizations and templates.',
    author: 'Lukas Weber',
    logo: logos.lukas,
    rotation: 2.9,
    pos: { right: '28.54%' } as React.CSSProperties,
    top: '160px',
    parallaxFactor: -90, // moves up → feels closer
  },
  {
    key: 'marko',
    quote:
      'A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.',
    author: 'Marko Stojković',
    logo: logos.marko,
    rotation: -6.85,
    pos: { left: '7.08%' } as React.CSSProperties,
    top: '102px',
    parallaxFactor: 80, // moves down → feels farther back
  },
  {
    key: 'sarah',
    quote:
      "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity.",
    author: 'Sarah Jenkins',
    logo: logos.sarah,
    rotation: 2.23,
    pos: { left: '21.18%' } as React.CSSProperties,
    top: '553px',
    parallaxFactor: 60, // moves down → feels farther back
  },
  {
    key: 'sofia',
    quote:
      'An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.',
    author: 'Sofia Martínez',
    logo: logos.sofia,
    rotation: -4.15,
    pos: { right: '6.94%' } as React.CSSProperties,
    top: '546px',
    parallaxFactor: -70, // moves up → feels closer
  },
];

// ── Shared card ───────────────────────────────────────────────────────────────
function TestimonialCard({
  quote,
  author,
  logo,
}: {
  quote: string;
  author: string;
  logo: string;
}) {
  return (
    <div className="bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4 w-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo}
        alt=""
        aria-hidden="true"
        className="h-5 w-auto max-w-[150px] object-contain object-left"
      />
      <p className="font-normal text-[18px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
        {quote}
      </p>
      <p className="font-black text-[16px] text-black uppercase leading-[1.1] tracking-[-0.04em]">
        {author}
      </p>
    </div>
  );
}

// ── Mobile slider ─────────────────────────────────────────────────────────────
function MobileSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const observers = slideRefs.current.map((slide, i) => {
      if (!slide) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i); },
        { root, threshold: 0.5 },
      );
      obs.observe(slide);
      return obs;
    });

    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const goTo = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Swipe strip — one full-width card per snap point */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none' }}
      >
        {testimonials.map((t, i) => (
          <div
            key={t.key}
            ref={(el) => { slideRefs.current[i] = el; }}
            className="shrink-0 w-full snap-start"
          >
            {/* py-12 gives rotated corners room — kept inside the slide so
                overflow-y on the scroll container can't clip it */}
            <div className="py-12 px-4 flex justify-center">
              <div
                className="w-full max-w-[450px]"
                style={{ transform: `rotate(${t.rotation}deg)` }}
              >
                <TestimonialCard quote={t.quote} author={t.author} logo={t.logo} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center items-center gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to testimonial ${i + 1}`}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex
                ? 'w-4 h-1.5 bg-black'
                : 'w-1.5 h-1.5 bg-neutral-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function TestimonialsSection() {
  const desktopRef = useRef<HTMLDivElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = desktopRef.current;
    if (!section) return;

    const cards = cardRefs.current.filter((c): c is HTMLDivElement => c !== null);

    // Hand rotations to GSAP so it tracks them alongside the parallax y.
    // If rotation stays in the React inline style, gsap.set(card, { y }) wipes it.
    cards.forEach((card, i) => {
      gsap.set(card, { rotation: testimonials[i].rotation });
    });

    // Per-card lerped values
    const cur = testimonials.map(() => 0);
    const tgt = testimonials.map(() => 0);

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const vh   = window.innerHeight;
      // 0 = section entering from bottom, 0.5 = midpoint at viewport centre, 1 = leaving top
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));

      testimonials.forEach((t, i) => {
        tgt[i] = (progress - 0.5) * t.parallaxFactor;
      });
    };

    const tick = () => {
      cards.forEach((card, i) => {
        cur[i] += (tgt[i] - cur[i]) * 0.07;
        gsap.set(card, { y: cur[i] });
      });
    };

    // Seed current values so there is no first-frame jump
    onScroll();
    testimonials.forEach((_, i) => { cur[i] = tgt[i]; });

    window.addEventListener('scroll', onScroll, { passive: true });
    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      gsap.ticker.remove(tick);
      cards.forEach(c => gsap.set(c, { clearProps: 'y' }));
    };
  }, []);

  return (
    <section className="bg-white" id="testimonials">

      {/* ════ DESKTOP ════════════════════════════════════════════════════════ */}
      <div ref={desktopRef} className="hidden md:block relative px-8 py-[120px] min-h-[987px] overflow-hidden">
        <p className="font-medium text-black text-[13.75vw] text-center tracking-[-0.07em] leading-[1.1] capitalize w-full select-none mt-[260px]">
          Testimonials
        </p>
        {testimonials.map((t, i) => (
          <div
            key={t.key}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="absolute w-[31vw] max-w-[353px]"
            style={{
              ...t.pos,
              top: t.top,
              zIndex: 'right' in t.pos ? 1 : 0,
            }}
          >
            <TestimonialCard quote={t.quote} author={t.author} logo={t.logo} />
          </div>
        ))}
      </div>

      {/* ════ MOBILE ══════════════════════════════════════════════════════════ */}
      <div className="md:hidden py-16 flex flex-col gap-8">
        <p className="font-medium text-black text-[64px] text-center tracking-[-0.07em] leading-[0.8] capitalize px-4">
          Testimonials
        </p>
        <MobileSlider />
      </div>

    </section>
  );
}
